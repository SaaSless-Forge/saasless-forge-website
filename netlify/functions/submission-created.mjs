// Netlify triggered function: fires after every form submission on the site.
// We forward ONLY the two Sprint lead forms into the GoHighLevel sub-account
// as tagged contacts, so Ben/Matt can work them. All other forms (contact,
// sms-*) are ignored here.
//
// Env (set on the Netlify site, never committed):
//   GHL_SUB_TOKEN        - private integration token for the Sprint sub-account
//   GHL_SUB_LOCATION_ID  - the Sprint sub-account's location id
import { upsertContact } from './lib/ghl.mjs'

const TOKEN = process.env.GHL_SUB_TOKEN
const LOCATION_ID = process.env.GHL_SUB_LOCATION_ID

const SPRINT_FORMS = new Set(['sprint-signup', 'sprint-intake'])

export const handler = async (event) => {
  let payload
  try {
    payload = JSON.parse(event.body).payload
  } catch (err) {
    console.error('[submission-created] could not parse payload:', err)
    return { statusCode: 400, body: 'bad payload' }
  }

  const formName = payload?.form_name
  if (!SPRINT_FORMS.has(formName)) {
    return { statusCode: 200, body: `ignored: ${formName || 'unknown'}` }
  }

  if (!TOKEN || !LOCATION_ID) {
    console.error('[submission-created] missing GHL_SUB_TOKEN or GHL_SUB_LOCATION_ID env')
    return { statusCode: 500, body: 'missing GHL config' }
  }

  const d = payload.data || {}
  const email = d.email
  if (!email) {
    console.error(`[submission-created] ${formName} submission has no email; skipping`)
    return { statusCode: 200, body: 'no email' }
  }

  // Tag by lead type + captured ad source so Ben can segment in GHL.
  const tags = ['sprint', formName === 'sprint-intake' ? 'sprint-application' : 'sprint-signup']
  if (d.fbclid) tags.push('facebook')
  if (d.utm_source) tags.push(`src:${d.utm_source}`)
  if (d.utm_campaign) tags.push(`campaign:${d.utm_campaign}`)
  if (d.utm_content) tags.push(`ad:${d.utm_content}`)

  const source = formName === 'sprint-intake' ? 'Sprint application' : 'Sprint signup'

  const result = await upsertContact({
    token: TOKEN,
    locationId: LOCATION_ID,
    email,
    name: d.name || '',
    phone: d.phone || d.mobile || '',
    companyName: d.company || d.business || '',
    website: d.website || '',
    source,
    tags,
  })

  if (!result.ok) {
    console.error(`[submission-created] GHL upsert failed for ${email}:`, result.error)
    return { statusCode: 502, body: 'ghl upsert failed' }
  }

  console.log(
    `[submission-created] GHL contact ${result.contactId} (new=${result.isNew}) from ${formName}`,
  )
  return { statusCode: 200, body: 'ok' }
}
