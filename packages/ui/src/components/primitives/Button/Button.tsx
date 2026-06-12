/**
 * FundOS UI — Button
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § 3.1 Button System
 *
 * Variants:   primary | secondary | ghost | danger | link
 * Sizes:      sm | md | lg
 * States:     default | hover | focus | active | loading | disabled
 */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  [
    // Base
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-md',
    'whitespace-nowrap select-none',
    'transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        /** Teal filled — primary CTA */
        primary: [
          'bg-[--color-primary] text-white',
          'hover:bg-[--color-primary-hover]',
          'active:bg-[--color-primary-active]',
          'focus-visible:ring-[--color-primary]',
          'shadow-xs',
        ],
        /** White/bordered — secondary action */
        secondary: [
          'bg-[--color-surface] text-[--color-text]',
          'border border-[--color-border]',
          'hover:bg-[--color-surface-2] hover:border-[--color-border-2]',
          'focus-visible:ring-[--color-primary]',
          'shadow-xs',
        ],
        /** No background — tertiary/low emphasis */
        ghost: [
          'text-[--color-text-secondary]',
          'hover:bg-[--color-surface-2] hover:text-[--color-text]',
          'focus-visible:ring-[--color-primary]',
        ],
        /** Destructive action */
        danger: [
          'bg-[--color-danger] text-white',
          'hover:bg-[--color-danger-fg]',
          'focus-visible:ring-[--color-danger]',
          'shadow-xs',
        ],
        /** Inline text link */
        link: [
          'text-[--color-primary] underline-offset-4',
          'hover:underline',
          'p-0 h-auto',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-md',
        lg: 'h-11 px-5 text-base rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, loading, leftIcon, rightIcon, children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <Spinner size="sm" className="text-current" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)
Button.displayName = 'Button'

// — Inline Spinner (avoids circular dep)
function Spinner({ size, className }: { size?: 'sm' | 'md'; className?: string }) {
  const s = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  return (
    <svg
      className={cn('animate-spin', s, className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export { buttonVariants }
