/**
 * FundOS Design System – Motion / Transition Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § Motion
 *
 * Philosophy: purposeful, fast feedback, no decoration.
 * Duration: micro (100ms) → standard (200ms) → deliberate (300ms) → page (400ms)
 */
export const duration = {
  instant:    '0ms',
  micro:      '100ms',
  standard:   '200ms',
  deliberate: '300ms',
  page:       '400ms',
} as const

export const easing = {
  default:    'cubic-bezier(0.16, 1, 0.3, 1)',  // fast-out, overshoot
  linear:     'linear',
  easeIn:     'cubic-bezier(0.4, 0, 1, 1)',
  easeOut:    'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut:  'cubic-bezier(0.4, 0, 0.2, 1)',
  spring:     'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const

/** Tailwind-compatible transition class names map */
export const transitions = {
  interactive: `all ${duration.standard} ${easing.default}`,
  fade:        `opacity ${duration.standard} ${easing.easeOut}`,
  slide:       `transform ${duration.deliberate} ${easing.default}`,
  number:      `all ${duration.deliberate} ${easing.spring}`,
} as const
