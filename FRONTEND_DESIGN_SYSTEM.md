# FundOS Web Investor Frontend — Comprehensive Design System & Implementation Spec

**Status:** Ready for Figma → Dev handoff

---

## Vision & Philosophy

The FundOS investor frontend must convey:
- **Crédibilité institutionnelle** (institutional trust) tempered with modern energy
- **Clarté analytique** (crystal-clear signal hierarchy)  
- **Désir d'explorer** (compelling drill-down interactions)
- **IA sans écrasement** (AI assistance that empowers, not overwhelms)

The competitor set: Sequoia's portfolio tools, AngelList research UI, premium fintech dashboards (not crypto trading desks).

---

## Design DNA

### Core Philosophy
- **Sobriété, pas austérité.** Ample white, precise chiffres, few accent moments.
- **Dense mais aérée.** Information-rich cards with generous internal padding and gap rhythm.
- **Signaux visuels discrets.** Color, weight, position all carry semantic meaning.
- **Hiérarchie typographique forte.** Users scan not read; headings and numerics must be unmissable.
- **Interaction ≠ animation.** Every hover, click, transition must communicate affordance or state change.

---

## Color System

### Semantic Palette

| Usage | Token | Hex | Role |
|-------|-------|-----|------|
| **App Background** | `surface.app` | `#F6F8FB` | Neutral canvas, slight cool tint |
| **Card/Surface** | `surface.default` | `#FFFFFF` | Primary content container |
| **Surface Elevated** | `surface.elevated` | `#FCFDFE` | Subtle depth (drawers, modals) |
| **Surface Muted** | `surface.muted` | `#F2F4F7` | Secondary backgrounds |
| **Border Default** | `border.default` | `#E4E7EC` | Standard divider, subtle |
| **Border Strong** | `border.strong` | `#D0D5DD` | Emphasized divider, form focus |
| **Text Primary** | `text.primary` | `#0F1728` | Headings, body text |
| **Text Secondary** | `text.secondary` | `#667085` | Labels, helper text |
| **Text Tertiary** | `text.tertiary` | `#98A2B3` | Disabled, very muted context |
| **Primary Teal** | `accent.primary` | `#0F766E` | Main CTA, key highlights |
| **Primary Hover** | `accent.primary.hover` | `#0C5F59` | Interactive state |
| **Info Blue** | `accent.info` | `#2E90FA` | Secondary actions, info states |
| **Success Green** | `accent.success` | `#12B76A` | Positive outcomes, verified |
| **Warning Orange** | `accent.warning` | `#F79009` | Attention needed, caution |
| **Danger Red** | `accent.danger` | `#F04438` | Risk, critical errors, destructive actions |
| **Accent Lavender** | `accent.lavender` | `#7A5AF8` | Data viz accents, tags (tertiary) |

### Usage Rules
- **Never nest accent colors.** Primary CTA buttons use teal, secondary use outline.
- **Color carries meaning.** Green = success; orange = action needed; red = risk only.
- **Borders always subtle.** Use `border.default` unless interactive (form focused = `border.strong`).
- **Text hierarchy:** Primary for content, secondary for labels, tertiary only for disabled/muted.

---

## Typography

### Typeface Stack
- **Display / Headings:** Satoshi, General Sans (or system fallback: -apple-system, BlinkMacSystemFont)
- **Body / UI:** Inter (optimized for on-screen reading)
- **Numeric (KPIs):** Inter with tabular figures (fixed-width numerals for tables)

### Scale

| Role | Font Size | Line Height | Weight | Use Case |
|------|-----------|-------------|--------|----------|
| **Display XL** | 48px | 56px | semibold | Hero titles (full page) |
| **Display L** | 40px | 48px | semibold | Large page headers |
| **H1** | 32px | 40px | semibold | Page title |
| **H2** | 28px | 36px | semibold | Section header |
| **H3** | 24px | 32px | medium | Subsection, card title |
| **H4** | 20px | 28px | medium | Component heading |
| **Body L** | 18px | 28px | regular | Large body, intro copy |
| **Body** | 16px | 24px | regular | Standard body text, UI labels |
| **Body S** | 14px | 22px | regular | Secondary text, form helper |
| **Caption** | 12px | 18px | medium | Meta, timestamps, footnotes |
| **Numeric KPI XL** | 36px | 40px | semibold | Large stat (hero card) |
| **Numeric KPI L** | 28px | 32px | semibold | Medium stat (KPI card) |

### Typography Rules
- **Line length:** Max 600px for body text (readability).
- **Contrast ratio:** All text must meet WCAG AA (4.5:1 normal, 3:1 large).
- **Tabular numerics:** Enable in tables and KPI displays for alignment.
- **Letter spacing:** Default Inter spacing; no additional tweaks unless noted.

