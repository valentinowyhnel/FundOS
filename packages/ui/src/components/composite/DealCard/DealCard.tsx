/**
 * FundOS UI — DealCard
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § Discover page — Deal card
 *
 * Horizontal card variant for Discover list view.
 * Used in: Discover page, Dashboard signal feed
 */
import * as React from 'react'
import { cn } from '../../lib/utils'
import { Badge } from '../primitives/Badge/Badge'
import { ConfidenceBadge, type ConfidenceLevel } from '../primitives/Badge/Badge'
import { Button } from '../primitives/Button/Button'

export interface DealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Project metadata */
  name: string
  tagline: string
  sector: string
  country: string
  stage: string

  /** Confidence */
  confidenceScore: number
  confidenceLevel: ConfidenceLevel

  /** Funding */
  fundingProgress: number  // 0–100
  amountBand?: string      // e.g. '50k–200k'
  currency?: string

  /** Badges */
  hasLead?: boolean
  isVerified?: boolean
  rail?: 'fiat' | 'stablecoin' | 'tokenized'

  /** AI summary (2 lines max) */
  aiSummary?: string

  onView?: () => void
  onTrack?: () => void
  loading?: boolean
}

export function DealCard({
  name,
  tagline,
  sector,
  country,
  stage,
  confidenceScore,
  confidenceLevel,
  fundingProgress,
  amountBand,
  currency,
  hasLead,
  isVerified,
  rail,
  aiSummary,
  onView,
  onTrack,
  loading,
  className,
  ...props
}: DealCardProps) {
  if (loading) {
    return (
      <div className={cn('rounded-xl border border-[--color-border] bg-[--color-surface] p-5 shadow-xs', className)}>
        <div className="animate-pulse space-y-3">
          <div className="h-5 w-48 rounded-md bg-[--color-surface-3]" />
          <div className="h-3 w-full rounded-md bg-[--color-surface-3]" />
          <div className="h-3 w-3/4 rounded-md bg-[--color-surface-3]" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'group flex flex-col sm:flex-row items-start gap-4',
        'rounded-xl border border-[--color-border] bg-[--color-surface] p-5',
        'shadow-xs hover:shadow-md hover:border-[--color-border-2]',
        'transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
        confidenceLevel === 'high'   && 'hover:border-[--color-confidence-high]/30',
        confidenceLevel === 'medium' && 'hover:border-[--color-confidence-medium]/30',
        className
      )}
      {...props}
    >
      {/* Left: project info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-semibold text-[--color-text] text-base truncate">{name}</span>
          {isVerified && <Badge variant="verified">Verified</Badge>}
          {hasLead && <Badge variant="lead">Lead investor</Badge>}
        </div>
        <p className="text-sm text-[--color-text-secondary] line-clamp-1 mb-2">{tagline}</p>
        <div className="flex flex-wrap gap-2 text-xs text-[--color-text-tertiary]">
          <span>{sector}</span>
          <span>·</span>
          <span>{country}</span>
          <span>·</span>
          <span>{stage}</span>
          {rail && (
            <><span>·</span><span className="capitalize">{rail}</span></>
          )}
        </div>
      </div>

      {/* Center: confidence + funding */}
      <div className="flex flex-col gap-2 sm:items-center min-w-[120px]">
        <ConfidenceBadge level={confidenceLevel} score={confidenceScore} showScore />
        <FundingProgress value={fundingProgress} />
        {amountBand && (
          <span className="text-xs text-[--color-text-tertiary]">{currency || ''} {amountBand}</span>
        )}
      </div>

      {/* Right: AI summary + CTAs */}
      <div className="flex flex-col gap-3 sm:items-end min-w-[140px]">
        {aiSummary && (
          <p className="text-xs text-[--color-text-tertiary] line-clamp-2 text-right">{aiSummary}</p>
        )}
        <div className="flex gap-2">
          {onTrack && (
            <Button variant="ghost" size="sm" onClick={onTrack}>Track</Button>
          )}
          {onView && (
            <Button variant="secondary" size="sm" onClick={onView}>View deal</Button>
          )}
        </div>
      </div>
    </div>
  )
}

function FundingProgress({ value }: { value: number }) {
  const pct = Math.min(Math.max(value, 0), 100)
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-[--color-text-tertiary] mb-0.5">
        <span>Funded</span>
        <span className="tabular-nums">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[--color-surface-3] overflow-hidden">
        <div
          className="h-full rounded-full bg-[--color-primary] transition-all duration-300"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
