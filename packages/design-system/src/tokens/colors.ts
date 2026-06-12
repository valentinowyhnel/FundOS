/**
 * FundOS Design System – Color Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § Color System
 */
export const colors = {
  // Semantic Palette
  surface: {
    app: '#F6F8FB',
    default: '#FFFFFF',
    elevated: '#FCFDFE',
    muted: '#F2F4F7',
  },
  border: {
    default: '#E4E7EC',
    strong: '#D0D5DD',
  },
  text: {
    primary: '#0F1728',
    secondary: '#667085',
    tertiary: '#98A2B3',
  },
  accent: {
    primary: '#0F766E',
    'primary-hover': '#0C5F59',
    info: '#2E90FA',
    success: '#12B76A',
    warning: '#F79009',
    danger: '#F04438',
    lavender: '#7A5AF8',
  },
} as const;

export type ColorToken = typeof colors;