---

## Spacing & Rhythm

### Spacing Scale
```
0 / 2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128
 └─ dense  ─┘ └────── standard ──────┘ └───── spacious ─────┘
```

### Padding Rules

| Context | Padding |
|---------|---------|
| **Card / Surface** | 24px horizontal, 24px vertical |
| **Form Input** | 12px horizontal, 14px vertical (for 48px height field) |
| **Button (md)** | 12px horizontal, 12px vertical |
| **Dense List Row** | 12px horizontal, 16px vertical |
| **Hero Section** | 48px horizontal, 40px vertical |
| **Modal / Drawer** | 24px all sides |

### Gap Rules (flex/grid)

| Context | Gap |
|---------|-----|
| **Card content sections** | 24px (vertical), 16px (horizontal) |
| **Form fields** | 16px (vertical stack) |
| **List rows** | 12px between items |
| **KPI card strip** | 16px between cards (grid) |
| **Button groups** | 12px between buttons (horizontal) |

---

## Border Radius & Shapes

### Radius Scale
| Size | Radius | Use |
|------|--------|-----|
| **Tight** | 8px | None in main system; reserved |
| **Small** | 12px | Small components, list item rows |
| **Default** | 16px | Primary surfaces, cards |
| **Large** | 20px | Modals, elevated surfaces |
| **Full** | 9999px | Capsules, badges, circular buttons |

### Shape Rules
1. **Card Surfaces:** radius-16, subtle shadow (see Shadows)
2. **Modals / Drawers:** radius-20, elevated shadow
3. **Badges / Chips:** radius-full (capsule), padding 6px horizontal
4. **Buttons:** radius-12 (standard), radius-14 (hero CTA)
5. **Input Fields:** radius-12
6. **Tabs / Segments:** radius-14 per segment (container radius-16)

---

## Shadows & Depth

### Shadow Scale
| Depth | Blur | Spread | Offset | Opacity | Use |
|-------|------|--------|--------|---------|-----|
| **None** | 0 | 0 | 0 | — | Body text, default surfaces |
| **Subtle** | 4px | 0px | 1px Y | 4% | Hover states, very light lift |
| **Small** | 8px | 0px | 2px Y | 6% | Card hover, faint depth |
| **Medium** | 12px | 0px | 4px Y | 8% | Drawers, medium modals |
| **Large** | 16px | 0px | 8px Y | 12% | Full modals, critical overlays |

**Color:** Always `#0F1728` (text-primary) at specified opacity.

### Shadow Application
- **Cards at rest:** None or subtle (barely perceptible)
- **Cards on hover:** Small shadow, subtle lift (1–2px Y transform)
- **Drawers:** Medium shadow (suggest depth without drama)
- **Modals:** Large shadow (backdrop blur + shadow for prominence)

---

## Button System

### Button Variants

#### Primary (Filled Teal)
```
State    | Bg            | Text        | Border       | Usage
---------|---------------|-------------|--------------|--------------------
Default  | #0F766E       | #FFFFFF     | none         | Main CTA
Hover    | #0C5F59       | #FFFFFF     | none         | User hovers
Active   | #0C5F59       | #FFFFFF     | none         | Pressed (1px compress)
Focus    | #0F766E       | #FFFFFF     | #0F766E 2px  | Keyboard focus
Disabled | #D0D5DD       | #FFFFFF     | none         | Unavailable
Loading  | #0F766E       | spinner     | none         | Processing
```

#### Secondary (Outline)
```
State    | Bg           | Text           | Border           | Usage
---------|--------------|----------------|------------------|--------------------
Default  | transparent  | #0F766E        | #0F766E 1px     | Secondary action
Hover    | #F2F4F7      | #0F766E        | #0F766E 1px     | User hovers
Active   | #F2F4F7      | #0C5F59        | #0C5F59 1px     | Pressed
Focus    | transparent  | #0F766E        | #0F766E 2px     | Keyboard focus
Disabled | transparent  | #98A2B3        | #D0D5DD 1px     | Unavailable
```

#### Ghost (Text-only)
```
State    | Bg          | Text           | Border | Usage
---------|-------------|----------------|--------|--------------------
Default  | transparent | #0F766E        | none   | Tertiary action
Hover    | #F2F4F7     | #0F766E        | none   | User hovers
Active   | #F2F4F7     | #0C5F59        | none   | Pressed
Focus    | transparent | #0F766E        | none   | Keyboard focus (outline via focus-visible)
Disabled | transparent | #98A2B3        | none   | Unavailable
```

