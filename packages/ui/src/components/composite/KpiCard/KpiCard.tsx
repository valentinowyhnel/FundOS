/**
 * FundOS UI — KpiCard
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § Dashboard Overview — KPI Strip
 *
 * Used in: Dashboard overview page, Portfolio summary row
 * Shows: metric label, value, delta, optional sparkline
 */
import * as React from 'react'
import { cn } from '../../lib/utils'

export type KpiDelta = {
  value: string
  direction: 'up' | 'down' | 'neutral'
  label?: string
}

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
  delta?: KpiDelta
  prefix?: string
  suffix?: string
  loading?: boolean
  /** Optional sparkline element (e.g. a small recharts LineChart) */
  sparkline?: React.ReactNode
}

export function KpiCard({
  label,
  value,
  delta,
  prefix,
  suffix,
  loading,
  sparkline,
  className,
  ...props
}: KpiCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-xl border border-[--color-border] bg-[--color-surface]',
        'p-5 shadow-xs',
        className
      )}
      {...props}
    >
      {/* Label */}
      <span className="text-xs font-medium text-[--color-text-tertiary] uppercase tracking-wider">
        {label}
      </span>

      {/* Value row */}
      {loading ? (
        <div className="h-8 w-24 animate-pulse rounded-md bg-[--color-surface-3]" />
      ) : (
        <div className="flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-1">
            {prefix && <span className="text-base text-[--color-text-tertiary]">{prefix}</span>}
            <span
              className="text-2xl font-semibold tracking-tight text-[--color-text]"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {value}
            </span>
            {suffix && <span className="text-base text-[--color-text-tertiary]">{suffix}</span>}
          </div>
          {sparkline && <div className="shrink-0">{sparkline}</div>}
        </div>
      )}

      {/* Delta */}
      {!loading && delta && (
        <div className="flex items-center gap-1 text-xs">
          <DeltaIcon direction={delta.direction} />
          <span
            className={cn(
              'font-medium',
              delta.direction === 'up'   && 'text-[--color-success-fg]',
              delta.direction === 'down' && 'text-[--color-danger-fg]',
              delta.direction === 'neutral' && 'text-[--color-text-tertiary]',
            )}
          >
            {delta.value}
          </span>
          {delta.label && (
            <span className="text-[--color-text-tertiary]">{delta.label}</span>
          )}
        </div>
      )}
    </div>
  )
}

function DeltaIcon({ direction }: { direction: KpiDelta['direction'] }) {
  if (direction === 'up') {
    return <svg className="w-3 h-3 text-[--color-success]" viewBox="0 0 12 12" fill="currentColor" aria-hidden><path d="M6 2L11 9H1L6 2z"/></svg>
  }
  if (direction === 'down') {
    return <svg className="w-3 h-3 text-[--color-danger]" viewBox="0 0 12 12" fill="currentColor" aria-hidden><path d="M6 10L1 3H11L6 10z"/></svg>
  }
  return <span className="w-3 h-3 inline-block border-t-2 border-[--color-text-disabled]" aria-hidden />
}
