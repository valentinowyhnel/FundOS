# Frontend Implementation Checklist

Use this checklist when building new features to ensure alignment with the FundOS Design System.

## 1. Foundations & Tokens
- [ ] Uses design system colors (no hardcoded hex)
- [ ] Typography follows the hierarchy (`h1` for page titles, `body-s` for labels)
- [ ] Spacing uses the 4px/8px rhythm (use multiples of 4)
- [ ] Border radius matches component type (16px for cards, 12px for small components)
- [ ] Shadows are applied according to depth rules (none at rest, small on hover)

## 2. Component Usage
- [ ] Buttons use `cva` variants (`primary`, `secondary`, `ghost`)
- [ ] Inputs include proper label and helper text (if applicable)
- [ ] Loading states use skeletons or the `isLoading` button state
- [ ] Icons are sourced from `lucide-react` with standard sizes (20px/24px)
- [ ] Badges correctly map to signal semantic meanings

## 3. Interaction & Animation
- [ ] Hovers provide visual feedback (lift, shadow, or color change)
- [ ] Transitions use `framer-motion` for complex entry/exit
- [ ] Simple states use Tailwind `transition-all`
- [ ] Interaction timing follows motion tokens (200ms default)

## 4. Responsive & Layout
- [ ] Component is mobile-friendly (stacks vertically if needed)
- [ ] Layout matches the 12-column grid or standard Flex/Grid patterns
- [ ] Page content is wrapped in the `AppShell`

## 5. Accessibility (WCAG AA)
- [ ] Color contrast meets 4.5:1 ratio
- [ ] Interactive elements have `:focus-visible` styles
- [ ] Semantic HTML is used (`h1-h4`, `button`, `label`)
- [ ] Radix UI primitives are used for complex UI (modals, tabs)

## 6. Verification
- [ ] Tested on Desktop (1440px)
- [ ] Tested on Tablet (768px)
- [ ] Tested on Mobile (320px)
- [ ] Added to `/dev/components` if it's a new shared component