#### Destructive (Danger Red)
```
State    | Bg            | Text        | Border       | Usage
---------|---------------|-------------|--------------|--------------------
Default  | #F04438       | #FFFFFF     | none         | Delete, irreversible
Hover    | #D92D20       | #FFFFFF     | none         | User hovers
Active   | #D92D20       | #FFFFFF     | none         | Pressed
Focus    | #F04438       | #FFFFFF     | #F04438 2px  | Keyboard focus
Disabled | #D0D5DD       | #FFFFFF     | none         | Unavailable
```

### Button Sizes

| Size | Height | Padding | Font | Used In |
|------|--------|---------|------|---------|
| **sm** | 36px | 12px H / 8px V | Body S (14px) | Inline, compact |
| **md** | 44px | 16px H / 10px V | Body (16px) | Standard (default) |
| **lg** | 52px | 20px H / 14px V | Body L (18px) | Hero sections, CTAs |

### Button with Icon
- Icon size: 20px (md button), 24px (lg button)
- Icon + text gap: 8px
- **Icon position:** Left (standard), right only for CTA arrows

---

## Input & Form System

### Text Input

```
Height:       48px (standard), 56px (amount input)
Border:       1px border.default
Border focus: 1px border.strong + glow
Padding:      12px horizontal, 12px vertical
Border radius: 12px
Font:         Body (16px), regular
```

#### Input State Colors
| State | Border | Bg | Text | Helper |
|-------|--------|----|----|--------|
| Default | `#E4E7EC` | `#FFFFFF` | primary | secondary |
| Focus | `#0F766E` + 2px | `#FFFFFF` | primary | secondary |
| Error | `#F04438` | `#FEFCF7` | primary | danger |
| Disabled | `#E4E7EC` | `#F2F4F7` | tertiary | tertiary |
| Filled (no focus) | `#E4E7EC` | `#FFFFFF` | primary | secondary |

#### Focus Glow (Optional Enhancement)
- Inner shadow: `inset 0 0 0 1px rgba(15, 118, 110, 0.1)`
- Subtle visual feedback without box-shadow clutter

### Label & Helper Text
- **Label:** Body S (14px) semibold, all-caps optional, margin-bottom 8px
- **Helper text:** Body S (14px), text-secondary, margin-top 4px
- **Error text:** Same styling, text-danger

### Checkbox & Radio
- **Size:** 20px × 20px (clickable area 44px minimum)
- **Border (unchecked):** 2px `border.default`
- **Border (focus):** 2px `border.strong`
- **Checked fill:** `#0F766E`
- **Checked icon:** 16px white checkmark (SVG or icon font)

### Toggle Switch
- **Size:** 44px wide × 24px tall
- **Track:** `#D0D5DD` (off), `#12B76A` (on)
- **Thumb:** 20px circle, white, 2px margin
- **Animation:** 200ms ease cubic-bezier(0.4, 0, 0.2, 1)

### Dropdown / Select
- **Height:** 48px
- **Style:** Same as text input
- **Chevron icon:** Right side, 16px, text-secondary
- **Dropdown options:** Inherit text-primary on white bg
- **Option hover:** bg `#F2F4F7`
- **Option selected:** bg `#EBF5F3` (light teal wash), text primary

---

## Card & Container System

### Card Base
```
Padding:       24px
Border radius: 16px
Background:    #FFFFFF
Border:        1px #E4E7EC (optional, or none)
Shadow:        None (or subtle on hover)
```

### Card Variants

#### KPI Card
- **Height:** ~128px (auto-height acceptable)
- **Layout:** Label (small) + large Value + small Delta indicator + tiny sparkline
- **Interaction:** Hover adds subtle border + small shadow

#### Deal Card (Discover grid)
- **Width:** ~360px
- **Height:** ~280px
- **Sections:** Logo area (top) | Title + thesis | Progress bar | Metrics row | AI note | Actions
- **Hover:** +2px lift, shadow increase, slight border emphasis

#### Project Hero Card
- **Grid span:** 8–12 columns (depending on breakpoint)
- **Layout:** Left (logo, title, thesis, tags, verifications) + right (invest box sticky)
- **Styling:** Subtle teal wash background (e.g., rgba(15, 118, 110, 0.03))

#### AI Brief Card (Hero section)
- **Layout:** Left (greeting, summary, CTAs) + right (3 stats stacked, confidence ring)
- **Background:** Subtle teal-gray wash with faint grid overlay
- **Height:** 240px
- **Purpose:** Must feel like "organized intelligence"

---

## Table System

