// Core domain types for FundOS Investor Portal

export interface Investor {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  accreditationStatus: 'accredited' | 'pending' | 'none';
  portfolio: Portfolio;
  createdAt: Date;
  updatedAt: Date;
}

export interface Portfolio {
  investorId: string;
  totalInvested: number;
  activeDeals: number;
  cashReserve: number;
  avgConfidence: number;
  holdings: Holding[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Holding {
  id: string;
  portfolioId: string;
  dealId: string;
  amount: number;
  investmentDate: Date;
  status: 'active' | 'completed' | 'exited';
  currentSignal: ConfidenceSignal;
  signalDelta: number;
  stage: 'seed' | 'series-a' | 'series-b' | 'growth';
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  thesis: string;
  sector: string[];
  stage: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'growth' | 'mature';
  geography: string[];
  founder: Founder;
  targetAmount: number;
  raisedAmount: number;
  minimumTicket: number;
  maximumTicket?: number;
  deadline: Date;
  progressPercentage: number;
  confidenceScore: number;
  investorSignal: number;
  complianceStatus: 'pending' | 'verified' | 'flagged';
  acceptedRails: ('bank_transfer' | 'wallet' | 'stablecoin')[];
  aiMemo: AIMemo;
  evidence: Evidence[];
  timeline: TimelineEvent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Founder {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  linkedIn?: string;
  twitter?: string;
}

export interface AIMemo {
  dealId: string;
  opportunity: string;
  risks: string[];
  momentum: string;
  useOfFunds: string;
  lastUpdated: Date;
}

export interface Evidence {
  id: string;
  dealId: string;
  type: 'traction' | 'team' | 'market' | 'funding' | 'escrow' | 'docs';
  title: string;
  description: string;
  value?: string | number;
  documentUrl?: string;
  createdAt: Date;
}

export interface TimelineEvent {
  id: string;
  dealId: string;
  type: 'created' | 'investor_joined' | 'signal_changed' | 'docs_added' | 'settlement';
  title: string;
  description: string;
  timestamp: Date;
}

export interface ConfidenceSignal {
  score: number;
  breakdown: {
    qualifiedInvestors: number;
    sectorFit: number;
    freshness: number;
    diversity: number;
    capitalBand: number;
  };
  changeHistory: SignalChange[];
  methodology: string;
  lastUpdated: Date;
}

export interface SignalChange {
  timestamp: Date;
  previousScore: number;
  newScore: number;
  reason: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface Signal {
  id: string;
  dealId: string;
  type: 'investor' | 'compliance' | 'traction' | 'momentum';
  previousValue: number;
  currentValue: number;
  delta: number;
  reason: string;
  freshness: Date;
  tags: string[];
}

export interface InvestmentRail {
  id: string;
  type: 'bank_transfer' | 'wallet' | 'stablecoin';
  name: string;
  settlementTime: string;
  fees: number;
  supportedCountries: string[];
  minimumAmount: number;
  maximumAmount?: number;
  complianceNote: string;
}

export interface ComplianceStatus {
  investorId: string;
  identity: 'pending' | 'verified' | 'rejected';
  residency: 'pending' | 'verified' | 'rejected';
  accreditation: 'pending' | 'verified' | 'rejected';
  sourceOfFunds: 'pending' | 'verified' | 'rejected';
  walletVerification: 'pending' | 'verified' | 'rejected';
  taxResidency: 'pending' | 'verified' | 'rejected';
  overallStatus: 'pending' | 'verified' | 'rejected';
  nextRequiredAction?: string;
}

export interface PrivacySettings {
  investorId: string;
  publicVisibility: boolean;
  aggregatedContribution: boolean;
  leadInvestorBadge: boolean;
  activityHidden: boolean;
  signalNotifications: boolean;
}

export interface Transaction {
  id: string;
  investorId: string;
  dealId: string;
  type: 'investment' | 'deposit' | 'withdrawal' | 'settlement';
  amount: number;
  currency: string;
  rail: InvestmentRail;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  timestamp: Date;
  confirmationHash?: string;
}

export interface ActivityLog {
  id: string;
  investorId: string;
  type: 'investment' | 'signal' | 'compliance' | 'wallet' | 'portfolio';
  title: string;
  description: string;
  actionUrl?: string;
  timestamp: Date;
}
