'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, Button } from '@fundos/ui';

const ActivityPage: React.FC = () => {
  const [activities] = useState([
    {
      id: '1',
      type: 'investment',
      title: 'Investment Confirmed',
      description: 'Invested $50,000 in TechVentures Fund',
      timestamp: '2 hours ago',
      icon: '✓',
    },
    {
      id: '2',
      type: 'signal',
      title: 'Signal Updated',
      description: 'RetailAI confidence increased to 85%',
      timestamp: '4 hours ago',
      icon: '📈',
    },
    {
      id: '3',
      type: 'compliance',
      title: 'Verification Complete',
      description: 'Your identity verification has been approved',
      timestamp: '1 day ago',
      icon: '✓',
    },
    {
      id: '4',
      type: 'wallet',
      title: 'Deposit Received',
      description: 'Bank transfer of $100,000 settled',
      timestamp: '2 days ago',
      icon: '💳',
    },
    {
      id: '5',
      type: 'portfolio',
      title: 'Portfolio Milestone',
      description: 'Your portfolio crossed $150,000 mark',
      timestamp: '3 days ago',
      icon: '🎯',
    },
    {
      id: '6',
      type: 'signal',
      title: 'New Signal Available',
      description: 'FinTech Pro reached Medium confidence level',
      timestamp: '4 days ago',
      icon: '🔔',
    },
  ]);

  const [filterType, setFilterType] = useState<'all' | 'investment' | 'signal' | 'compliance' | 'wallet' | 'portfolio'>('all');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'investment':
        return 'bg-fundos-primary text-white';
      case 'signal':
        return 'bg-fundos-info text-white';
      case 'compliance':
        return 'bg-fundos-success text-white';
      case 'wallet':
        return 'bg-fundos-warning text-fundos-text-primary';
      case 'portfolio':
        return 'bg-fundos-accent text-white';
      default:
        return 'bg-fundos-surface-muted text-fundos-text-secondary';
    }
  };

  const filteredActivities = filterType === 'all'
    ? activities
    : activities.filter(a => a.type === filterType);

  return (
    <AppShell breadcrumbs={[{ label: 'Activity' }]}>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-h1 font-semibold text-fundos-text-primary">Activity Center</h1>
          <p className="text-body text-fundos-text-secondary">Audit trail of all your actions and portfolio changes</p>
        </div>

        {/* Filters */}
        <Card className="border-fundos-border">
          <div className="flex gap-2 flex-wrap">
            {(['all', 'investment', 'signal', 'compliance', 'wallet', 'portfolio'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterType(filter)}
                className={`px-4 py-2 rounded-md font-medium text-body-s transition-colors capitalize ${
                  filterType === filter
                    ? 'bg-fundos-primary text-white'
                    : 'bg-fundos-surface-muted text-fundos-text-secondary border border-fundos-border hover:border-fundos-border-strong'
                }`}
              >
                {filter === 'all' ? 'All Activity' : filter}
              </button>
            ))}
          </div>
        </Card>

        {/* Activity Feed */}
        <div className="space-y-4">
          {filteredActivities.length > 0 ? (
            <>
              {['Today', 'Yesterday', 'Earlier this week', 'Earlier'].map((period) => {
                const periodActivities = filteredActivities;
                if (periodActivities.length === 0) return null;

                return (
                  <div key={period} className="space-y-3">
                    <h3 className="text-body font-semibold text-fundos-text-secondary px-2">{period}</h3>
                    <div className="space-y-3">
                      {periodActivities.map((activity) => (
                        <Card key={activity.id} hoverable className="flex items-start gap-4 cursor-pointer group">
                          <div className={`w-12 h-12 rounded-lg ${getTypeColor(activity.type)} flex items-center justify-center text-h3 flex-shrink-0`}>
                            {activity.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-body font-semibold text-fundos-text-primary group-hover:text-fundos-primary">{activity.title}</h4>
                            <p className="text-body-s text-fundos-text-secondary mt-1">{activity.description}</p>
                            <p className="text-caption text-fundos-text-tertiary mt-2">{activity.timestamp}</p>
                          </div>
                          <div className="flex-shrink-0 text-fundos-text-tertiary group-hover:text-fundos-primary transition-colors">
                            →
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <Card variant="muted" className="text-center py-8">
              <p className="text-body text-fundos-text-secondary">No activity found</p>
            </Card>
          )}
        </div>

        {/* Export */}
        <div className="flex justify-center">
          <Button variant="secondary" size="md">Export Activity Log</Button>
        </div>
      </div>
    </AppShell>
  );
};

export default ActivityPage;
