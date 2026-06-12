export interface Campaign {
  id: string;
  founderId: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  status: 'draft' | 'published' | 'funded' | 'closed';
  sector: string;
  stage: 'seed' | 'series_a' | 'series_b' | 'growth';
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignScore {
  campaignId: string;
  score: number; // 0-100
  dimensions: {
    financial: number;
    traction: number;
    team: number;
    compliance: number;
    market: number;
  };
  rationale: string;
  updatedAt: string;
}
