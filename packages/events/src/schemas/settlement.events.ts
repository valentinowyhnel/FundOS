import { z } from 'zod';

export const SettlementCompletedEventSchema = z.object({
  settlementId: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.enum(['completed', 'failed']),
  completedAt: z.string().datetime(),
});

export type SettlementCompletedEvent = z.infer<typeof SettlementCompletedEventSchema>;
