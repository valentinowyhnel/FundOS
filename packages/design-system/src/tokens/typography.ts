/**
 * FundOS Design System – Typography Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § Typography
 */
export const typography = {
  fonts: {
    display: 'var(--font-display), -apple-system, BlinkMacSystemFont, sans-serif',
    body: 'var(--font-body), Inter, sans-serif',
  },
  sizes: {
    'display-xl': ['48px', { lineHeight: '56px', fontWeight: '600' }] as [string, any],
    'display-l': ['40px', { lineHeight: '48px', fontWeight: '600' }] as [string, any],
    h1: ['32px', { lineHeight: '40px', fontWeight: '600' }] as [string, any],
    h2: ['28px', { lineHeight: '36px', fontWeight: '600' }] as [string, any],
    h3: ['24px', { lineHeight: '32px', fontWeight: '500' }] as [string, any],
    h4: ['20px', { lineHeight: '28px', fontWeight: '500' }] as [string, any],
    'body-l': ['18px', { lineHeight: '28px', fontWeight: '400' }] as [string, any],
    body: ['16px', { lineHeight: '24px', fontWeight: '400' }] as [string, any],
    'body-s': ['14px', { lineHeight: '22px', fontWeight: '400' }] as [string, any],
    caption: ['12px', { lineHeight: '18px', fontWeight: '500' }] as [string, any],
    'numeric-kpi-xl': ['36px', { lineHeight: '40px', fontWeight: '600' }] as [string, any],
    'numeric-kpi-l': ['28px', { lineHeight: '32px', fontWeight: '600' }] as [string, any],
  },
};
