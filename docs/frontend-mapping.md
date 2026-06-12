# FundOS Frontend Mapping: Design System to Code

This document maps the `FRONTEND_DESIGN_SYSTEM.md` specification to the actual code implementation.

## Core Tokens (`@fundos/design-system`)

| Spec Section | Code Location | Tailwind Usage |
|--------------|---------------|----------------|
| Color System | `tokens/colors.ts` | `text-text-primary`, `bg-accent-primary` |
| Typography   | `tokens/typography.ts` | `font-display`, `text-h1`, `text-body-s` |
| Spacing      | `tokens/spacing.ts` | `p-4` (16px), `gap-6` (24px) |
| Radius       | `tokens/radius.ts` | `rounded-default` (16px), `rounded-small` (12px) |
| Shadows      | `tokens/shadows.ts` | `shadow-subtle`, `shadow-medium` |
| Motion       | `tokens/motion.ts` | `duration-normal`, `ease-momentum` |

## UI Components (`@fundos/ui`)

| Spec Component | Code Component | Implementation Details |
|----------------|----------------|------------------------|
| Button         | `Button`       | CVA variants: primary, secondary, ghost, destructive |
| Input          | `Input`        | Standard 48px height, focus-visible states |
| Badge          | `Badge`        | Semantic variants: strong, medium, low, verified |
| Card           | `Card`         | radius-16, subtle hover shadow |
| Modal/Drawer   | `Dialog`       | Radix-based accessibility |

## Page Layouts (`apps/web-investor`)

| Spec Screen | Route | Key Components used |
|-------------|-------|---------------------|
| Dashboard   | `/`   | `KpiCard`, `AiBrief`, `ConfidenceFeed` |
| Discover    | `/discover` | `DealCard`, `FilterRail` |
| Dev Preview | `/dev/components` | Gallery of all UI primitives |
| Dev Tokens  | `/dev/tokens` | Visual reference of color/text scales |

## Implementation Rules

1. **Tokens First:** Never hardcode hex values. Use Tailwind classes mapping to design tokens.
2. **Accessibility:** Use Radix primitives for complex components (Modals, Selects, Tabs).
3. **Typography:** Use semantic classes (`text-h1`, `text-body-s`) rather than manual `text-[Xpx]`.
4. **Consistency:** All components with variants MUST use `cva` (Class Variance Authority).
5. **Layout:** The `AppShell` (`Sidebar` + `Topbar`) is the standard container for all authenticated pages.
