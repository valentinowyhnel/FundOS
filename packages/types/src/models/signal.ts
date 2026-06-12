export interface ConfidenceSignal {
  campaignId: string;
  score: number;           // 0–100
  band: 'strong' | 'moderate' | 'weak' | 'insufficient';
  qualifiedCount: number;  // nombre investisseurs qualifiés (flooré à k)
  hasLeadInvestor: boolean;
  sectorAlignment: boolean;
  freshness: number;       // secondes depuis dernier update
  rationale: string;       // LLM-generated, privacy-safe
  updatedAt: string;
  version: string;         // pour traçabilité méthodologie
}
