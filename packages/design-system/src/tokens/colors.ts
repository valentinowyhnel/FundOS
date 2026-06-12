/**
 * FundOS Design System – Color Tokens
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § Design Tokens
 *
 * Usage:
 *   import { colors } from '@fundos/design-system/tokens/colors'
 *   // or via CSS variables: var(--color-primary)
 */
export const colors = {
  // Brand
  primary:        '#0F766E',
  primaryHover:   '#0B5E58',
  primaryActive:  '#09504B',
  primaryHighlight: '#CCEBE9',

  // Surfaces
  bg:             '#F7F9FC',
  surface:        '#FFFFFF',
  surface2:       '#F2F4F8',
  surfaceOffset:  '#EBEEf3',
  border:         '#E4E7EC',
  divider:        '#D0D5DD',

  // Text
  ink:            '#101828',
  textMuted:      '#667085',
  textFaint:      '#98A2B3',
  textInverse:    '#FFFFFF',

  // Semantic
  success:        '#12B76A',
  successBg:      '#ECFDF3',
  warning:        '#F79009',
  warningBg:      '#FFFAEB',
  danger:         '#F04438',
  dangerBg:       '#FEF3F2',
  info:           '#2E90FA',
  infoBg:         '#EFF8FF',

  // Confidence signal spectrum
  confidenceHigh:   '#12B76A',  // ≥ 80
  confidenceMed:    '#F79009',  // 50–79
  confidenceLow:    '#F04438',  // < 50

  // Neutrals (for data viz / misc)
  gray50:  '#F9FAFB',
  gray100: '#F2F4F7',
  gray200: '#EAECF0',
  gray300: '#D0D5DD',
  gray400: '#98A2B3',
  gray500: '#667085',
  gray600: '#475467',
  gray700: '#344054',
  gray800: '#1D2939',
  gray900: '#101828',
} as const

export type ColorToken = keyof typeof colors
