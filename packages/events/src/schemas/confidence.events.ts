import { z } from 'zod';

export const ConfidenceUpdatedEventSchema = z.object({
  projectId: z.string(),
  confidenceScore: z.number().min(0).max(100),
  signals: z.record(z.any()),
  updatedAt: z.string().datetime(),
});

export type ConfidenceUpdatedEvent = z.infer<typeof ConfidenceUpdatedEventSchema>;
