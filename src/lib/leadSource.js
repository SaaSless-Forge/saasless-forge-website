// Capture where a visitor came from (ad params + referrer) on first load and
// persist it for the whole session, so a form submission can be tagged by its
// source even when the visitor navigates away from the landing page before
// signing up. Read back as hidden form fields via LeadSourceFields.

const STORAGE_KEY = 'sf-lead-source'

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
]

// Every field name we may emit as a hidden input. Keep in sync with the
// Netlify form stubs in index.html — Netlify only records fields it saw there.
export const LEAD_SOURCE_FIELDS = [...UTM_KEYS, 'referrer', 'landing_page']

// Run once at app bootstrap. First touch wins: we do not overwrite an existing
// captured source on later navigations within the same session.
export function captureLeadSource() {
  if (typeof window === 'undefined') return
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return
    const params = new URLSearchParams(window.location.search)
    const data = {}
    for (const key of UTM_KEYS) {
      const val = params.get(key)
      if (val) data[key] = val
    }
    const ref = document.referrer || ''
    if (ref && !ref.startsWith(window.location.origin)) data.referrer = ref
    data.landing_page = window.location.pathname
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (err) {
    // sessionStorage can throw in private mode / sandboxed frames. A missing
    // source is non-fatal, but surface it rather than swallow it.
    console.warn('[leadSource] capture failed:', err)
  }
}

// Captured values to inject as hidden form fields. Empty object if none.
export function getLeadSource() {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
  } catch (err) {
    console.warn('[leadSource] read failed:', err)
    return {}
  }
}
