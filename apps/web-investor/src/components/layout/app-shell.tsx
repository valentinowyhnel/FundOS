'use client';

import React from 'react';
import { Sidebar, Topbar } from './shell';

interface AppShellProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function AppShell({ children, breadcrumbs }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface-app">
      <Sidebar />
      <div className="pl-64">
        <Topbar breadcrumbs={breadcrumbs} />
        <main className="pt-[72px] px-8 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