### Table Header
- **Font:** Body S (14px) semibold, uppercase optional, text-secondary
- **Bg:** `#F2F4F7`
- **Padding:** 12px H / 12px V
- **Border-bottom:** 1px `#E4E7EC`
- **Sticky on scroll:** Yes (with shadow beneath header)

### Table Row
- **Height:** 44px (comfortable touch target)
- **Padding:** 12px H / 12px V
- **Hover:** bg `#F2F4F7`, slight lift
- **Border-bottom:** 1px `#E4E7EC` (very subtle)

### Table Cell
- **Text:** Body (16px), text-primary
- **Numeric:** Body (16px) with tabular figures, text-primary
- **Numeric delta:** Small badge with delta and arrow (up/down)

### Sticky Columns & Expandable Rows
- **Sticky left column (first):** Name/ID
- **Expandable:** Click row → reveal detail panel right side (drawer)

---

## Pagination, Sorting, Filtering

### Pagination
- **Style:** Outline buttons (sm size) with page numbers
- **Current page:** Primary filled button
- **Prev/Next:** Always enabled unless at boundary
- **Layout:** Center-aligned or right-aligned depending on context

### Sorting Indicator
- **Column header clickable**
- **Active sort column:** text-primary bold + arrow icon (up/down)
- **Inactive column:** text-secondary, no icon

### Filter UI
- **Chips (removable):** radius-full, bg `#F2F4F7`, text-primary, X icon on hover
- **Filter popover:** Dropdown with checkboxes for each option
- **Applied badge:** Blue dot or "2 active" near filter icon

---

## Data Visualization

### Sparkline (7-day trend)
- **Size:** ~40px wide × 16px tall
- **Stroke:** 1.5px, `#0F766E` (teal)
- **Fill:** rgba(15, 118, 110, 0.08) (light wash)
- **Placement:** Bottom right of KPI card

### Progress Bar
- **Height:** 4px
- **Background:** `#E4E7EC`
- **Filled:** `#0F766E`
- **Border-radius:** 4px
- **Percentage label:** Right-aligned, Body S (14px), secondary text

### Line Chart (Dashboard)
- **Stroke:** 1.5px, `#0F766E`
- **Fill:** rgba(15, 118, 110, 0.06) (very subtle wash)
- **Grid:** Very faint, rgba(0, 0, 0, 0.02)
- **Tooltip:** White bg, border `#E4E7EC`, shadow-small
- **Font:** Caption (12px) for axis labels and values

### Donut Chart (Sector allocation)
- **Color palette:** Teal, info-blue, warning-orange, lavender (rotate for segments)
- **Stroke width:** 12–16px
- **Center text:** Optional label or total percentage

### Histogram / Bar Chart (Stage exposure)
- **Bar color:** `#0F766E`
- **Bar hover:** `#0C5F59` (darker)
- **Spacing:** Equal gaps between bars (data-dependent)
- **Axes labels:** Caption (12px), text-secondary

---

## Confidence Score Ring

### Visual Treatment
- **Shape:** Thin ring (outer diameter ~160px, ring width 8px)
- **Color (ring):** `#0F766E` (solid or gradient per signal strength)
- **Variants:**
  - **Strong (80–100):** Full teal
  - **Medium (50–79):** Teal + 20% info-blue
  - **Weak (0–49):** Teal + 40% warning-orange
- **Center text:** Large numeric (Numeric KPI XL: 36px semibold)
- **Label below ring:** Caption (12px), text-secondary
- **Sparkline beneath:** Optional 7-day micro chart (see Sparkline above)

### Animation
- **On first load:** Ring "fills" with easing curve, numbers count from 0 to final value
- **Duration:** 800ms
- **Easing:** cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Fires once per page load**

---

## Badge & Status System

### Confidence Badge (Inline)
```
Variants:   strong | medium | low | updated | verified
Style:      Capsule (radius-full), 6px H-padding, 4px V-padding
Font:       Body S (14px) semibold, white text

strong:   bg #0F766E, icon (check or signal bar)
medium:   bg #F79009 (warning), icon (signal bar)
low:      bg #F04438 (danger), icon (exclamation)
updated:  bg #0F766E + pulse animation
verified: bg #12B76A, icon (check circle)
```

### Status Chips
```
pending:   bg #F2F4F7, text text-secondary, icon (clock)
completed: bg #EBF5F3, text #12B76A, icon (check)
error:     bg #FEFCF7, text #F04438, icon (alert)
```

### Lead Investor Badge
- **Style:** Outline, `border #0F766E`, text `#0F766E`
- **Icon:** Left-aligned (badge or crown icon)
- **Font:** Body S (14px)
- **Use:** Shows this investor is leading the round

---

## Modal & Drawer System

