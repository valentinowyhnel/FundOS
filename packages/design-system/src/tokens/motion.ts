/**
 * FundOS Design System – Motion Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § Micro-Interactions & Animation
 */
export const motion = {
  durations: {
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    loading: '1500ms',
    count: '800ms',
  },
  easings: {
    base: 'cubic-bezier(0.4, 0, 0.2, 1)',
    'in-out': 'ease-in-out',
    in: 'ease-in',
    out: 'ease-out',
    momentum: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    spring: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
