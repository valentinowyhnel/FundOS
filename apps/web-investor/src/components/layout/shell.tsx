'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Search,
  Briefcase,
  PieChart,
  MessageSquare,
  Settings,
  Bell,
  User
} from 'lucide-react';
import { cn } from '@fundos/ui';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Discover', href: '/discover', icon: Search },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Activity', href: '/activity', icon: PieChart },
];

const secondaryNavItems = [
  { name: 'Ask AI', href: '/ai', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border-default bg-[#F8FAFC] flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 font-display text-h3 font-semibold text-accent-primary">
          <div className="h-8 w-8 rounded-small bg-accent-primary flex items-center justify-center">
            <span className="text-white text-body-s italic font-black">F</span>
          </div>
          FundOS
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 text-body-s font-medium rounded-small transition-all',
                isActive
                  ? 'bg-white text-text-primary shadow-subtle border-l-[3px] border-accent-primary pl-[9px]'
                  : 'text-text-secondary hover:bg-accent-lavender/5 hover:text-accent-primary'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive ? 'text-accent-primary' : 'text-text-secondary')} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 space-y-1 border-t border-border-default">
        {secondaryNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center gap-3 px-3 py-2.5 text-body-s font-medium text-text-secondary rounded-small hover:bg-surface-muted transition-all"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}

        <div className="mt-8 p-3 rounded-default bg-white border border-border-default flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-surface-muted flex items-center justify-center">
            <User className="h-6 w-6 text-text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-body-s font-semibold text-text-primary truncate">V. Rossi</p>
            <div className="mt-0.5 inline-flex items-center px-1.5 py-0.5 rounded-full bg-accent-success/10 text-[10px] font-bold text-accent-success">
              KYC VERIFIED
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface TopbarProps {
  breadcrumbs?: { label: string; href?: string }[] | undefined;
}

export function Topbar({ breadcrumbs }: TopbarProps) {
  return (
    <header className="fixed top-0 right-0 z-30 h-[72px] left-64 bg-white border-bottom border-border-default px-8 flex items-center justify-between">
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search projects, investors..."
          className="w-full h-11 pl-10 pr-4 rounded-small border border-border-default bg-surface-muted/50 text-body-s focus:outline-none focus:ring-1 focus:ring-accent-primary transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="h-11 px-4 rounded-small border border-border-default text-body-s font-medium hover:bg-surface-muted transition-all">
          Connect Wallet
        </button>
        <div className="h-10 w-10 rounded-full bg-surface-muted flex items-center justify-center relative cursor-pointer hover:bg-border-default transition-all">
          <Bell className="h-5 w-5 text-text-secondary" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-accent-danger border-2 border-white"></span>
        </div>
      </div>
    </header>
  );
}
