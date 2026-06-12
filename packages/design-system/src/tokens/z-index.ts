/**
 * FundOS Design System — Z-Index Scale
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § 2.7
 *
 * Named layers prevent z-index conflicts across the app.
 */

export const zIndex = {
  /** Behind content — decorative backgrounds */
  behind:     -1,
  /** Default document flow */
  base:        0,
  /** Slightly raised — sticky table headers */
  raised:     10,
  /** Dropdowns, autocomplete, tooltips */
  dropdown:   100,
  /** Sticky top bar */
  topbar:     200,
  /** Sticky sidebar */
  sidebar:    200,
  /** Floating action buttons */
  fab:        250,
  /** Overlays behind modals — backdrop */
  overlay:    300,
  /** Modals, drawers, sheets */
  modal:      400,
  /** Toasts, notifications */
  toast:      500,
  /** Command palette, global search */
  command:    600,
  /** Onboarding tooltips, product tours */
  tour:       700,
  /** Maximum — loading screens */
  max:        9999,
} as const

export type ZIndexToken = keyof typeof zIndex
