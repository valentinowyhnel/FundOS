import type { Config } from 'tailwindcss';
import { colors } from './tokens/colors';
import { typography } from './tokens/typography';
import { spacing } from './tokens/spacing';
import { radius } from './tokens/radius';
import { shadows } from './tokens/shadows';
import { motion } from './tokens/motion';

export const fundosTheme = {
  extend: {
    colors: {
      surface: colors.surface,
      border: colors.border,
      text: colors.text,
      accent: colors.accent,
    },
    fontFamily: {
      display: [typography.fonts.display],
      body: [typography.fonts.body],
    },
    fontSize: {
      'display-xl': typography.sizes['display-xl'],
      'display-l': typography.sizes['display-l'],
      h1: typography.sizes.h1,
      h2: typography.sizes.h2,
      h3: typography.sizes.h3,
      h4: typography.sizes.h4,
      'body-l': typography.sizes['body-l'],
      body: typography.sizes.body,
      'body-s': typography.sizes['body-s'],
      caption: typography.sizes.caption,
      'numeric-kpi-xl': typography.sizes['numeric-kpi-xl'],
      'numeric-kpi-l': typography.sizes['numeric-kpi-l'],
    },
    spacing: spacing,
    borderRadius: {
      tight: radius.tight,
      small: radius.small,
      default: radius.default,
      large: radius.large,
      full: radius.full,
    },
    boxShadow: {
      subtle: shadows.subtle,
      small: shadows.small,
      medium: shadows.medium,
      large: shadows.large,
    },
    transitionDuration: {
      fast: motion.durations.fast,
      normal: motion.durations.normal,
      slow: motion.durations.slow,
    },
    transitionTimingFunction: {
      momentum: motion.easings.momentum,
    },
  },
} satisfies Config['theme'];
