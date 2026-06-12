import { z } from 'zod';

export const InvestmentConfirmedEventSchema = z.object({
  investmentId: z.string(),
  campaignId: z.string(),
  investorId: z.string(),
  amount: z.number(),
  currency: z.string(),
  timestamp: z.string(),
});

export type InvestmentConfirmedEvent = z.infer<typeof InvestmentConfirmedEventSchema>;

export const EscrowReleasedEventSchema = z.object({
  campaignId: z.string(),
  amount: z.number(),
  timestamp: z.string(),
});

export type EscrowReleasedEvent = z.infer<typeof EscrowReleasedEventSchema>;
