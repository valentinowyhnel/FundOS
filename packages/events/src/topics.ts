export const TOPICS = {
  INGESTION_COMPLETED: 'fundos.ingestion.completed',
  INGESTION_FAILED: 'fundos.ingestion.failed',
  SCORE_UPDATED: 'fundos.score.updated',
  CONFIDENCE_UPDATED: 'fundos.confidence.updated',
  CAMPAIGN_PUBLISHED: 'fundos.campaign.published',
  CAMPAIGN_UPDATED: 'fundos.campaign.updated',
  INVESTMENT_CONFIRMED: 'fundos.investment.confirmed',
  ESCROW_RELEASED: 'fundos.escrow.released',
  ONCHAIN_EVENT: 'fundos.onchain.event',
  KYC_UPDATED: 'fundos.kyc.updated',
  MATCHES_UPDATED: 'fundos.matches.updated',
  PROFILE_UPDATED: 'fundos.profile.updated',
  PROJECT_INGESTED: 'project.ingested',
  PROJECT_MARKET_RESEARCH_COMPLETED: 'project.market-research.completed',
  PROJECT_SCORE_UPDATED: 'project.score.updated',
  PROJECT_CONFIDENCE_UPDATED: 'project.confidence.updated',
  INVESTOR_PROFILE_UPDATED: 'investor.profile.updated',
  INVESTOR_MATCHES_UPDATED: 'investor.matches.updated',
  INVESTOR_RECOMMENDATIONS_UPDATED: 'investor.recommendations.updated',
} as const;

export type TopicName = typeof TOPICS[keyof typeof TOPICS];
export type Topic = TopicName;
