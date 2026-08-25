// Forge Analytics helpers — the shared event vocabulary, in one place.
//
// The SDK is loaded from the App Manager by a <script defer> in index.html, so
// window.fa may not exist yet when React mounts (and won't exist at all if an
// ad blocker eats it). Every call here is guarded: missing analytics degrades
// to silence, never to a broken page.
//
// Event names and property names are the SaaSless Forge standard. Keep them
// identical across properties so a funnel query written for one site works on
// the next one without edits.

function sdk() {
  return typeof window !== 'undefined' && window.fa && window.fa.track ? window.fa : null
}

export function track(name, properties) {
  try {
    sdk()?.track(name, properties)
  } catch {
    /* analytics must never break a page */
  }
}

export function goal(name, value) {
  try {
    sdk()?.goal(name, value)
  } catch {
    /* no-op */
  }
}

/** Visitor-scoped dimensions — set once, attached to every later event. */
export function setDimensions(dimensions) {
  try {
    sdk()?.setDimensions(dimensions)
  } catch {
    /* no-op */
  }
}

/**
 * Fire once per milestone as the visitor scrolls. Returns a cleanup function.
 * Milestones are percentages of scrollable height, not viewport positions, so
 * a short page doesn't report 100% on load.
 */
export function observeScrollDepth(milestones = [25, 50, 75, 100]) {
  if (typeof window === 'undefined') return () => {}
  const pending = new Set(milestones)

  function onScroll() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    if (scrollable <= 0) return
    const pct = ((window.scrollY / scrollable) * 100)
    for (const m of [...pending]) {
      if (pct >= m) {
        pending.delete(m)
        track('scroll_depth', { depth: m })
      }
    }
    if (pending.size === 0) window.removeEventListener('scroll', onScroll)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll() // a tall viewport may already clear the first milestone
  return () => window.removeEventListener('scroll', onScroll)
}

/**
 * Fire `section_view` the first time each named section is half on screen.
 * Sections are identified by their DOM id. Returns a cleanup function.
 */
export function observeSections(ids) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return () => {}
  const seen = new Set()

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const id = entry.target.id
        if (seen.has(id)) continue
        seen.add(id)
        track('section_view', { section: id })
        io.unobserve(entry.target)
      }
    },
    { threshold: 0.5 },
  )

  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) io.observe(el)
  }
  return () => io.disconnect()
}

/**
 * Detect that the visitor started interacting with a cross-origin iframe.
 *
 * We cannot see inside the GoHighLevel form — its embed script emits only
 * resize and load messages, nothing for submit — so this is the last signal
 * available from the parent page. When focus moves into the iframe the window
 * blurs and document.activeElement becomes that frame, which is a reliable
 * proxy for "started filling the form". Fires once.
 *
 * This gives us reached-form and started-form. Completed-form still requires
 * either a native form or a post-submit redirect to a page we own.
 */
export function observeIframeEngagement(iframeId, eventName = 'form_start', properties = {}) {
  if (typeof window === 'undefined') return () => {}
  let fired = false

  function onBlur() {
    if (fired) return
    // activeElement updates after the blur event resolves.
    window.setTimeout(() => {
      if (fired) return
      const active = document.activeElement
      if (active && active.tagName === 'IFRAME' && active.id === iframeId) {
        fired = true
        track(eventName, properties)
        window.removeEventListener('blur', onBlur)
      }
    }, 0)
  }

  window.addEventListener('blur', onBlur)
  return () => window.removeEventListener('blur', onBlur)
}
