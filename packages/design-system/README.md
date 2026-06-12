# FundOS Design System Tokens

Source of truth for colors, typography, spacing, and other design foundations.

## Usage

### Tailwind CSS
This package exports a Tailwind preset. Include it in your `tailwind.config.ts`:

```ts
import { fundosTheme } from '@fundos/design-system';

export default {
  // ...
  theme: fundosTheme,
};
```

### Direct Token Access
You can also import tokens directly in your TypeScript code:

```ts
import { colors, typography } from '@fundos/design-system';

const primaryColor = colors.accent.primary;
```

## Structure
- `tokens/`: Implementation of foundations from `FRONTEND_DESIGN_SYSTEM.md`.
- `tailwind-preset.ts`: Tailwind configuration mapping tokens to CSS classes.
