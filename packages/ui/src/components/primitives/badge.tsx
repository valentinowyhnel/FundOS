import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-1.5 py-1 text-caption font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2',
  {
    variants: {
      variant: {
        strong: 'bg-accent-primary text-white',
        medium: 'bg-accent-warning text-white',
        low: 'bg-accent-danger text-white',
        updated: 'bg-accent-primary text-white animate-pulse',
        verified: 'bg-accent-success text-white',
        pending: 'bg-surface-muted text-text-secondary',
        completed: 'bg-green-50 text-accent-success',
        error: 'bg-red-50 text-accent-danger',
        outline: 'border border-accent-primary text-accent-primary',
      },
    },
    defaultVariants: {
      variant: 'strong',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
