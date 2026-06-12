/**
 * FundOS Design System – Border Radius Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § Design Tokens
 */
export const radius = {
  none: '0',
  sm:   '0.25rem',   // 4px  — chips, badges tight
  md:   '0.5rem',    // 8px  — inputs, small cards
  lg:   '0.75rem',   // 12px — standard cards
  xl:   '1rem',      // 16px — modals, panels
  '2xl':'1.25rem',   // 20px — drawers, feature cards
  full: '9999px',    // pills, avatars
} as const
