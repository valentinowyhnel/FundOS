import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, Button, Badge, Input, cn } from '@fundos/ui';
import { Search, Filter, Grid, List, CheckCircle2, ShieldCheck, MapPin, Zap } from 'lucide-react';

export default function DiscoverPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <header className="flex justify-between items-start">
          <div>
            <h1 className="text-h1 font-display font-semibold text-text-primary">
              Discover opportunities
            </h1>
            <p className="text-body-l text-text-secondary mt-2">
              Research and track live funding rounds with AI-powered signals.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="md">Saved Views</Button>
            <div className="flex border border-border-default rounded-small overflow-hidden">
              <button className="p-2.5 bg-surface-muted text-accent-primary"><Grid className="h-5 w-5" /></button>
              <button className="p-2.5 bg-white text-text-tertiary hover:text-text-secondary transition-colors"><List className="h-5 w-5" /></button>
            </div>
          </div>
        </header>

        <div className="flex gap-8">
          {/* Sticky Filter Rail */}
          <aside className="w-64 shrink-0 space-y-8">
            <div className="space-y-4">
              <h4 className="text-caption font-bold text-text-secondary uppercase tracking-widest">Search</h4>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                <Input className="pl-10 h-10" placeholder="Filter names..." />
              </div>
            </div>

            <FilterSection title="Sector">
              <FilterChip label="Fintech" count={12} active />
              <FilterChip label="AI/ML" count={45} />
              <FilterChip label="Climate" count={8} />
              <FilterChip label="Health" count={15} />
            </FilterSection>

            <FilterSection title="Stage">
              <FilterChip label="Pre-Seed" count={22} />
              <FilterChip label="Seed" count={18} active />
              <FilterChip label="Series A" count={9} />
              <FilterChip label="Later Stage" count={4} />
            </FilterSection>

            <FilterSection title="Signal Strength">
              <FilterChip label="Institutional" count={3} />
              <FilterChip label="High Momentum" count={12} active />
              <FilterChip label="Verified Only" count={28} />
            </FilterSection>
          </aside>

          {/* Main Grid */}
          <main className="flex-1 space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              <DealCard
                name="PayFlow"
                thesis="Next-gen stablecoin settlement for B2B cross-border payments."
                stage="Seed"
                location="London, UK"
                score={92}
                progress={75}
                isVerified
              />
              <DealCard
                name="NeuraMesh"
                thesis="Optimized inference engine for edge computing on consumer hardware."
                stage="Series A"
                location="San Francisco, CA"
                score={84}
                progress={40}
                isLead
              />
              <DealCard
                name="GreenNode"
                thesis="Decentralized grid management for micro-renewables."
                stage="Seed"
                location="Berlin, DE"
                score={71}
                progress={90}
                isVerified
              />
              <DealCard
                name="OmniHealth"
                thesis="AI co-pilot for specialized oncology diagnosis."
                stage="Series B"
                location="Boston, MA"
                score={68}
                progress={15}
              />
              <DealCard
                name="CyberVault"
                thesis="Zero-knowledge proof encryption for institutional asset custody."
                stage="Series A"
                location="Tel Aviv, IL"
                score={89}
                progress={62}
                isVerified
                isLead
              />
              <DealCard
                name="AutoScale"
                thesis="Generative UI for enterprise SaaS optimization."
                stage="Pre-Seed"
                location="New York, NY"
                score={78}
                progress={35}
              />
            </div>
          </main>
        </div>
      </div>
    </AppShell>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="text-caption font-bold text-text-secondary uppercase tracking-widest">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

function FilterChip({ label, count, active }: { label: string; count: number; active?: boolean }) {
  return (
    <button className={cn(
      "px-3 py-1.5 rounded-full text-caption font-medium border transition-all flex items-center gap-2",
      active
        ? "bg-accent-primary border-accent-primary text-white"
        : "bg-white border-border-default text-text-secondary hover:border-text-tertiary"
    )}>
      {label}
      <span className={cn("text-[10px]", active ? "text-white/70" : "text-text-tertiary")}>{count}</span>
    </button>
  );
}

function DealCard({ name, thesis, stage, location, score, progress, isVerified, isLead }: any) {
  return (
    <Card className="group flex flex-col p-6 h-full border border-border-default hover:border-accent-primary/20 transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className="h-12 w-12 rounded-small bg-surface-muted flex items-center justify-center font-bold text-accent-primary text-h4">
          {name[0]}
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant={score >= 80 ? 'strong' : score >= 60 ? 'medium' : 'low'} className="py-0.5">
            {score}/100
          </Badge>
          <div className="flex gap-1.5">
            {isVerified && <ShieldCheck className="h-4 w-4 text-accent-success" />}
            {isLead && <CheckCircle2 className="h-4 w-4 text-accent-primary" />}
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <h3 className="text-h4 font-bold text-text-primary group-hover:text-accent-primary transition-colors">{name}</h3>
        <p className="text-body-s text-text-secondary line-clamp-2 leading-relaxed">
          {thesis}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-4 text-caption font-medium text-text-tertiary">
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" /> {stage}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {location}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-caption font-bold">
            <span className="text-text-secondary uppercase">Raised</span>
            <span className="text-text-primary">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-surface-muted rounded-full overflow-hidden">
            <div className="h-full bg-accent-primary rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="bg-accent-primary/5 rounded-small p-3 border border-accent-primary/10">
          <p className="text-[11px] text-accent-primary font-medium leading-relaxed">
            AI Note: 2 qualified investors joined this week. Signal strength increased.
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="secondary" className="flex-1">Track</Button>
          <Button size="sm" className="flex-1">Invest</Button>
        </div>
      </div>
    </Card>
  );
}
