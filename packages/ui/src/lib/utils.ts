/**
 * FundOS UI — Utility helpers
 */
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely.
 * Resolves conflicts (e.g. p-4 + p-6 → p-6) and deduplicates.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as a financial string.
 * Examples: 1500000 → €1.5M, 95000 → €95K
 */
export function formatAmount(
  value: number,
  currency = 'EUR',
  locale = 'en-US'
): string {
  if (value >= 1_000_000) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 1,
    }).format(value / 1_000_000) + 'M'
  }
  if (value >= 1_000) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value / 1_000) + 'K'
  }
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}

/**
 * Map a 0–100 score to a ConfidenceLevel.
 */
export function scoreToLevel(score: number): 'high' | 'medium' | 'low' | 'none' {
  if (score >= 75) return 'high'
  if (score >= 50) return 'medium'
  if (score >= 1)  return 'low'
  return 'none'
}

/**
 * Format relative time for signal freshness.
 * Examples: "Updated 5m ago", "Updated 2h ago"
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const diffMs = Date.now() - d.getTime()
  const diffMin = Math.floor(diffMs / 60_000)
  if (diffMin < 1)  return 'just now'
  if (diffMin < 60) return `${diffMin}m ago`
  const diffH = Math.floor(diffMin / 60)
  if (diffH < 24)   return `${diffH}h ago`
  const diffD = Math.floor(diffH / 24)
  return `${diffD}d ago`
}
