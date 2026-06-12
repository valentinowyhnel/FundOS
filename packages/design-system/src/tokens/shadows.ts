/**
 * FundOS Design System – Shadow Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § Shadows & Depth
 *
 * All shadows use #0F1728 (text-primary) with specified opacities.
 */
const shadowColor = '#0F1728';

export const shadows = {
  none: 'none',
  subtle: `0px 1px 4px 0px rgba(15, 23, 40, 0.04)`,
  small: `0px 2px 8px 0px rgba(15, 23, 40, 0.06)`,
  medium: `0px 4px 12px 0px rgba(15, 23, 40, 0.08)`,
  large: `0px 8px 16px 0px rgba(15, 23, 40, 0.12)`,
} as const;
