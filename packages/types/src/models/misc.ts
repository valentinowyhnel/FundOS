export interface MatchResult {
  investorId: string;
  campaignId: string;
  score: number; // 0-1
  dimensions: {
    sectorFit: number;
    stageFit: number;
    ticketFit: number;
    geoFit: number;
    portfolioFit: number;
  };
  rationale: string;
  updatedAt: string;
}

export interface AiBrief {
  investorId: string;
  greeting: string;
  insights: string[];
  actions: {
    label: string;
    action: string;
    params?: Record<string, any>;
  }[];
  urgentDeals: {
    campaignId: string;
    title: string;
    reason: string;
  }[];
  updatedAt: string;
}

export interface AgentSession {
  sessionId: string;
  investorId: string;
  history: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
  context: Record<string, any>;
  expiresAt: number;
}
