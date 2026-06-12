'use client';

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Button, Badge, Card, Input } from '@fundos/ui';
import { Search, Plus, Trash, CheckCircle, Info } from 'lucide-react';

export default function DevComponentsPage() {
  return (
    <AppShell>
      <div className="space-y-12">
        <section>
          <h2 className="text-h2 font-display font-semibold mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="space-y-4">
              <h3 className="text-body-s font-semibold text-text-secondary uppercase">Variants</h3>
              <div className="flex gap-4">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-body-s font-semibold text-text-secondary uppercase">Sizes</h3>
              <div className="flex gap-4 items-end">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large CTA</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-body-s font-semibold text-text-secondary uppercase">States</h3>
              <div className="flex gap-4">
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button><Plus className="mr-2 h-5 w-5" /> With Icon</Button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-h2 font-display font-semibold mb-6">Badges & Status</h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="strong">Strong Signal</Badge>
            <Badge variant="medium">Medium Confidence</Badge>
            <Badge variant="low">Low Signal</Badge>
            <Badge variant="verified"><CheckCircle className="mr-1 h-3 w-3" /> Verified</Badge>
            <Badge variant="updated">New Update</Badge>
            <Badge variant="pending">Pending</Badge>
            <Badge variant="error">Critical Error</Badge>
            <Badge variant="outline">Lead Investor</Badge>
          </div>
        </section>

        <section>
          <h2 className="text-h2 font-display font-semibold mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-small bg-surface-muted flex items-center justify-center">
                  <span className="font-bold text-accent-primary">LO</span>
                </div>
                <Badge variant="strong">88/100</Badge>
              </div>
              <div>
                <h4 className="text-h4 font-semibold">Stripe Round B</h4>
                <p className="text-body-s text-text-secondary line-clamp-2 mt-1">
                  Leading global payments infrastructure. Expanding into stablecoin settlement and emerging markets.
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-border-default flex justify-between items-center">
                <span className="text-caption font-medium text-text-secondary">Stage: Series B</span>
                <Button size="sm" variant="ghost">Details</Button>
              </div>
            </Card>

            <Card className="bg-accent-primary/5 border-accent-primary/20">
              <div className="flex flex-col gap-2">
                <span className="text-caption font-semibold text-accent-primary uppercase tracking-wider">AI Insight</span>
                <h4 className="text-body font-semibold">Why this matters now</h4>
                <p className="text-body-s text-text-primary/80">
                  2 qualified investors from your network joined this round in the last 48h. Signal strength increased by +12%.
                </p>
                <Button variant="secondary" size="sm" className="mt-2 w-fit">Analyze Signal</Button>
              </div>
            </Card>

            <Card className="flex flex-col items-center justify-center border-dashed text-center p-12">
              <div className="h-12 w-12 rounded-full bg-surface-muted flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-text-tertiary" />
              </div>
              <p className="text-body-s font-medium text-text-secondary">Track new opportunity</p>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-h2 font-display font-semibold mb-6">Forms & Inputs</h2>
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <label className="text-body-s font-semibold">Project Name</label>
              <Input placeholder="Enter project name..." />
              <p className="text-caption text-text-secondary">Helper text for the input field</p>
            </div>
            <div className="space-y-2">
              <label className="text-body-s font-semibold">Search Projects</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                <Input className="pl-10" placeholder="Search..." />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-body-s font-semibold text-accent-danger">Invalid Input</label>
              <Input className="border-accent-danger" value="Wrong value" readOnly />
              <p className="text-caption text-accent-danger flex items-center gap-1">
                <Info className="h-3 w-3" /> This field is required
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
