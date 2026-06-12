/**
 * FundOS Design System — Typography Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § 2.2 Typography
 *
 * Font families:
 *   Display: Satoshi (Fontshare)
 *   Body/UI: Inter (Google Fonts)
 *
 * Scale: 13 levels using clamp() for fluid sizing
 */

export const fontFamilies = {
  display: "'Satoshi', 'Inter', -apple-system, sans-serif",
  body:    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono:    "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
} as const

export const fontSizes = {
  /** 10px — absolute minimum, legal/micro only */
  '2xs':   'clamp(0.625rem, 0.6rem + 0.1vw, 0.6875rem)',
  /** 12px — tiny labels, badges, timestamps */
  xs:      'clamp(0.75rem,  0.7rem + 0.2vw, 0.8125rem)',
  /** 13px — secondary nav, helper text */
  sm:      'clamp(0.8125rem,0.78rem + 0.25vw, 0.875rem)',
  /** 14px — buttons, nav links, table cells */
  md:      'clamp(0.875rem, 0.84rem + 0.3vw, 0.9375rem)',
  /** 16px — default body, form inputs */
  base:    'clamp(1rem, 0.96rem + 0.25vw, 1.0625rem)',
  /** 18px — subheadings, emphasized body */
  lg:      'clamp(1.125rem, 1.05rem + 0.6vw, 1.25rem)',
  /** 20px — section headings */
  xl:      'clamp(1.25rem,  1.1rem + 1vw, 1.5rem)',
  /** 24px — card headings, modal titles */
  '2xl':   'clamp(1.5rem,   1.3rem + 1.2vw, 1.75rem)',
  /** 28px — page titles in web app context */
  '3xl':   'clamp(1.75rem,  1.5rem + 1.5vw, 2rem)',
  /** 32px — dashboard hero numbers */
  '4xl':   'clamp(2rem,     1.6rem + 2vw, 2.5rem)',
  /** 40px — section display headings */
  '5xl':   'clamp(2.5rem,   1.8rem + 3vw, 3.5rem)',
  /** 48px — hero headings */
  '6xl':   'clamp(3rem,     2rem   + 4vw, 4.5rem)',
  /** 56px+ — marketing/landing only */
  '7xl':   'clamp(3.5rem,   2rem   + 6vw, 6rem)',
} as const

export const fontWeights = {
  regular:   '400',
  medium:    '500',
  semibold:  '600',
  bold:      '700',
  extrabold: '800',
} as const

export const lineHeights = {
  none:    '1',
  tight:   '1.15',
  snug:    '1.375',
  normal:  '1.5',
  relaxed: '1.625',
  loose:   '2',
} as const

export const letterSpacings = {
  tighter: '-0.04em',
  tight:   '-0.02em',
  normal:  '0em',
  wide:    '0.02em',
  wider:   '0.05em',
  widest:  '0.1em',
} as const

/** Font CDN links to include in <head> */
export const fontLinks = [
  // Satoshi (Fontshare)
  'https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap',
  // Inter (Google Fonts)
  'https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=JetBrains+Mono:wght@400;500&display=swap',
] as const

export type FontSize    = keyof typeof fontSizes
export type FontWeight  = keyof typeof fontWeights
export type LineHeight  = keyof typeof lineHeights
