/**
 * FundOS Design System — Motion & Animation Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § 2.6 Motion
 *
 * Philosophy: affordance-driven, not cosmetic.
 * Every transition communicates state — not decoration.
 */

export const durations = {
  /** Instant feedback — checkbox, toggle, chip select */
  instant:  '80ms',
  /** Fast — button hover, input focus ring, icon swap */
  fast:     '150ms',
  /** Base — most UI transitions (card hover, dropdown open) */
  base:     '200ms',
  /** Medium — modal/drawer enter, page section reveal */
  medium:   '300ms',
  /** Slow — complex layout shifts, confidence score animation */
  slow:     '400ms',
  /** Deliberate — onboarding, celebration, full page */
  deliberate: '600ms',
} as const

export const easings = {
  /** Standard UI — most interactions */
  standard:     'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Decelerate — items entering screen */
  decelerate:   'cubic-bezier(0.0, 0.0, 0.2, 1)',
  /** Accelerate — items leaving screen */
  accelerate:   'cubic-bezier(0.4, 0.0, 1, 1)',
  /** Spring — bouncy, celebratory moments */
  spring:       'cubic-bezier(0.34, 1.56, 0.64, 1)',
  /** Linear — continuous animations like spinners */
  linear:       'linear',
} as const

/**
 * Standard transition presets.
 * Usage: style={{ transition: transitions.interactive }}
 */
export const transitions = {
  /** Default for all interactive elements */
  interactive:  `all ${durations.base} ${easings.standard}`,
  /** Hover effects only (color, shadow) */
  hover:        `background-color ${durations.fast} ${easings.standard}, box-shadow ${durations.fast} ${easings.standard}, border-color ${durations.fast} ${easings.standard}`,
  /** Color-only — text, icon color */
  color:        `color ${durations.fast} ${easings.standard}`,
  /** Transform — scale, translate */
  transform:    `transform ${durations.base} ${easings.standard}`,
  /** Opacity — fade in/out */
  opacity:      `opacity ${durations.medium} ${easings.standard}`,
  /** Page/section reveal */
  reveal:       `opacity ${durations.medium} ${easings.decelerate}, transform ${durations.medium} ${easings.decelerate}`,
} as const

export type DurationToken  = keyof typeof durations
export type EasingToken    = keyof typeof easings
export type TransitionToken = keyof typeof transitions
