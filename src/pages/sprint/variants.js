// Per-page copy for the two Sprint landing pages (Ben's rebuild brief).
// Only the hero headline, subhead, trust block, "what you've built" examples,
// and the CTA label change between pages; everything else in SprintLanding is
// shared and identical.

export const softwareYouLove = {
  slug: 'software-you-love',
  pixelName: 'SaaSless Forge Sprint — Software You Love',
  heroHeadline: 'Stuck With Software You Hate?',
  heroSubhead:
    'Ancient, overpriced, or hard to use — trade it for custom software you love, in one week.',
  // Rendered as paragraphs.
  trustBlock: [
    "Most owners running bad software know it's a problem long before they do anything about it — not because they don't know better, but because fixing it always seemed like a bigger project than living with it one more month, one more renewal. A Sprint isn't a bigger project. It's one week — and it ends with software you actually enjoy opening, not one more thing you put up with.",
  ],
  ctaLabel: 'See If You Qualify',
  // Real examples of what business owners have built with a Sprint (Ben's brief).
  // NOTE: Ben wants 4–6 total — awaiting more examples from Matt.
  builds: [
    ['Contractor Takeoff', 'Takeoff software for excavators and general contractors — estimate jobs in minutes, not evenings.'],
    ['Crew Scheduling', 'An employee scheduling app for a cleaning company with a large workforce — right people, right jobs.'],
    ['HVAC Customer Texting', 'Texts customers on job progress and keeps every technician text logged and searchable.'],
  ],
}

export const growingFast = {
  slug: 'growing-fast',
  pixelName: 'SaaSless Forge Sprint — Growing Fast',
  heroHeadline: 'Ready For Software That Keeps Up With You?',
  heroSubhead:
    'Custom software built around how you actually run things, delivered in one week.',
  // Split into two short paragraphs (Ben's brief).
  trustBlock: [
    'Most business owners who try to build with AI themselves lose real time to trial and error before they get something usable — if they get there at all.',
    "A Sprint skips that. One week in, you have a tool that doesn't miss data, handles the busywork, and hands back hours every week — without the learning curve.",
  ],
  ctaLabel: 'Start My Sprint',
  // Page 2 keeps the shared "what you get" scope list (builds: null).
  builds: null,
}
