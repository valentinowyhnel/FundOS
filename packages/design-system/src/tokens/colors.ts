/**
 * FundOS Design System — Color Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § 2.1 Color System
 *
 * 11 semantic token families:
 * primary, neutral, success, warning, danger, info,
 * surface, border, text, overlay, brand
 */

export const colors = {
  // ─── Primary (Teal) ───────────────────────────────────────────────
  primary: {
    50:  '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0F766E', // default brand accent
    700: '#0B5E58', // hover
    800: '#0A4744', // active/pressed
    900: '#083D3B', // darkest
  },

  // ─── Neutral (Gray-blue) ─────────────────────────────────────────
  neutral: {
    0:   '#FFFFFF',
    25:  '#FAFAFA',
    50:  '#F7F9FC',
    100: '#EEF2F7',
    200: '#E4E7EC',
    300: '#D0D5DD',
    400: '#98A2B3',
    500: '#667085',
    600: '#475467',
    700: '#344054',
    800: '#1D2939',
    900: '#101828',
  },

  // ─── Success ──────────────────────────────────────────────────────
  success: {
    50:  '#ECFDF3',
    100: '#D1FADF',
    200: '#A6F4C5',
    500: '#12B76A',
    600: '#039855',
    700: '#027A48',
    900: '#054F31',
  },

  // ─── Warning ──────────────────────────────────────────────────────
  warning: {
    50:  '#FFFAEB',
    100: '#FEF0C7',
    200: '#FEDF89',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    900: '#7A2E0E',
  },

  // ─── Danger / Error ───────────────────────────────────────────────
  danger: {
    50:  '#FEF3F2',
    100: '#FEE4E2',
    200: '#FECDCA',
    500: '#F04438',
    600: '#D92D20',
    700: '#B42318',
    900: '#7A271A',
  },

  // ─── Info (Blue) ──────────────────────────────────────────────────
  info: {
    50:  '#EFF8FF',
    100: '#D1E9FF',
    200: '#B2DDFF',
    500: '#2E90FA',
    600: '#1570EF',
    700: '#175CD3',
    900: '#194185',
  },

  // ─── Confidence signal colors (FundOS-specific) ───────────────────
  confidence: {
    high:   '#12B76A', // strong signal
    medium: '#F79009', // moderate signal
    low:    '#F04438', // weak signal
    none:   '#98A2B3', // no signal / unknown
  },
} as const

export type ColorToken = typeof colors
