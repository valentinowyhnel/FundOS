/**
 * FundOS Tailwind Preset
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md
 *
 * Usage in apps/web/tailwind.config.ts:
 *   import fundosPreset from '@fundos/design-system/tailwind/preset'
 *   export default { presets: [fundosPreset], content: [...] }
 */
import type { Config } from 'tailwindcss'
import { colors } from '../tokens/colors'
import { fontFamilies, fontSizes, fontWeights } from '../tokens/typography'
import { spacing } from '../tokens/spacing'
import { radius } from '../tokens/radius'
import { shadows } from '../tokens/shadows'

const preset: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        primary:    { DEFAULT: colors.primary, hover: colors.primaryHover, active: colors.primaryActive, highlight: colors.primaryHighlight },
        surface:    { DEFAULT: colors.surface, '2': colors.surface2, offset: colors.surfaceOffset },
        border:     colors.border,
        divider:    colors.divider,
        ink:        colors.ink,
        muted:      colors.textMuted,
        faint:      colors.textFaint,
        success:    { DEFAULT: colors.success,  bg: colors.successBg  },
        warning:    { DEFAULT: colors.warning,  bg: colors.warningBg  },
        danger:     { DEFAULT: colors.danger,   bg: colors.dangerBg   },
        info:       { DEFAULT: colors.info,     bg: colors.infoBg     },
        confidence: {
          high:  colors.confidenceHigh,
          med:   colors.confidenceMed,
          low:   colors.confidenceLow,
        },
      },
      fontFamily: {
        display: fontFamilies.display.split(',').map(f => f.trim().replace(/'/g, '')),
        body:    fontFamilies.body.split(',').map(f => f.trim().replace(/'/g, '')),
        mono:    fontFamilies.mono.split(',').map(f => f.trim().replace(/'/g, '')),
      },
      fontSize: {
        xs:  [fontSizes.xs,   { lineHeight: '1.5' }],
        sm:  [fontSizes.sm,   { lineHeight: '1.5' }],
        base:[fontSizes.base, { lineHeight: '1.6' }],
        lg:  [fontSizes.lg,   { lineHeight: '1.5' }],
        xl:  [fontSizes['xl'],{ lineHeight: '1.4' }],
        '2xl':[fontSizes['2xl'],{ lineHeight: '1.3' }],
        '3xl':[fontSizes['3xl'],{ lineHeight: '1.25'}],
        '4xl':[fontSizes['4xl'],{ lineHeight: '1.2' }],
      },
      fontWeight: fontWeights,
      spacing,
      borderRadius: radius,
      boxShadow: shadows,
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring':  'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      transitionDuration: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },
    },
  },
}

export default preset
