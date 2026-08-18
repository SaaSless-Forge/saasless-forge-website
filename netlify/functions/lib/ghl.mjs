// Growth Audit — GoHighLevel API 2.0 client (Private Integration tokens).
//
// Two jobs: make sure a prospect exists as a contact in the agency's
// sub-account, and send them their audit report email THROUGH GHL so it
// sends from the agency's domain and lands in the contact's conversation
// thread (opens/clicks tracked like a dashboard-sent email).
//
// Same contract as places.mjs/research.mjs: pure data-in/data-out, no
// Netlify/React deps, best-effort error strings, no dependencies.
//
// Auth: location-level Private Integration token (Settings -> Private
// Integrations inside the sub-account). Required scopes: contacts.write,
// conversations/message.write. Every API 2.0 call needs a Version header;
// the general default is 2021-07-28 but the conversations send endpoint
// historically pins 2021-04-15 — version is per-call configurable and the
// caller can flip it if GHL rejects one.

const BASE = 'https://services.leadconnectorhq.com'
export const DEFAULT_VERSION = '2021-07-28'
export const CONVERSATIONS_VERSION = '2021-04-15'

async function ghlFetch(path, { method = 'GET', token, body, version = DEFAULT_VERSION, timeout = 8000 }) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeout)
  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      signal: ctrl.signal,
      headers: {
        Authorization: `Bearer ${token}`,
        Version: version,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    const text = await res.text()
    let json
    try { json = JSON.parse(text) } catch { json = { raw: text } }
    if (!res.ok) {
      return { ok: false, status: res.status, error: `GHL ${res.status} ${path}: ${text.slice(0, 200)}` }
    }
    return { ok: true, json }
  } catch (e) {
    return { ok: false, status: 0, error: e?.name === 'AbortError' ? `GHL timeout ${path}` : String(e?.message || e) }
  } finally {
    clearTimeout(t)
  }
}

// Create-or-update a contact by email (GHL merges on email). Empty fields are
// omitted so an upsert never blanks data an existing contact already has.
// Tags use set semantics inside GHL — re-adding an existing tag is a no-op,
// so this converges safely with the inbound-webhook workflow's Create Contact.
export async function upsertContact({
  token, locationId, email,
  name = '', firstName = '', lastName = '',
  phone = '', companyName = '', website = '',
  tags = [], source = '', timeout,
}) {
  if (!token || !locationId || !email) return { ok: false, error: 'upsertContact: token, locationId, email required' }
  const body = { locationId, email }
  if (name) body.name = name
  if (firstName) body.firstName = firstName
  if (lastName) body.lastName = lastName
  if (phone) body.phone = phone
  if (companyName) body.companyName = companyName
  if (website) body.website = website
  if (source) body.source = source
  if (tags.length) body.tags = tags

  const res = await ghlFetch('/contacts/upsert', { method: 'POST', token, body, timeout })
  if (!res.ok) return res
  const contactId = res.json?.contact?.id
  if (!contactId) return { ok: false, error: `upsertContact: no contact id in response (${JSON.stringify(res.json).slice(0, 120)})` }
  return { ok: true, contactId, isNew: !!res.json?.new }
}

// Send an email to an existing contact through the location's configured
// sender (LC Email / dedicated domain). Omit emailFrom to use the location's
// default from-address. The html field accepts a full HTML document.
export async function sendEmail({
  token, contactId, subject, html, emailTo,
  emailFrom = undefined, version = CONVERSATIONS_VERSION, timeout = 12000,
}) {
  if (!token || !contactId || !subject || !html) {
    return { ok: false, error: 'sendEmail: token, contactId, subject, html required' }
  }
  const body = { type: 'Email', contactId, subject, html }
  if (emailTo) body.emailTo = emailTo
  if (emailFrom) body.emailFrom = emailFrom

  const res = await ghlFetch('/conversations/messages', { method: 'POST', token, body, version, timeout })
  if (!res.ok) return res
  return {
    ok: true,
    messageId: res.json?.messageId || res.json?.emailMessageId || null,
    conversationId: res.json?.conversationId || null,
  }
}

// Create an opportunity (a deal "card") in a pipeline for an existing contact.
// GHL API 2.0: POST /opportunities/. Requires the opportunities.write scope on
// the location token. pipelineId + pipelineStageId decide which board and
// column the card lands in — look them up once in the sub-account (or via
// GET /opportunities/pipelines?locationId=...) and pass them as env.
export async function createOpportunity({
  token, locationId, pipelineId, pipelineStageId = '',
  name = 'Growth Audit lead', contactId, monetaryValue = 0,
  status = 'open', timeout,
}) {
  if (!token || !locationId || !pipelineId || !contactId) {
    return { ok: false, error: 'createOpportunity: token, locationId, pipelineId, contactId required' }
  }
  const body = { locationId, pipelineId, name, status, contactId }
  if (pipelineStageId) body.pipelineStageId = pipelineStageId
  if (monetaryValue) body.monetaryValue = monetaryValue

  const res = await ghlFetch('/opportunities/', { method: 'POST', token, body, timeout })
  if (!res.ok) return res
  const opportunityId = res.json?.opportunity?.id || res.json?.id || null
  if (!opportunityId) {
    return { ok: false, error: `createOpportunity: no opportunity id in response (${JSON.stringify(res.json).slice(0, 120)})` }
  }
  return { ok: true, opportunityId }
}

// Attach a note to a contact (GHL API 2.0: POST /contacts/{id}/notes). GHL
// shows contact notes on the contact record AND on any opportunity card for
// that contact, so this is how the provisioning work-order lands right where
// the card lives. Requires the contacts.write scope (already used by upsert).
export async function addContactNote({ token, contactId, body: noteBody, timeout }) {
  if (!token || !contactId || !noteBody) {
    return { ok: false, error: 'addContactNote: token, contactId, body required' }
  }
  const res = await ghlFetch(`/contacts/${contactId}/notes`, {
    method: 'POST', token, body: { body: noteBody }, timeout,
  })
  if (!res.ok) return res
  return { ok: true, noteId: res.json?.note?.id || null }
}

// Create a task (a to-do item) on a contact. GHL API 2.0:
// POST /contacts/{contactId}/tasks. A task carries a title, an optional detail
// body, and a due date (GHL requires dueDate). Tasks show on the contact record
// and in the sub-account's Tasks list, so an ordered set of them reads as an
// action plan the client works through. Requires the contacts.write scope
// (already used by upsert). completed defaults to false.
export async function createTask({
  token, contactId, title, body = '', dueDate, completed = false, timeout,
}) {
  if (!token || !contactId || !title || !dueDate) {
    return { ok: false, error: 'createTask: token, contactId, title, dueDate required' }
  }
  const res = await ghlFetch(`/contacts/${contactId}/tasks`, {
    method: 'POST', token, body: { title, body, dueDate, completed }, timeout,
  })
  if (!res.ok) return res
  return { ok: true, taskId: res.json?.task?.id || res.json?.id || null }
}
