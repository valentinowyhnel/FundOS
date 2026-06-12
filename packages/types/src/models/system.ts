export interface AuditLog {
  id: string;
  agentName: string;
  agentVersion: string;
  taskId: string;
  campaignId?: string;
  investorId?: string;
  action: string;
  status: 'success' | 'failure';
  durationMs: number;
  payload: Record<string, any>;
  error?: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'critical';
  priority: 'HIGH' | 'MED' | 'LOW';
  category: 'pricing' | 'cost' | 'funding' | 'compliance' | 'strategy';
  read: boolean;
  timestamp: string;
}

export interface KybRecord {
  id: string;
  founderId: string;
  companyName: string;
  registrationNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  updatedAt: string;
}

export interface ScoreHistory {
  id: string;
  campaignId: string;
  score: number;
  dimensions: {
    financial: number;
    traction: number;
    team: number;
    compliance: number;
    market: number;
  };
  changeReason: string;
  scoredBy: string; // agent-version
  timestamp: string;
}
