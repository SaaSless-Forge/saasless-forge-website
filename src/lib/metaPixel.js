// Meta Pixel — scoped to the Sprint ad funnel (landing + success pages only).
// The pixel loads lazily the first time a Sprint page mounts, so the rest of
// the site is unaffected.
//
// TODO: replace META_PIXEL_ID with the real Pixel ID from Meta Events Manager.
const PIXEL_ID = 'META_PIXEL_ID'

let loaded = false

function ensureLoaded() {
  if (loaded || typeof window === 'undefined') return
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
export function pixelTrack(event, params) {
  ensureLoaded()
  if (window.fbq) window.fbq('track', event, params)
}
