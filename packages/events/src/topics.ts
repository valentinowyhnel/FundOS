export const TOPICS = {
  PROJECT_INGESTED: 'project.ingested',
  PROJECT_MARKET_RESEARCH_COMPLETED: 'project.market-research.completed',
  PROJECT_SCORE_UPDATED: 'project.score.updated',
  PROJECT_CONFIDENCE_UPDATED: 'project.confidence.updated',
  INVESTOR_PROFILE_UPDATED: 'investor.profile.updated',
  INVESTOR_MATCHES_UPDATED: 'investor.matches.updated',
  INVESTOR_RECOMMENDATIONS_UPDATED: 'investor.recommendations.updated',
} as const;

export type Topic = typeof TOPICS[keyof typeof TOPICS];
