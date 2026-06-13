import { z } from 'zod';

export const ConfidenceSignalSchema = z.object({
  campaignId: z.string(),
  score: z.number(),
  band: z.enum(['strong', 'moderate', 'weak', 'insufficient']),
  qualifiedCount: z.number(),
  hasLeadInvestor: z.boolean(),
  sectorAlignment: z.boolean(),
  freshness: z.number(),
  rationale: z.string(),
  updatedAt: z.string(),
  version: z.string(),
});

export const ConfidenceUpdatedEventSchema = z.object({
  campaignId: z.string(),
  signal: ConfidenceSignalSchema,
  timestamp: z.string(),
  projectId: z.string(),
  confidenceScore: z.number().min(0).max(100),
  signals: z.record(z.any()),
  updatedAt: z.string().datetime(),
});

export type ConfidenceUpdatedEvent = z.infer<typeof ConfidenceUpdatedEventSchema>;
