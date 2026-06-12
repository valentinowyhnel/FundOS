/**
 * FundOS Design System — Shadow Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § 2.5
 *
 * Layered shadows for realistic depth.
 * Warm-neutral tint to match the surface palette.
 */

export const shadows = {
  none: 'none',
  /** Subtle — inputs, table rows, tight card borders */
  xs: '0 1px 2px rgba(16, 24, 40, 0.05)',
  /** Light — default card elevation */
  sm: '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
  /** Medium — dropdown, tooltip, hover card */
  md: '0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -2px rgba(16, 24, 40, 0.06)',
  /** Large — modal, drawer, command palette */
  lg: '0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)',
  /** X-Large — elevated panels, floating sidebars */
  xl: '0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)',
  /** 2X-Large — fullscreen overlays, sheets */
  '2xl': '0 24px 48px -12px rgba(16, 24, 40, 0.18)',
  /** 3X-Large — maximum elevation */
  '3xl': '0 32px 64px -12px rgba(16, 24, 40, 0.14)',
} as const

/** Focus ring — primary color */
export const focusRings = {
  primary: '0 0 0 4px rgba(15, 118, 110, 0.24)',
  danger:  '0 0 0 4px rgba(240, 68, 56, 0.24)',
  neutral: '0 0 0 4px rgba(152, 162, 179, 0.24)',
} as const

export type ShadowToken = keyof typeof shadows
