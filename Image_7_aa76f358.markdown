---
name: Cosmic Luminary
colors:
  surface: '#0e1321'
  surface-dim: '#0e1321'
  surface-bright: '#343948'
  surface-container-lowest: '#090e1c'
  surface-container-low: '#161b2a'
  surface-container: '#1a1f2e'
  surface-container-high: '#252a39'
  surface-container-highest: '#303444'
  on-surface: '#dee2f6'
  on-surface-variant: '#bac9cc'
  inverse-surface: '#dee2f6'
  inverse-on-surface: '#2b303f'
  outline: '#849396'
  outline-variant: '#3b494c'
  surface-tint: '#00daf3'
  primary: '#c3f5ff'
  on-primary: '#00363d'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#006875'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#a8ffd2'
  on-tertiary: '#003824'
  tertiary-container: '#5be9ad'
  on-tertiary-container: '#006645'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0e1321'
  on-background: '#dee2f6'
  surface-variant: '#303444'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: 4.25rem
    letterSpacing: -0.02em
  display-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.5rem
    fontWeight: '700'
    lineHeight: 3rem
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.015em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  code-lg:
    fontFamily: JetBrains Mono
    fontSize: 1rem
    fontWeight: '500'
    lineHeight: 1.5rem
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a welcoming, scientifically precise, and visually radiant environment engineered specifically for newcomers entering quantum computing. Quantum mechanics often intimidates beginners through dense mathematical formalism and austere terminal interfaces. This system counters that friction by marrying deep space aesthetics with approachable, human-scaled interface patterns.

The emotional baseline is discovery, reassurance, and clarity. Interfaces feel like a state-of-the-art observatory console: profound dark depths punctured by laser-focused neon beacons and luminous guidance paths.

The design movement blends **Glassmorphism** with **Technical Precision Minimalist UI**:
- Surfaces utilize semi-translucent, atmospheric dark navy layers with fine frosted blurs that echo deep space depth.
- Key focal actions utilize luminous edge gradients and controlled neon halos (electric cyan and ultraviolet), signaling interactive state and energetic potential.
- Visual noise is strictly minimized; typography is crisp, airy, and high-contrast to keep complex circuit telemetry legible and unthreatening.

## Colors

The palette simulates a deep-space quantum console, deploying luminous chromatic markers over layered cosmic dark neutrals.

### Surface Hierarchy
- **Canvas Base (`#0A0F1D`)**: The foundational void; absolute background for high-level layouts.
- **Surface Elevation 1 (`#0F172A`)**: Base container fill for panels, sidebars, and nested canvas sections.
- **Surface Elevation 2 (`#161F38`)**: Floating card bodies, modal dialogs, and interactive interactive circuit wells.
- **Surface Elevation 3 (`#1E294B`)**: Hover states, active segmented controllers, and high-attention containers.

### Accent & Feedback Palette
- **Electric Cyan (`#00E5FF` / `#38BDF8`)**: Primary action, circuit execution triggers, pulse markers, active state halos, and qubit entanglement lines.
- **Ultraviolet / Royal Purple (`#8B5CF6` / `#A855F7`)**: Secondary accents, theoretical guides, AI assistant suggestions, and quantum gate annotations.
- **Emerald Quantum (`#10B981`)**: Success confirmations, optimal backend recommendations ("Best Match"), and low-error circuit fidelity metrics.
- **Signal Amber (`#F59E0B`)**: Queue delays, decoherence warnings, and calibration drifts.
- **Laser Rose (`#F43F5E`)**: Gate compilation errors, qubit topological conflicts, and execution failures.

### Text & Border Contrast
- **Text High-Emphasis (`#F8FAFC`)**: Circuit labels, headings, code highlights, and primary metrics.
- **Text Mid-Emphasis (`#94A3B8`)**: Secondary annotations, explanations, and parameter descriptors.
- **Text Low-Emphasis (`#64748B`)**: Inactive qubits, code comments, and metadata stamps.
- **Border Ghost (`rgba(255, 255, 255, 0.08)`)**: Structural division lines.
- **Border Luminous (`rgba(0, 229, 255, 0.35)`)**: Selected cards, active execution steps, and focused inputs.

## Typography

The typography pairs **Plus Jakarta Sans** with **JetBrains Mono** to bridge human-first guidance with quantum computing syntax.

- **Plus Jakarta Sans** delivers warm, geometric legibility. Its open apertures and subtle rounded quirks temper the intimidation factor of quantum computing while preserving high scientific legibility.
- **JetBrains Mono** handles all Qiskit script snippets, mathematical operators, quantum states ($|0\rangle, |\psi\rangle$), qubit registers (`q[0]`, `cr[0]`), hardware latency figures, and technical step badges. Its expanded character height and distinctive glyph distinctions (such as crossed zeros and crisp braces) eliminate syntactic ambiguity for beginners.

All headings prioritize tight negative tracking (`-0.01em` to `-0.02em`) to remain sharp against cosmic backgrounds. Monospaced labels utilize positive tracking (`0.04em` to `0.06em`) and uppercase transformation for data pills and circuit registers.

## Layout & Spacing

The layout structure relies on a fluid 12-column desktop grid transitioning into an 8-column tablet grid and a 4-column mobile grid.

### Layout Geometry
- **Desktop (>= 1280px)**: 12 columns with `1.5rem` gutters and dynamic outer margins maxing out at `1440px` content width. Side-by-side arrangement: Circuit Builder / Execution Guide on 7 columns, Assistant / Qiskit Code Mirror on 5 columns.
- **Tablet (768px - 1279px)**: 8 columns with `1.25rem` gutters and `1.5rem` canvas margins. Stacked arrangement with collapsible telemetry drawers.
- **Mobile (< 768px)**: 4 columns with `1rem` gutters and `1rem` outer canvas margins. Sticky step-flow control dock pinned to bottom viewport.

