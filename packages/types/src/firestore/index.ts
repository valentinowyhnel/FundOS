export interface FsConfidenceSignal {
  id: string;
  campaignId: string;
  score: number;
  level: 'LOW' | 'MODERATE' | 'STRONG';
  factors: Array<{
    label: string;
    value: string;
    impact: number;
  }>;
  narrative: string;
  updatedAt: string;
}

export interface FsInvestorProfile {
  investorId: string;
  behavioralTags: string[];
  riskProfile: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
  copilotContext: string;
  preferences: {
    minTicket: number;
    maxTicket: number;
    preferredSectors: string[];
  };
}

export interface FsAiBrief {
  id: string;
  investorId: string;
  campaignId: string;
  matchResult: {
    score: number; // 0-1
    reasons: string[];
    risks: string[];
  };
  content: string;
  generatedAt: string;
}

export interface FsAgentSession {
  sessionId: string;
  agentId: string;
  userId: string;
  context: any;
  history: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
  }>;
}

export interface FsMatchResult {
  investorId: string;
  campaignId: string;
  score: number;
  rank: number;
}
