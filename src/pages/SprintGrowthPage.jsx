import SprintLanding from './sprint/SprintLanding'
import { growingFast } from './sprint/variants'

// Page 2 — "Growing Fast" (/sprint-growth). Target of the efficiency / growth /
// AI ads. Same page shape as /sprint; only hero + subhead + trust block differ.
export default function SprintGrowthPage() {
  return <SprintLanding variant={growingFast} />
}
