import { z } from 'zod';

export const IngestionCompletedEventSchema = z.object({
  ingestionId: z.string(),
  source: z.enum(['stripe', 'plaid', 'manual', 'onchain']),
  type: z.string(),
  payload: z.any(),
  timestamp: z.string(),
});

export type IngestionCompletedEvent = z.infer<typeof IngestionCompletedEventSchema>;

export const IngestionFailedEventSchema = z.object({
  ingestionId: z.string(),
  reason: z.string(),
  error: z.string(),
  timestamp: z.string(),
});

export type IngestionFailedEvent = z.infer<typeof IngestionFailedEventSchema>;