### Modal (Centered Overlay)
```
Width:           600px (desktop), 90vw (mobile)
Border-radius:   20px
Background:      #FFFFFF
Shadow:          Large (backdrop blur + shadow-large)
Padding:         32px (content), 24px (header/footer sticky)
Backdrop:        rgba(0, 0, 0, 0.3) + 8px blur
```

### Drawer (Side Slide)
```
Width:           440px (right-aligned)
Height:          100vh
Border-radius:   0 (full slide)
Background:      #FFFFFF
Shadow:          Large (left side)
Backdrop:        rgba(0, 0, 0, 0.2) + 4px blur
Position:        Fixed, z-index 1000
Animation:       Slide 300ms ease cubic-bezier(0.4, 0, 0.2, 1)
```

#### Drawer Anatomy
- **Header:** Sticky, padding 24px, border-bottom 1px `#E4E7EC`
  - Title (H4), optional subtitle
  - Close button (top right)
- **Content:** Scrollable, padding 24px
- **Footer:** Sticky, padding 24px, border-top 1px `#E4E7EC`
  - Usually CTA button

### Drawer Behavior
- **Trigger:** Click row, CTA, or view link
- **Direction:** Always from right
- **Close:** Click X, click outside, or ESC key
- **Animation:** Spring-like ease (ease-in-out-cubic)

---

## Navigation & Layout

### Sidebar
```
Width:             264px
Background:        #F8FAFC
Height:            100vh
Position:          Fixed, left-aligned
Border-right:      1px #E4E7EC
Padding:           16px vertical (top), varies horizontal
```

#### Sidebar Item States
```
Default:  text-secondary, hover bg #EBF5F3, cursor pointer
Active:   bg #FFFFFF, text-primary, left border 3px #0F766E
Hover:    bg #F2F4F7 (if not active)
```

#### Sidebar Bottom Section
- **User profile mini card:** 16px from bottom, 12px padding
- **KYC status chip:** Below profile name
- **"Ask AI" floating pill:** Sticky, bottom-fixed, width 240px

### Topbar
```
Height:        72px
Background:    #FFFFFF
Border-bottom: 1px #E4E7EC
Padding:       16px horizontal, centered content
Position:      Fixed, top, z-index 900 (below modals)
```

#### Topbar Content (L to R)
1. **Breadcrumb** (optional, left 16px)
   - Font: Body S (14px)
   - Separator: `/`
   - Last item: bold (current page)

2. **Search bar** (center, max-width 320px)
   - Placeholder: "Search projects, investors…"
   - Icon: Magnifying glass left, escape right
   - Style: Outline input

3. **Context area** (right, flex gap 12px)
   - Date range selector (if applicable)
   - Wallet balance (if applicable)
   - Notifications bell (with badge count)
   - AI command input (premium-looking, wider on focus)
   - User menu (avatar + dropdown)

---

## Micro-Interactions & Animation

### Hover Philosophy
**Never just cosmetic.** Every hover must signal:
- "This is clickable"
- "This deserves attention"
- "I can explore further"

### Interaction Patterns

| Element | Hover Effect | Duration | Easing |
|---------|--------------|----------|--------|
| **Card** | Lift +2px, shadow-small, border-subtle darken | 200ms | ease-in-out |
| **Row (table/list)** | bg `#F2F4F7`, reveal action affordances | 150ms | ease-in |
| **CTA Arrow** | Slide right +4px | 200ms | ease-out |
| **Chip (removable)** | Reveal X icon (if hidden) | 100ms | ease-in |
| **Icon button** | Bg `#F2F4F7`, text teal (if secondary) | 150ms | ease-in-out |
| **Tabs** | Text bold, underline appears | 100ms | ease-in |

### Loading States

#### Skeleton Shimmer
- **Color:** `#E4E7EC` → `#F2F4F7` → `#E4E7EC`
- **Duration:** 1.5s infinite
- **Delay:** Stagger each skeleton by 100ms

#### Spinner
- **Style:** Rotating circle, stroke 2px, `#0F766E`
- **Duration:** 1s per rotation
- **Size:** 24px (standard)

#### Progress Indicator
- **Linear (form steps):** Animated fill (0% → 100%) over task duration
- **Circular (KPI load):** Ring segment expands

### Page Transitions
```
Incoming content:  fade-in 300ms + slide +4px Y (momentum)
Outgoing content:  fade-out 200ms
Dialog open:       scale(0.95) → scale(1), fade-in 200ms
Dialog close:      scale(1) → scale(0.95), fade-out 150ms
```

### State Feedback
- **Validation inline:** Fade in from top +4px, red text + icon
- **Success burst:** Green checkmark, subtle grow + fade 500ms (no clutter)
- **Signal updated:** Confidence badge pulses once (1s total)
- **Confidence score count-up:** On mount, 0 → final value (800ms)

