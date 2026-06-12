import { z } from 'zod';
import { BaseAgentOutputSchema } from '@fundos/validation';

export const IngestionOutputSchema = BaseAgentOutputSchema.extend({
  ingestedId: z.string().optional(),
  data: z.any().optional(),
});

export type IngestionOutput = z.infer<typeof IngestionOutputSchema>;
