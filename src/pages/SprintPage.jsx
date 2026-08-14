import SprintLanding from './sprint/SprintLanding'
import { softwareYouLove } from './sprint/variants'

// Page 1 — "Software You Love" (/sprint). Target of the "hate old software /
// overpaying" ads. All shared sections live in SprintLanding.
export default function SprintPage() {
  return <SprintLanding variant={softwareYouLove} />
}
