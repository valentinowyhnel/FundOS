/**
 * FundOS Design System — Breakpoint Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § 6 Responsive
 *
 * 4 breakpoints: 320 / 768 / 1024 / 1440
 */

export const breakpoints = {
  /** 320px — small mobile */
  xs:  '320px',
  /** 640px — large mobile / landscape */
  sm:  '640px',
  /** 768px — tablet portrait */
  md:  '768px',
  /** 1024px — tablet landscape / small desktop */
  lg:  '1024px',
  /** 1280px — standard desktop */
  xl:  '1280px',
  /** 1440px — wide desktop */
  '2xl': '1440px',
} as const

/** Min-width media query helpers (CSS-in-JS / styled use) */
export const mediaMin = {
  xs:    `@media (min-width: 320px)`,
  sm:    `@media (min-width: 640px)`,
  md:    `@media (min-width: 768px)`,
  lg:    `@media (min-width: 1024px)`,
  xl:    `@media (min-width: 1280px)`,
  '2xl': `@media (min-width: 1440px)`,
} as const

export type BreakpointToken = keyof typeof breakpoints
