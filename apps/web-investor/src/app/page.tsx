'use client';

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, Button, Badge, cn } from '@fundos/ui';
import { TrendingUp, ArrowUpRight, Zap, Target, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <header>
          <h1 className="text-h1 font-display font-semibold text-text-primary">
            Good morning, Valentino
          </h1>
          <p className="text-body-l text-text-secondary mt-2">
            Your confidence across invested projects is <span className="text-accent-success font-semibold">+8%</span> this week.
          </p>
        </header>

        {/* AI Brief Hero */}
        <section>
          <Card className="bg-[#EBF5F3]/50 border-accent-primary/10 p-0 overflow-hidden">
            <div className="flex h-[240px]">
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-accent-primary font-semibold text-body-s uppercase tracking-wider">
                    <Zap className="h-4 w-4" />
                    AI Intelligence Brief
                  </div>
                  <h2 className="text-h2 font-semibold max-w-2xl">
                    High concentration of institutional signals in fintech sector detected this morning.
                  </h2>
                </div>
                <div className="flex gap-4">
                  <Button size="md">View all signals</Button>
                  <Button variant="secondary" size="md">Analyze my exposure</Button>
                </div>
              </div>
              <div className="w-[400px] bg-white/40 border-l border-accent-primary/10 p-8 flex flex-col justify-between">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-body-s text-text-secondary font-medium">Total Invested</span>
                    <span className="text-body font-bold">$450,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body-s text-text-secondary font-medium">Active Exposure</span>
                    <span className="text-body font-bold">12 Projects</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body-s text-text-secondary font-medium">Avg Confidence</span>
                    <span className="text-body font-bold">76%</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="h-24 w-24 rounded-full border-8 border-accent-primary flex items-center justify-center">
                    <span className="text-h4 font-bold text-accent-primary">76%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* KPI Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard label="Portfolio Value" value="$1.2M" delta="+12%" />
          <KpiCard label="New Opportunities" value="8" delta="+2" />
          <KpiCard label="Signal Strength" value="High" />
          <KpiCard label="Pending Docs" value="3" isWarning />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Confidence Feed */}
          <section className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-end">
              <h3 className="text-h3 font-semibold">Confidence Feed</h3>
              <div className="flex gap-4 text-body-s font-medium border-b border-border-default">
                <button className="pb-2 border-b-2 border-accent-primary text-text-primary">Latest</button>
                <button className="pb-2 text-text-secondary hover:text-text-primary transition-colors">Strongest</button>
                <button className="pb-2 text-text-secondary hover:text-text-primary transition-colors">Changed</button>
              </div>
            </div>
            <Card className="p-0">
              <div className="divide-y divide-border-default">
                <FeedRow name="Stripe" score={88} delta="+5" reason="New tier-1 lead investor confirmed" />
                <FeedRow name="OpenAI" score={94} delta="0" reason="Market sentiment remains stable" />
                <FeedRow name="Mistral AI" score={72} delta="-2" reason="New competitive entry in sector" />
                <FeedRow name="Anthropic" score={85} delta="+3" reason="Capital band expansion (+12M)" />
              </div>
            </Card>
          </section>

          {/* AI Rationale */}
          <section className="lg:col-span-4 space-y-6">
            <h3 className="text-h3 font-semibold">Why it changed</h3>
            <div className="space-y-4">
              <RationaleCard
                label="MOMENTUM"
                title="Institutional Inflow"
                text="Capital band moved by $18M across fintech portfolio in 48h."
              />
              <RationaleCard
                label="RISK"
                title="Sector Overlap"
                text="3 projects in your portfolio are now directly competing for same seed round."
              />
              <RationaleCard
                label="ACTION"
                title="KYC Update"
                text="Anthropic round requires updated accreditation by Friday."
              />
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function KpiCard({ label, value, delta, isWarning }: { label: string; value: string; delta?: string; isWarning?: boolean }) {
  return (
    <Card className="p-6">
      <p className="text-caption font-semibold text-text-secondary uppercase tracking-wider">{label}</p>
      <div className="mt-4 flex items-baseline justify-between">
        <p className="text-numeric-kpi-l font-bold text-text-primary">{value}</p>
        {delta && (
          <Badge variant={isWarning ? 'medium' : 'verified'}>
            {delta}
          </Badge>
        )}
      </div>
      <div className="mt-4 h-1 w-full bg-surface-muted rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full", isWarning ? "bg-accent-warning w-1/3" : "bg-accent-primary w-2/3")} />
      </div>
    </Card>
  );
}

function FeedRow({ name, score, delta, reason }: { name: string; score: number; delta: string; reason: string }) {
  return (
    <div className="px-6 py-4 flex items-center gap-4 hover:bg-surface-muted transition-colors cursor-pointer group">
      <div className="h-10 w-10 rounded-small bg-surface-muted flex items-center justify-center font-bold text-text-secondary">
        {name[0]}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-text-primary">{name}</p>
          <Badge variant="outline" className="text-[10px] py-0">{score}/100</Badge>
          <span className={cn("text-caption font-bold", delta.startsWith('+') ? "text-accent-success" : delta === '0' ? "text-text-tertiary" : "text-accent-danger")}>
            {delta !== '0' && delta}
          </span>
        </div>
        <p className="text-body-s text-text-secondary truncate mt-0.5">{reason}</p>
      </div>
      <ArrowUpRight className="h-5 w-5 text-text-tertiary group-hover:text-accent-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
    </div>
  );
}

function RationaleCard({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <Card className="bg-white border-border-default hover:border-accent-primary/20 transition-all">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">{label}</span>
          <Target className="h-3 w-3 text-text-tertiary" />
        </div>
        <h4 className="text-body font-semibold text-text-primary">{title}</h4>
        <p className="text-body-s text-text-secondary leading-relaxed">{text}</p>
        <button className="text-caption font-semibold text-accent-primary hover:underline mt-2 flex items-center gap-1">
          Learn more
        </button>
      </div>
    </Card>
  );
}
