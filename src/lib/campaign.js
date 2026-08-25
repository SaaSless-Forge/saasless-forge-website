// Campaign attribution — talks to the SaaSless Forge campaigns API.
//
// A campaign is defined in SaaSless Forge, not here (see CLAUDE.md). This
// module covers step 2 and step 3 of the documented flow: register the arrival
// so the App Manager can attribute it, and carry the returned token through to
// Stripe so a purchase ties back to the ad that produced it.
//
// Without this, campaign attribution is blind: the App Manager had recorded
// ONE Meta click against ~253 Facebook-referred sessions, because nothing was
// ever posting to /clicks.
//
// Everything here is best-effort and must never block or break a page — a
// failed attribution call is a reporting gap, not a broken funnel.

import { getLeadSource } from './leadSource'

const API_BASE = 'https://saasless-forge-app-manager.onrender.com/api/campaigns/v1'
const TOKEN_KEY = 'sf-click-token'

// The API names this `landing_path`; leadSource captured it as `landing_page`.
function clickPayload() {
  const src = getLeadSource()
  const { landing_page: landingPage, ...rest } = src
  return { ...rest, landing_path: landingPage || window.location.pathname }
}

function readToken() {
  try {
    return window.sessionStorage.getItem(TOKEN_KEY) || null
  } catch {
    return null
  }
}

/**
 * Register this arrival with the campaign and remember the token.
 * First touch wins — a second call in the same session is a no-op, so
 * navigating between /sprint and /sprint-growth doesn't double-count.
 */
export async function registerClick(slug) {
  if (typeof window === 'undefined') return null

  const existing = readToken()
  if (existing) return existing

  try {
    const res = await fetch(`${API_BASE}/${slug}/clicks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clickPayload()),
    })
    if (!res.ok) {
      console.warn('[campaign] click registration returned', res.status)
      return null
    }
    const { token } = await res.json()
    if (token) {
      try {
        window.sessionStorage.setItem(TOKEN_KEY, token)
      } catch {
        // Private mode — we still return the token for this page view.
      }
    }
    return token || null
  } catch (err) {
    // Offline, blocked by an extension, API down. Non-fatal by design.
    console.warn('[campaign] click registration failed:', err)
    return null
  }
}

/**
 * Attach the click token to a Stripe payment link. The API tells us which
 * param to use (`click_param`), which is `client_reference_id` today; we send
 * that name so a change on the platform side doesn't need a change here.
 */
export function withClickToken(paymentUrl, param = 'client_reference_id') {
  const token = readToken()
  if (!token) return paymentUrl
  try {
    const url = new URL(paymentUrl)
    url.searchParams.set(param, token)
    return url.toString()
  } catch {
    return paymentUrl
  }
}
