/**
 * FundOS UI — Spinner & Skeleton
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § 3.8 Loading States
 */
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface SpinnerProps extends React.SVGAttributes<SVGElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const sizeMap = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' }

export function Spinner({ size = 'md', className, ...props }: SpinnerProps) {
  return (
    <svg
      className={cn('animate-spin text-[--color-primary]', sizeMap[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle'
  lines?: number
}

export function Skeleton({ variant = 'rect', lines = 1, className, ...props }: SkeletonProps) {
  const base = 'animate-pulse bg-[--color-surface-3] rounded-md'

  if (variant === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(base, 'h-4', i === lines - 1 && lines > 1 && 'w-4/5', className)}
            {...props}
          />
        ))}
      </div>
    )
  }

  if (variant === 'circle') {
    return <div className={cn(base, 'rounded-full w-10 h-10', className)} {...props} />
  }

  return <div className={cn(base, 'h-20', className)} {...props} />
}