---

## Responsive Breakpoints

| Breakpoint | Min Width | Layout | Sidebar | Notes |
|----------|-----------|--------|---------|-------|
| **Mobile** | 320px | Single col, full bleed | Hidden, hamburger menu | Stack all vertically |
| **Tablet** | 768px | 2-col grid, controlled margins | Collapsible, 200px | Drawer 80% width |
| **Desktop** | 1024px | Multi-col grid, generous gap | Fixed 264px | Drawer 440px |
| **Large** | 1440px | Full layout + whitespace | Fixed 264px | Max-width container suggested |

### Responsive Rules
- **Padding:** 16px (mobile), 24px (tablet+)
- **Font:** -2px on mobile (16px body → 14px)
- **Grid gap:** 12px (mobile), 16px (tablet), 24px (desktop)
- **Card stack:** Vertical (mobile), 2-col (tablet), 3-col (desktop, varies by page)

---

## Page-by-Page Specifications

### Page 1 — Login

**Layout:** 55% left branding | 45% right auth form

**Left Side:**
- Hero graphic: Abstract composition of rounded rectangles, faint lines, activity dots
- Slogan (Display L): "Confidence meets opportunity"
- Subtitle (Body): "AI-powered investing for institutional quality at any check size"
- 3 highlights (Body S + icon):
  - "Real-time confidence scoring"
  - "Verified investor signals"
  - "Institutional-grade data"

**Right Side:**
- Card: 420px width, radius-24, shadow-medium
- Content:
  - Logo (48px)
  - Title (H2): "Login"
  - Subtitle (Body S): "Access your investor dashboard"
  - Email input (48px height)
  - Password input (48px height) + reveal icon
  - Primary CTA button (md size)
  - Divider: "or"
  - OAuth options (Google, Apple)
  - Wallet connect button (secondary)
  - Legal note (Caption): "By signing in, you agree to our Terms"

**Interactions:**
- Email focus: border-strong, glow subtle
- Password reveal: Icon toggles, no page bounce
- Button states: Hover (darker), active (1px compress), loading (spinner)

---

### Page 2 — Onboarding (5-step stepper)

**Container:** Max-width 980px, centered

**Stepper (Sticky top):**
- Horizontal line with 5 dots
- Current dot: teal filled
- Past dots: teal filled
- Future dots: gray outline
- Label below each step (Body S)
- Progress bar fills as steps complete

**Etape 1 — Investor Identity**
- Segmented control: "Angel" | "Institutional" | "LP"
- Chips grid: Sectors (Healthcare, AI, Climate, etc.) — multi-select
- Slider: Ticket size (logarithmic scale, $1k–$10M+)
- Geography multi-select: Regions

**Etape 2 — Goals**
- 2×2 grid of cards:
  - Wealth Growth
  - Diversification
  - Impact
  - Early Access to Signals
- Card: radius-20, selectable, light border on hover, teal border on select

**Etape 3 — Compliance**
- Left: Upload zone (drag-drop)
- Right: Checklist (Identity verified | Accreditation | Bank info)
- Status chips: pending (gray) | verified (green) | missing (orange)

**Etape 4 — Privacy Settings**
- Each row: Toggle + label + "learn more" link
- Examples:
  - "Allow aggregated contribution to confidence signals"
  - "Allow public lead-investor badge"
  - "Hide activity from other investors by default"

**Etape 5 — Funding Rails**
- 3 cards: Bank Transfer | Wallet | Stablecoin
- Each: Icon, speed, fees, eligibility, trust score

**Micro-interactions:**
- Step transitions: Slide +8px + fade
- Stepper fill: Progress bar animates
- Selections: Card rises 2px on click
- Validations: Inline, fade from top

---

### Page 3 — Dashboard Overview

**Grid:** 12-column layout

**Bloc A — AI Brief Hero** (12 cols, height 240px)
```
Left side (60%):
  - "Good morning, Valentino"
  - "Your confidence across invested projects is +8% this week"
    (H2, 2 lines max)
  - 2 buttons: View all | Analyze signals

Right side (40%):
  - 3 vertical stats:
    • Total invested: $450K
    • Active exposure: 12 projects
    • Avg confidence: 76%
  - Confidence ring (mini, 120px diameter)
```

**Bloc B — KPI Row** (12 cols, 6 cards)
```
Each card:
  - Label (Caption): "Total Invested"
  - Value (Numeric KPI L): "$450,000"
  - Delta badge (sm): +$50K ↑ 12% (green)
  - Sparkline (7-day trend)
```

