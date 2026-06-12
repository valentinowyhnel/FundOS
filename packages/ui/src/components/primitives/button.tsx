import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-small text-body font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-border-default disabled:text-white',
  {
    variants: {
      variant: {
        primary: 'bg-accent-primary text-white hover:bg-accent-primary-hover active:scale-[0.98]',
        secondary:
          'border border-accent-primary bg-transparent text-accent-primary hover:bg-surface-muted active:scale-[0.98]',
        ghost: 'bg-transparent text-accent-primary hover:bg-surface-muted active:scale-[0.98]',
        destructive: 'bg-accent-danger text-white hover:bg-red-700 active:scale-[0.98]',
      },
      size: {
        sm: 'h-9 px-3 text-body-s rounded-small',
        md: 'h-11 px-4 text-body rounded-small',
        lg: 'h-[52px] px-5 text-body-l rounded-small',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
