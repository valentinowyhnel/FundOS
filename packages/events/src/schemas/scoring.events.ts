import { z } from 'zod';

export const CampaignScoreSchema = z.object({
  campaignId: z.string(),
  score: z.number(),
  dimensions: z.object({
    financial: z.number(),
    traction: z.number(),
    team: z.number(),
    compliance: z.number(),
    market: z.number(),
  }),
  rationale: z.string(),
  updatedAt: z.string(),
});

export const ScoreUpdatedEventSchema = z.object({
  campaignId: z.string(),
  score: CampaignScoreSchema,
  timestamp: z.string(),
});

export type ScoreUpdatedEvent = z.infer<typeof ScoreUpdatedEventSchema>;