### Spacing Philosophy
Rhythm follows an strict 8pt base scale (`space-xs: 4px`, `space-sm: 8px`, `space-md: 16px`, `space-lg: 24px`, `space-xl: 40px`). Dense circuit parameter strips use `space-sm` internal padding to optimize data density without visual clutter, while explanatory assistant prompts breathe within `space-lg` to encourage patient reading.

## Elevation & Depth

Depth in this design system avoids physical drop shadows in favor of **translucent luminescence and cosmic backdrops**.

### Elevation Tiers
- **Tier 0 (Substrate)**: Solid `#0A0F1D`.
- **Tier 1 (Surface Well / Cavity)**: `#0F172A` with an inset shadow (`inset 0 2px 4px rgba(0, 0, 0, 0.4)`) and `1px solid rgba(255, 255, 255, 0.04)`. Used for the circuit drag-and-drop grid.
- **Tier 2 (Default Card & Module)**: Semi-transparent backdrop (`rgba(22, 31, 56, 0.75)` with `16px` backdrop-filter blur), bound by `1px solid rgba(255, 255, 255, 0.08)`.
- **Tier 3 (Floating Overlay / Popover / Tooltip)**: `#1E294B` with `24px` backdrop-filter blur, bound by `1px solid rgba(139, 92, 246, 0.3)` and an ambient aura: `0 8px 32px -4px rgba(0, 0, 0, 0.6), 0 0 16px 0 rgba(139, 92, 246, 0.15)`.

### Luminous Borders & Focus Halos
Interactive states don't move "closer" to the eye via aggressive Y-axis offsets; instead, they "energize". When hovered or focused, elements develop a dual ring:
`box-shadow: 0 0 0 1px #00E5FF, 0 0 20px 2px rgba(0, 229, 255, 0.25);`

## Shapes

The design uses balanced, modern curves (`roundedness: 2`) to make advanced scientific tooling feel safe and ergonomic.

- **Primary Cards & Containers**: Fixed radius of `16px` (`rounded-lg`), softening technical readouts and creating friendly containment.
- **Buttons, Form Controls & Badges**: Standard radius of `8px` (`rounded-md`), establishing an anchor of structural precision.
- **Quantum Gates & Qubit Nodes**: Precision squircles of `8px` for computational blocks (Hadamard, CNOT, Pauli-X), retaining an identifiable tactile chip geometry.
- **Status Pills, Step Nodes & Telemetry Badges**: Full pill shape (`9999px`) to immediately convey status, state tags, and sequence position.

## Components

### Buttons
- **Primary ("Launch / Run Circuit")**: Solid Electric Cyan (`#00E5FF`) background with pitch slate text (`#0A0F1D`), bold weight (`600`). On hover, emits a radiant cyan glow (`box-shadow: 0 0 24px rgba(0, 229, 255, 0.45)`).
- **Secondary ("Optimize / Suggest")**: Translucent Royal Purple tint (`rgba(139, 92, 246, 0.15)`), border `1px solid #8B5CF6`, text `#F8FAFC`. Hover brings `rgba(139, 92, 246, 0.3)`.
- **Ghost / Neutral**: Transparent with text `#94A3B8`, shifting to `#F8FAFC` and background `rgba(255, 255, 255, 0.06)` on hover.

### Step Progress Indicator ("Circuit Journey")
- Horizontal connected rail with luminous pulse lines.
- **Completed Steps**: Filled Emerald (`#10B981`) ring with a micro check icon; connecting line glows green.
- **Current Step**: Ring bordered in Cyan (`#00E5FF`) with a breathing centered dot and soft radial blur behind it; step title in `#F8FAFC`.
- **Upcoming Steps**: Bordered in `rgba(255, 255, 255, 0.15)` with muted text `#64748B`.

### Quantum System Cards (IBM Backend Selector)
- Multi-tier surface (`#161F38`, 16px radius) showcasing hardware stats (Qubits, Quantum Volume, CLOPS, Queue length).
- Top right displays the **"Best Match"** badge: Emerald surface tint (`rgba(16, 185, 129, 0.12)`), text `#10B981`, border `1px solid rgba(16, 185, 129, 0.3)`.
- Selected hardware card features an unbroken `1.5px` border in Electric Cyan with soft cyan underglow.

### Code Mirrors (Qiskit Panel)
- Background `#0A0F1D` inset container, `12px` border radius, line numbers rendered in `#64748B`.
- Syntax coloring: Keywords in `#A855F7` (Ultraviolet), Methods in `#00E5FF` (Cyan), Strings in `#10B981` (Emerald), Values/Registers in `#38BDF8`.

### Tooltips & "Quantum Explainer" Overlays
- Floating backdrop-blurred slate bubble (`#1E294B`, 90% opacity, 12px blur) with a hairline `#8B5CF6` border.
- Prefaced by a small violet sparkle or info icon. Explains complex terms (e.g., "Superposition", "Phase Flip") in non-academic language with a mini visual diagram.

### Inputs & Sliders (Shots, Angle $\theta, \phi$)
- **Text/Numeric Inputs**: Background `#0F172A`, border `1px solid rgba(255, 255, 255, 0.12)`, text `#F8FAFC`. Focus ring transitions to Electric Cyan.
- **Slider Track**: `4px` height, filled track in `#00E5FF`, thumb is a `16px` white circle with an Electric Cyan aura (`0 0 10px #00E5FF`).