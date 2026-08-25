import { useEffect } from 'react'

// Ben's GoHighLevel "Meta Ads Form" — the qualifying form leads land in.
// Submissions go straight into the GHL sub-account; GHL handles the on-screen
// thank-you + the 15-minute booking flow after submit.
const FORM_ID = '0ZEUk8wen2x57BqLhDDr'
const EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js'

// Exported so page instrumentation can watch this frame for engagement without
// duplicating the id. See lib/analytics.js -> observeIframeEngagement.
export const QUALIFY_IFRAME_ID = `inline-${FORM_ID}`

export function SprintQualifyForm() {
  useEffect(() => {
    // Load GHL's embed script once (it auto-resizes the iframe to fit content).
    if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return
    const s = document.createElement('script')
    s.src = EMBED_SCRIPT
    s.async = true
    document.body.appendChild(s)
  }, [])

  return (
    <iframe
      src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
      title="Meta Ads Form"
      id={QUALIFY_IFRAME_ID}
      data-form-id={FORM_ID}
      data-layout-iframe-id={`inline-${FORM_ID}`}
      data-form-name="Meta Ads Form"
      style={{ width: '100%', height: '718px', border: 'none' }}
    />
  )
}
