'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import Card from '@/components/Card';
import Button from '@/components/Button';

const CompliancePage: React.FC = () => {
  const [complianceItems] = useState([
    {
      id: '1',
      title: 'Identity Verification',
      status: 'verified' as const,
      description: 'Your government-issued ID has been verified',
      uploadedAt: '2024-06-10',
    },
    {
      id: '2',
      title: 'Residency Proof',
      status: 'verified' as const,
      description: 'Address verification completed',
      uploadedAt: '2024-06-10',
    },
    {
      id: '3',
      title: 'Accreditation Status',
      status: 'pending' as const,
      description: 'Waiting for accreditation review',
      uploadedAt: undefined,
    },
    {
      id: '4',
      title: 'Source of Funds',
      status: 'pending' as const,
      description: 'Bank statement required to confirm source',
      uploadedAt: undefined,
    },
  ]);

  const [privacySettings, setPrivacySettings] = useState({
    publicVisibility: false,
    aggregatedContribution: true,
    leadInvestorBadge: true,
    activityHidden: false,
    signalNotifications: true,
  });

  const toggleSetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-fundos-success';
      case 'pending':
        return 'bg-fundos-warning';
      case 'rejected':
        return 'bg-fundos-danger';
      default:
        return 'bg-fundos-text-tertiary';
    }
  };

  return (
    <div className="flex h-screen bg-fundos-bg">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar breadcrumbs={[{ label: 'Compliance' }]} />

        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-h1 font-semibold text-fundos-text-primary">Compliance Center</h1>
            <p className="text-body text-fundos-text-secondary">Manage your KYC status and privacy settings</p>
          </div>

          {/* Overall Status */}
          <Card className="bg-gradient-to-br from-fundos-surface to-fundos-surface-elevated">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-h4 font-semibold text-fundos-text-primary">Verification Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-fundos-success" />
                    <span className="text-body text-fundos-text-secondary">3 of 4 items verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-fundos-warning" />
                    <span className="text-body text-fundos-text-secondary">1 item pending</span>
                  </div>
                </div>
                <Button variant="primary" size="md" className="mt-4">Resume Verification</Button>
              </div>
              <div className="space-y-4 border-l border-fundos-border pl-8">
                <h3 className="text-h4 font-semibold text-fundos-text-primary">Next Action Required</h3>
                <div className="p-4 bg-fundos-surface-muted rounded-lg border border-fundos-border">
                  <p className="text-body font-medium text-fundos-text-primary mb-2">Source of Funds</p>
                  <p className="text-body-s text-fundos-text-secondary">Please upload a recent bank statement to confirm the source of your investment funds</p>
                </div>
              </div>
            </div>
          </Card>

          {/* KYC Items */}
          <Card noPadding>
            <div className="p-6 border-b border-fundos-border">
              <h3 className="text-h4 font-semibold text-fundos-text-primary">KYC Requirements</h3>
            </div>
            <div className="divide-y divide-fundos-border">
              {complianceItems.map((item) => (
                <div key={item.id} className="p-6 hover:bg-fundos-surface-muted transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-body font-semibold text-fundos-text-primary">{item.title}</h4>
                        <span className={`px-2.5 py-1 rounded-full text-caption font-medium text-white capitalize ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-body-s text-fundos-text-secondary">{item.description}</p>
                      {item.uploadedAt && (
                        <p className="text-caption text-fundos-text-tertiary">Uploaded {item.uploadedAt}</p>
                      )}
                    </div>
                    {item.status === 'pending' && (
                      <Button variant="secondary" size="sm">Upload</Button>
                    )}
                    {item.status === 'verified' && (
                      <Button variant="ghost" size="sm">✓ Verified</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Privacy Settings */}
          <Card noPadding>
            <div className="p-6 border-b border-fundos-border">
              <h3 className="text-h4 font-semibold text-fundos-text-primary">Privacy Settings</h3>
              <p className="text-body-s text-fundos-text-secondary mt-2">Control how your investment data is shared and aggregated</p>
            </div>
            <div className="divide-y divide-fundos-border">
              {[
                {
                  id: 'publicVisibility',
                  title: 'Public Profile',
                  description: 'Make your investor profile visible to founders',
                },
                {
                  id: 'aggregatedContribution',
                  title: 'Aggregated Data',
                  description: 'Allow your investment to contribute to confidence signals (anonymously)',
                },
                {
                  id: 'leadInvestorBadge',
                  title: 'Lead Investor Badge',
                  description: 'Display if you are a lead or major investor in a deal',
                },
                {
                  id: 'activityHidden',
                  title: 'Hide Activity by Default',
                  description: 'Your investment activity is hidden from other investors by default',
                },
                {
                  id: 'signalNotifications',
                  title: 'Signal Notifications',
                  description: 'Receive alerts when confidence signals change',
                },
              ].map((setting) => (
                <div key={setting.id} className="p-6 flex items-start justify-between hover:bg-fundos-surface-muted transition-colors">
                  <div className="space-y-1">
                    <p className="text-body font-medium text-fundos-text-primary">{setting.title}</p>
                    <p className="text-body-s text-fundos-text-secondary">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => toggleSetting(setting.id as keyof typeof privacySettings)}
                    className={`relative inline-flex h-7 w-12 flex-shrink-0 rounded-full border-2 border-transparent transition-colors ${
                      privacySettings[setting.id as keyof typeof privacySettings]
                        ? 'bg-fundos-primary'
                        : 'bg-fundos-surface-muted'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        privacySettings[setting.id as keyof typeof privacySettings]
                          ? 'translate-x-5'
                          : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Privacy Explanation */}
          <Card muted className="border-fundos-border-strong">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-h3 flex-shrink-0">🔒</span>
                <div className="space-y-2">
                  <h4 className="font-semibold text-fundos-text-primary">How We Protect Your Privacy</h4>
                  <ul className="space-y-2 text-body-s text-fundos-text-secondary">
                    <li>✓ <strong>Identities are hidden</strong> unless you explicitly consent to sharing</li>
                    <li>✓ <strong>Investment amounts shown in ranges</strong> to protect individual data</li>
                    <li>✓ <strong>Small groups are masked</strong> to prevent de-anonymization</li>
                    <li>✓ <strong>Audit trail visible</strong> so you know exactly what data is used</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CompliancePage;
