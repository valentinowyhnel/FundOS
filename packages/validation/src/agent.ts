import { z } from 'zod';

export const BaseAgentInputSchema = z.object({
  requestId: z.string().uuid(),
  timestamp: z.string().datetime(),
});

export const BaseAgentOutputSchema = z.object({
  requestId: z.string().uuid(),
  status: z.enum(['success', 'error']),
  error: z.string().optional(),
});

export type BaseAgentInput = z.infer<typeof BaseAgentInputSchema>;
export type BaseAgentOutput = z.infer<typeof BaseAgentOutputSchema>;
