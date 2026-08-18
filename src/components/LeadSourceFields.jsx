import { getLeadSource } from '@/lib/leadSource'

// Hidden inputs that carry captured ad-source data (utm_*, fbclid, referrer,
// landing_page) into a Netlify form submission. Renders only the fields that
// were actually captured; every possible name is declared in the matching
// Netlify stub in index.html so Netlify records them.
export function LeadSourceFields() {
  const source = getLeadSource()
  return (
    <>
      {Object.entries(source).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
    </>
  )
}
