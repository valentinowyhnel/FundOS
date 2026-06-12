/**
 * FundOS UI — ConfidenceCard
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § Investor Confidence Module
 *
 * The most important FundOS-specific component.
 * Renders investor signal score, strength label, tags, and optional explanation CTA.
 *
 * Used in: Deal detail hero, Dashboard signal feed, Discover deal cards
 */
import * as React from 'react'
import { cn } from '../../lib/utils'
import { ConfidenceBadge, type ConfidenceLevel } from '../primitives/Badge/Badge'

export interface ConfidenceTag {
  label: string
  icon?: React.ReactNode
}

export interface ConfidenceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number           // 0–100
  level: ConfidenceLevel
  tags?: ConfidenceTag[]
  updatedAt?: string
  onExplain?: () => void
  loading?: boolean
  /** Compact mode for use inside deal cards */
  compact?: boolean
}

export function ConfidenceCard({
  score,
  level,
  tags = [],
  updatedAt,
  onExplain,
  loading,
  compact,
  className,
  ...props
}: ConfidenceCardProps) {
  const scoreColor = {
    high:   'text-[--color-confidence-high]',
    medium: 'text-[--color-confidence-medium]',
    low:    'text-[--color-confidence-low]',
    none:   'text-[--color-text-disabled]',
  }[level]

  if (loading) {
    return (
      <div className={cn('rounded-xl border border-[--color-border] bg-[--color-surface] p-5 shadow-xs', className)}>
        <div className="space-y-3 animate-pulse">
          <div className="h-4 w-32 rounded-md bg-[--color-surface-3]" />
          <div className="h-10 w-16 rounded-md bg-[--color-surface-3]" />
          <div className="h-4 w-40 rounded-md bg-[--color-surface-3]" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-[--color-border] bg-[--color-surface] shadow-xs',
        compact ? 'p-4' : 'p-5',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-[--color-text-tertiary] uppercase tracking-wider">
          Confidence Signal
        </span>
        <ConfidenceBadge level={level} />
      </div>

      {/* Score */}
      <div className="flex items-baseline gap-1 mb-3">
        <span
          className={cn('font-bold leading-none tabular-nums', scoreColor, compact ? 'text-3xl' : 'text-5xl')}
        >
          {score}
        </span>
        <span className="text-sm text-[--color-text-tertiary]">/100</span>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[--color-surface-2] text-[--color-text-secondary] border border-[--color-border]"
            >
              {tag.icon}
              {tag.label}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1">
        {updatedAt && (
          <span className="text-xs text-[--color-text-disabled]">{updatedAt}</span>
        )}
        {onExplain && (
          <button
            onClick={onExplain}
            className="text-xs font-medium text-[--color-primary] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-primary] rounded"
          >
            Explain this signal →
          </button>
        )}
      </div>
    </div>
  )
}
