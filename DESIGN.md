# Design System Specification: Tonal Engineering & Architectural Weight

## 1. Overview & Creative North Star: "The Monolith"
This design system is built upon the "Monolith" philosophy. We are moving away from the ephemeral, "airy" nature of modern web design and returning to the gravity of industrial craftsmanship. Every interface element should feel as though it was forged from iron and anchored into obsidian.

To break the "template" look, we utilize **Intentional Brutalism**. We reject the safety of rounded corners and thin lines. Instead, we embrace sharp 90-degree angles, massive typographic scales, and high-contrast lighting. The digital experience should feel like a physical space—specifically, a high-end engineering workshop where every tool has a purpose and every surface has weight.

### The Creative North Star: "Architectural Integrity"
*   **Substantiality:** Elements do not "float"; they are mounted.
*   **Asymmetry:** Avoid perfect centers. Use heavy left-aligned blocks to create a sense of structural loading.
*   **High-Contrast Lighting:** Use the interaction between `#0E0E0E` (Lowest) and `#353534` (Highest) to mimic a spotlight hitting a dark metal surface.

---

## 2. Colors & Surface Logic

### The "No-Line" Sectioning Rule
Standard 1px borders are strictly prohibited for sectioning. They are "thin" and "flimsy." To define boundaries, utilize **Background Shifts**. A section transition is signaled by moving from `surface` (#131313) to `surface_container_low` (#1C1B1B). If an edge must be defined, use a 2px or 4px "Heavy Stroke" of `outline_variant` (#444748), but never a 1px line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical plates.
1.  **Base Layer:** `surface_container_lowest` (#0E0E0E) for the deep background.
2.  **Primary Panels:** `surface_container` (#201F1F) for main content areas.
3.  **Active/Hover Components:** `surface_bright` (#3A3939) to simulate light reflecting off a metallic edge.

### The "Iron & Ember" Signature
*   **Primary Accent:** Use `primary` (#FFB68C) and `on_primary_container` (#B46531) to represent the "glow of the forge." These are your "burnt iron" highlights.
*   **Metallic Gradients:** For Hero backgrounds or main CTAs, use a linear gradient from `surface_container_highest` (#353534) to `surface_container_lowest` (#0E0E0E) at a 45-degree angle to create a "brushed steel" effect.

---

## 3. Typography: The Architectural Scale

Our typography is the scaffolding of the system. We use **Space Grotesk** for its wide, mechanical stance and **Inter** for its technical precision in data-heavy environments.

*   **Display (Space Grotesk):** Set to `display-lg` (3.5rem) with `-0.04em` letter spacing. This should feel like a stamp on a shipping container. Heavy, wide, and undeniable.
*   **Headlines (Space Grotesk):** Use `headline-lg` (2rem) in all-caps for section headers to reinforce the industrial aesthetic.
*   **Body (Inter):** Use `body-md` (0.875rem) for all functional text. The smaller size contrasted against massive headers creates a "technical manual" feel.
*   **Labels (Space Grotesk):** `label-md` (0.75rem) should always be Uppercase with `0.1em` letter spacing, acting as "engraved" metadata on components.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "soft" for this system. We achieve depth through **Tonal Stacking** and **Chiaroscuro (Light/Dark) Contrast**.

*   **The Layering Principle:** Instead of a shadow, place a `surface_container_highest` card on top of a `surface_container_lowest` background. The value shift provides the "lift."
*   **Industrial Spotlight:** When a floating element is mandatory (e.g., a Modal), use a shadow with `0px` offset, `40px` blur, and 12% opacity using the `primary` (#FFB68C) color. This creates a "warm glow" from the forge rather than a grey shadow.
*   **The Ghost Border:** For input fields or cards, use `outline_variant` (#444748) at 20% opacity. This "Ghost Border" provides a hint of structure without cluttering the visual weight.
*   **Corner Treatment:** All `borderRadius` tokens are set to `0px`. Sharp corners are mandatory to maintain architectural integrity.

---

## 5. Components

### Buttons: The "Forged" Variant
*   **Primary:** Background: `primary` (#FFB68C); Text: `on_primary` (#532200). 0px Radius. No border. On hover, shift to `primary_fixed` (#FFDBC9).
*   **Secondary:** Background: `transparent`; Border: 2px Solid `secondary` (#C8C6C6); Text: `secondary`.
*   **Tertiary:** Text: `on_surface_variant`. No background. Use for "Internal Tooling" actions.

### Input Fields: The "Engraved" Look
*   **Resting:** `surface_container_highest` background with a bottom-only border of 2px `outline` (#8E9192). 
*   **Focus:** Border color shifts to `primary` (#FFB68C). Background remains dark.
*   **Error:** Border shifts to `error` (#FFB4AB).

### Cards & Lists: The "No-Divider" Rule
*   Forbid `hr` or divider lines. To separate list items, use a `12px` vertical gap and alternate background colors between `surface_container_low` and `surface_container`.
*   **Cards:** Should never have a border. Use `surface_container_high` (#2A2A2A) as the card body against a `surface` background.

### Added Component: "The Gauge"
In place of standard progress bars, use "The Gauge"—a thick, 8px bar using `surface_container_highest` as the track and a `primary` (burnt iron) fill. This reinforces the engineering theme.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use extreme scale. Pair a 3.5rem headline with 0.75rem metadata.
*   **Do** use "Inertia" in animations. Elements should feel heavy, moving with a slight "thud" (use `cubic-bezier(0.2, 0, 0, 1)`).
*   **Do** use text as a graphic element. Large, low-opacity background characters (e.g., `01`, `02`) can help ground a layout.

### Don't:
*   **Don't** use "Soft" colors. Avoid pastels or vibrant blues. Stick to the iron, charcoal, and fire palette.
*   **Don't** use any rounded corners. Even a 4px radius breaks the industrial "Monolith" effect.
*   **Don't** use icons with rounded terminals. Use sharp, geometric iconography (e.g., Phosphor Bold or custom SVG paths).
*   **Don't** use center-alignment for long-form content. Left-align everything to maintain the "Technical Blueprint" aesthetic.

---

## 7. Application: Slide Deck
- **Cover Slide:** Large-scale Space Grotesk header on a pure Obsidian (#0E0E0E) background. Molten Amber (#FFB68C) for title text.
- **Data Visualization:** Use high-contrast line work and Molten Amber for data points. Avoid complex gradients.
- **Philosophy Slides:** Use full-bleed industrial imagery with centered, high-weight text overlays.
- **Footer/Utility:** Small, uppercase tracking-widest text at the bottom of slides for consistency.
- **Transitions:** Heavy, linear fades. No bouncy or playful animations.
