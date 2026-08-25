// Meta Pixel — scoped to the Sprint ad funnel (landing + success pages only).
// The pixel loads lazily the first time a Sprint page mounts, so the rest of
// the site is unaffected.
//
// Real Pixel ID from Meta Events Manager.
//
// The SaaSless Forge ad account is 1546419312980583 (verified in Ads Manager,
// business portfolio "SaaSless Forge" — it holds exactly one ad account, and
// the H-series Sprint ads run from it). A previous comment here named account
// 663640977025503, which matches nothing reachable from that portfolio; it was
// most likely typed from memory. Recorded so the next person doesn't chase it.
const PIXEL_ID = '1647306493682347'

let loaded = false

function ensureLoaded() {
  if (loaded || typeof window === 'undefined') return
  // Pixel ID not filled in yet — stay a no-op so the page ships cleanly without tracking.
  if (PIXEL_ID === 'META_PIXEL_ID') return
  loaded = true
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  /* eslint-enable */
  window.fbq('init', PIXEL_ID)
}

// Landing page view.
export function pixelPageView() {
  ensureLoaded()
  if (window.fbq) window.fbq('track', 'PageView')
}

// Buy-button click, purchase, or any standard event.
// `options` carries fbq's fourth argument — notably { eventID }, which lets Meta
// de-duplicate this browser event against the same conversion reported
// server-side via the Conversions API.
export function pixelTrack(event, params, options) {
  ensureLoaded()
  if (!window.fbq) return
  if (options) {
    window.fbq('track', event, params, options)
  } else {
    window.fbq('track', event, params)
  }
}
