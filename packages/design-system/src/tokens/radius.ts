/**
 * FundOS Design System — Border Radius Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § 2.4
 */

export const radius = {
  none:   '0px',
  xs:     '4px',
  sm:     '6px',
  md:     '8px',
  lg:     '12px',
  xl:     '16px',
  '2xl':  '20px',
  '3xl':  '24px',
  full:   '9999px',
} as const

/** Semantic radius aliases */
export const componentRadius = {
  button:   radius.md,
  buttonSm: radius.sm,
  input:    radius.md,
  card:     radius.xl,
  cardSm:   radius.lg,
  modal:    radius['2xl'],
  badge:    radius.full,
  chip:     radius.full,
  avatar:   radius.full,
  tooltip:  radius.sm,
  dropdown: radius.lg,
  drawer:   radius.xl,
  table:    radius.lg,
} as const

export type RadiusToken = keyof typeof radius