**Bloc C — Confidence Feed** (8 cols)
```
Title: "What changed this week"
Tabs: Latest | Strongest | Changed today

Rows (infinite scroll, dense):
  - Project logo (24px, radius-14) | Name | Score | ΔScore | Reason (1 line) | → Arrow
  - Hover: bg #F2F4F7, arrow slides +4px right
```

**Bloc D — AI Rationale Panel** (4 cols)
```
3 mini-cards (stacked vertical):
  1. "Why it changed"
  2. "What needs attention"
  3. "Where to act now"

Each:
  - Label (Caption uppercase)
  - Message (Body S, 2 lines)
  - Inline link: "Learn"
```

**Bloc E — Portfolio Trend** (6 cols)
```
Line chart: Portfolio value over 12 months
Legend: Realized gains, Unrealized gains
Hover tooltip: Date + values
```

**Bloc F — Alerts** (6 cols)
```
Stack of alert banners (3 examples):
  1. "KYC verification pending"
  2. "Stripe round closes in 3 days"
  3. "One project signal dropped below 50"

Each: Icon (left) | Text | CTA link (right)
```

---

### Page 4 — Discover

**Header:**
- H1: "Discover opportunities"
- Subtitle: "Research and track live funding rounds"
- Saved view dropdown
- Search bar (wide, full-width tablet+)

**Sticky Filter Rail (left, 20% width):**
- Chips for: Sector | Stage | Geography | Signal strength | Ticket size | Verified only | Lead present
- Click chip to toggle

**Main Area (80%):**
- Toggle: Grid view | Table view (top right)

**Grid View (Default):**
- Cards: ~360px wide (3-col on desktop, 2-col tablet, 1-col mobile)
- Card layout:
  - Top: Logo (32px, radius-14) + badges (Lead investor, Verified)
  - Title (H4) + short thesis (Body S, 2 lines)
  - Progress bar + % invested
  - Metrics row: Stage | Location | Size band | Confidence score badge
  - AI note: "2 qualified investors joined this week" (subtle bg tint)
  - Actions: Track | Invest

**Table View:**
- Columns: Project | Stage | Geo | Raised | Min check | Confidence | Signal | Lead | Actions
- Row hover: bg #F2F4F7, reveal row details icon
- Sticky first column (Project name)
- Inline expand: Click row → Drawer opens (right)

---

### Page 5 — Deal Detail

**Navigation breadcrumb:** Discover / [Project name]

**Section 1 — Hero Project** (8/4 split)
```
Left (8 cols):
  - Logo (96px, radius-14)
  - Title (H1)
  - Thesis (Body, 3 lines)
  - Tags: Stage, Sector, Geography
  - Founder verify badge
  - Founded: 2023 | Location: San Francisco

Right (4 cols, sticky):
  Invest box:
    - Progress bar: $X / $Y raised
    - Min ticket: $25K
    - Time remaining: "6 days"
    - Primary CTA: "Invest now" (lg size)
    - Secondary CTA: "Track" (ghost)
    - Confidence badge: Large (88/100, teal)
```

**Section 2 — Trust Strip** (12 cols)
```
4 cards horizontal:
  1. Confidence Score: 88/100 | "+5 last 7 days"
  2. Investor Signal: 12 qualified | "3 leaders"
  3. Capital Band: $18M committed | "$2M reserved"
  4. Compliance: All verified ✓

Card styling: Light teal bg, border-default
```

**Section 3 — AI Memo** (12 cols)
```
Tabs: Opportunity | Risk | Momentum | Use of funds

Content (for each tab):
  - Paragraphs (Body, 2–3 lines each, spacing 16px)
  - Bullets with key points
  - "Key takeaway" box (subtle bg wash, emphasized text)
```

**Section 4 — Confidence Engine** (6/6 split)
```
Left (6 cols):
  - Confidence ring (160px diameter, centered)
  - Score: 88/100
  - Label: "High confidence"
  - Sparkline: 7-day trend beneath

Right (6 cols):
  Breakdown (stacked):
    - Qualified investors joined: [bar] 87%
    - Sector specialists present: [bar] 92%
    - Freshness high: [bar] 78%
    - Aggregated capital band increased: [bar] 65%
    - Methodology v3.2

  Button: "Explain this signal" → Opens drawer
```

**Section 5 — Deal Evidence** (3-col grid, 12 cols)
```
6 cards:
  1. Traction snapshot
  2. Team credibility
  3. Market context
  4. Fundraising structure
  5. Rail availability
  6. Escrow logic

Card content: Icon + title + metric + "View" link
```

