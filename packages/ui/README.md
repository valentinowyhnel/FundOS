# FundOS UI Component Library

Shared React components for the FundOS frontend, built with Radix UI, Tailwind CSS, and Framer Motion.

## Implementation Principles
- **Primitives:** Atomic components (Button, Input, Badge) using Tailwind + CVA.
- **Accessibility:** Radix UI for complex stateful components.
- **Motion:** Framer Motion for transitions and micro-interactions.
- **Tokens:** Consumes `@fundos/design-system` for all styling.

## Usage

```tsx
import { Button, Badge } from '@fundos/ui';

export function MyComponent() {
  return (
    <Button variant="primary">
      Click Me
      <Badge variant="updated">New</Badge>
    </Button>
  );
}
```

## Component List
- `Button`: Multiple variants and sizes with loading states.
- `Input`: Standardized form input.
- `Badge`: Semantic status indicators.
- `Card`: Primary content container with hover effects.
- `Modal/Drawer`: Accessible overlays (coming soon).
