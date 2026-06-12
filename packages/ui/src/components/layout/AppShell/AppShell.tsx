/**
 * FundOS UI — AppShell
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § Layout — Global structure
 *
 * Provides: sidebar + topbar + main content area
 * Used in: apps/web-investor, apps/web-founder, apps/web-admin
 *
 * TODO: Add sidebar collapse state
 * TODO: Add mobile bottom nav
 * TODO: Wire to auth/user context
 */
import * as React from 'react'
import { cn } from '../../../lib/utils'

export interface AppShellProps {
  sidebar: React.ReactNode
  topbar: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function AppShell({ sidebar, topbar, children, className }: AppShellProps) {
  return (
    <div className={cn('flex h-screen w-full overflow-hidden bg-[--color-bg]', className)}>
      {/* Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-[--sidebar-width] shrink-0 border-r border-[--color-border] bg-[--color-surface] overflow-y-auto"
        aria-label="Main navigation"
      >
        {sidebar}
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Topbar */}
        <header
          className="h-[--topbar-height] shrink-0 flex items-center border-b border-[--color-border] bg-[--color-surface] px-6"
          role="banner"
        >
          {topbar}
        </header>

        {/* Page content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

/**
 * PageContainer — wraps page content with consistent max-width + padding
 */
export function PageContainer({
  children,
  maxWidth = 'default',
  className,
}: {
  children: React.ReactNode
  maxWidth?: 'narrow' | 'default' | 'wide' | 'full'
  className?: string
}) {
  const maxWidthMap = {
    narrow:  'max-w-[--content-narrow]',
    default: 'max-w-[--content-default]',
    wide:    'max-w-[--content-wide]',
    full:    'max-w-full',
  }
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 py-8',
        maxWidthMap[maxWidth],
        className
      )}
    >
      {children}
    </div>
  )
}