**Section 6 — Docs & Proof** (Horizontal scroll or 2-row stack)
```
Deck | Financials | Founder note | Compliance docs
Each: Thumbnail + title + "Download" link
```

**Section 7 — Timeline** (Vertical, left-aligned)
```
Date line (left edge, very fine)
Nodes (circles, 8px)
Events:
  - "2 verified investors settled" | "Jun 12"
  - "Capital band moved $2M" | "Jun 10"
  - "Signal freshness updated" | "Jun 8"
```

---

### Page 6 — Invest Flow (Modal/Fullscreen)

**Step 1 — Enter Amount**
```
Large input (56px height):
  - Placeholder: "$0"
  - Currency selector (USD default)
  - Quick chips: $500 | $1K | $5K | Max

Validation: Min ticket enforcement, real-time feedback
```

**Step 2 — Choose Rail**
```
3 cards:
  1. Bank Transfer: 2–5 days, $0 fee
  2. Wallet: Instant, variable fee
  3. Stablecoin: Instant, $15 fee

Selected: Teal border + checkmark
```

**Step 3 — Review & Checks**
```
Sections:
  - Project snapshot (title, round size, deadline)
  - Your investment summary (amount, rail, total)
  - Confidence meter
  - Legal: "I acknowledge… [checkbox]"
  - Source of funds (if needed)

Button: "Continue" (enabled only when all checked)
```

**Step 4 — Confirm**
```
Final summary (sticky, bottom):
  - Amount
  - Project
  - Total (including fees)
  - CTA: "Confirm investment" (primary lg)

Checkbox: "I've read the prospectus"
```

**Step 5 — Success**
```
Centered celebration:
  - Checkmark animation (green burst, 500ms total, subtle)
  - "Investment confirmed!"
  - "You've invested $25,000 in Stripe"
  - Next steps timeline:
    1. Confirmation email sent
    2. Docs will be available in 24h
    3. Settlement in 2–5 business days

CTA: "View investment" | "Back to discover"
```

---

## Component Library (Atomic)

### Atomic Hierarchy

**Atoms:**
- Colors (palette)
- Typography (scales)
- Spacing (scale)
- Icons (16–24px, consistent weight)
- Shadows (scale)

**Molecules:**
- Button (all variants/sizes)
- Input field (text, select, checkbox, radio, toggle)
- Badge / Chip
- Card
- Progress bar
- Sparkline

**Organisms:**
- Table (header + body + rows)
- Form (multiple inputs + validation)
- Navigation (sidebar, topbar)
- Modal / Drawer
- Confidence meter (ring + breakdown)

**Templates:**
- Dashboard grid
- Deal detail sections
- Onboarding stepper

**Pages:**
- Login
- Onboarding
- Dashboard
- Discover
- Deal detail
- Invest flow
- Portfolio
- etc.

---

## Implementation Checklist

- [ ] Figma file structured by foundations → components → patterns → app pages
- [ ] CSS variables for all colors, fonts, shadows, spacing
- [ ] React component library with Storybook
- [ ] Responsive utility classes (mobile-first breakpoints)
- [ ] Accessibility audit (WCAG AA compliance)
- [ ] Animation library (Framer Motion or native CSS for core transitions)
- [ ] Form validation and error states
- [ ] API integration scaffolding
- [ ] Dark mode support (future, prepare hooks)
- [ ] Lighthouse performance audit (aim for 90+)

---

## Dev Handoff Notes

### From Figma to Code
1. **Export assets:** All icons as SVG, color tokens as CSS custom properties
2. **Design tokens JSON:** Provide figma.json for design system automation
3. **Component specs:** Each component includes states (default, hover, active, focus, disabled, loading)
4. **Interaction specs:** Use Figma prototypes or video walkthroughs for complex sequences
5. **Copy/Microcopy:** Final text for all labels, buttons, alerts, empty states

### QA Handoff
- Visual regression tests (Percy, Chromatic)
- E2E tests for critical flows (login, invest, discovery)
- Accessibility testing (axe, manual keyboard nav)
- Mobile testing on real devices (iOS Safari, Android Chrome)
- Performance budget: First contentful paint <1.5s, interaction to paint <100ms

### Deployment
- Staging: Vercel or Netlify
- Production: Cloudflare + Next.js on Cloud Run (or Vercel production)
- Error tracking: Sentry
- Analytics: Segment or PostHog
- Feature flags: LaunchDarkly or internal solution

---

## References

- **Color contrast:** WCAG AA (4.5:1 normal, 3:1 large)
- **Animation timing:** Material Design motion standards
- **Accessibility:** WAI-ARIA patterns
- **Responsive design:** Mobile-first methodology
- **Performance:** Core Web Vitals (LCP, FID, CLS)
