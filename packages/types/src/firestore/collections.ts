export const COLLECTIONS = {
  CONFIDENCE_SIGNALS: 'confidence_signals',
  INVESTOR_PROFILES: 'investor_profiles',
  AGENT_SESSIONS: 'agent_sessions',
  CAMPAIGN_SCORES: 'campaign_scores',
  MATCH_RESULTS: 'match_results',
  BRIEF_CACHE: 'brief_cache',
} as const;

export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];
