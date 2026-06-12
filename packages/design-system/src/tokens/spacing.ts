/**
 * FundOS Design System — Spacing Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § 2.3 Spacing
 *
 * Base unit: 4px
 * 20 scale steps covering 4px → 320px
 */

export const spacing = {
  px:   '1px',
  0:    '0px',
  0.5:  '0.125rem',  //  2px
  1:    '0.25rem',   //  4px
  1.5:  '0.375rem',  //  6px
  2:    '0.5rem',    //  8px
  2.5:  '0.625rem',  // 10px
  3:    '0.75rem',   // 12px
  3.5:  '0.875rem',  // 14px
  4:    '1rem',      // 16px
  5:    '1.25rem',   // 20px
  6:    '1.5rem',    // 24px
  7:    '1.75rem',   // 28px
  8:    '2rem',      // 32px
  9:    '2.25rem',   // 36px
  10:   '2.5rem',    // 40px
  11:   '2.75rem',   // 44px  ← min touch target
  12:   '3rem',      // 48px
  14:   '3.5rem',    // 56px
  16:   '4rem',      // 64px
  18:   '4.5rem',    // 72px
  20:   '5rem',      // 80px
  24:   '6rem',      // 96px
  28:   '7rem',      // 112px
  32:   '8rem',      // 128px
  36:   '9rem',      // 144px
  40:   '10rem',     // 160px
  48:   '12rem',     // 192px
  56:   '14rem',     // 224px
  64:   '16rem',     // 256px
  80:   '20rem',     // 320px
} as const

/** Component-specific semantic spacing aliases */
export const componentSpacing = {
  /** Padding inside buttons */
  btnPadX:  spacing[4],
  btnPadY:  spacing[2],
  btnPadXSm: spacing[3],
  btnPadYSm: spacing[1.5],
  btnPadXLg: spacing[6],
  btnPadYLg: spacing[3],

  /** Card padding */
  cardPad:   spacing[6],
  cardPadSm: spacing[4],
  cardPadLg: spacing[8],

  /** Section vertical padding */
  sectionPadY: 'clamp(2.5rem, 6vw, 6rem)',

  /** Sidebar width */
  sidebarWidth:       '240px',
  sidebarWidthCollapsed: '64px',

  /** Top bar height */
  topbarHeight: '60px',

  /** Content max widths */
  contentNarrow:  '640px',
  contentDefault: '960px',
  contentWide:    '1200px',
  contentFull:    '100%',
} as const

export type SpacingToken = keyof typeof spacing
