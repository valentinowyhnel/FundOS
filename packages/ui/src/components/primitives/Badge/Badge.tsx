/**
 * FundOS UI — Badge
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § 3.3
 *
 * Used for: status labels, tags, verification badges
 * FundOS extension: ConfidenceBadge for signal strength
 */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-medium rounded-full px-2.5 py-0.5 text-xs whitespace-nowrap',
  {
    variants: {
      variant: {
        default:   'bg-[--color-surface-2] text-[--color-text-secondary] border border-[--color-border]',
        primary:   'bg-[--color-primary-subtle] text-[--color-primary] border border-[--color-primary-border]',
        success:   'bg-[--color-success-subtle] text-[--color-success-fg]',
        warning:   'bg-[--color-warning-subtle] text-[--color-warning-fg]',
        danger:    'bg-[--color-danger-subtle]  text-[--color-danger-fg]',
        info:      'bg-[--color-info-subtle]    text-[--color-info-fg]',
        // FundOS-specific
        verified:  'bg-[--color-primary-subtle] text-[--color-primary] border border-[--color-primary-border]',
        lead:      'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-400',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'success' && 'bg-[--color-success]',
            variant === 'warning' && 'bg-[--color-warning]',
            variant === 'danger'  && 'bg-[--color-danger]',
            variant === 'primary' && 'bg-[--color-primary]',
            (!variant || variant === 'default') && 'bg-[--color-text-disabled]',
          )}
        />
      )}
      {children}
    </span>
  )
}

/**
 * ConfidenceBadge — FundOS-specific
 * Displays investor signal strength with semantic color + label.
 */
export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'none'

const confidenceConfig: Record<ConfidenceLevel, { label: string; variant: BadgeProps['variant'] }> = {
  high:   { label: 'Strong signal',  variant: 'success' },
  medium: { label: 'Medium signal',  variant: 'warning' },
  low:    { label: 'Weak signal',    variant: 'danger'  },
  none:   { label: 'No signal',      variant: 'default' },
}

export interface ConfidenceBadgeProps extends Omit<BadgeProps, 'variant'> {
  level: ConfidenceLevel
  score?: number
  showScore?: boolean
}

export function ConfidenceBadge({ level, score, showScore = false, className, ...props }: ConfidenceBadgeProps) {
  const { label, variant } = confidenceConfig[level]
  return (
    <Badge variant={variant} dot className={className} {...props}>
      {showScore && score !== undefined ? `${score}/100` : label}
    </Badge>
  )
}
