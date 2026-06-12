/**
 * FundOS Design System – Typography Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § Typography
 */
export const fontFamilies = {
  display: "'Satoshi', 'General Sans', 'Inter', system-ui, sans-serif",
  body:    "'Inter', system-ui, sans-serif",
  mono:    "'JetBrains Mono', 'Fira Code', monospace",
} as const

export const fontSizes = {
  xs:   '0.75rem',   // 12px — labels, badges
  sm:   '0.875rem',  // 14px — buttons, nav, captions
  base: '1rem',      // 16px — body default
  lg:   '1.125rem',  // 18px — section subheads
  xl:   '1.25rem',   // 20px — card titles
  '2xl': '1.5rem',   // 24px — page section headings
  '3xl': '1.875rem', // 30px — page title
  '4xl': '2.25rem',  // 36px — hero / dashboard greeting
} as const

export const fontWeights = {
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
} as const

export const lineHeights = {
  tight:  '1.25',
  snug:   '1.375',
  normal: '1.5',
  relaxed:'1.625',
} as const

export const letterSpacings = {
  tight:   '-0.02em',
  normal:  '0',
  wide:    '0.025em',
  widest:  '0.08em',  // uppercase labels / badges
} as const
