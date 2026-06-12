import { z } from 'zod';
import { BaseAgentInputSchema } from '@fundos/validation';

export const IngestionInputSchema = BaseAgentInputSchema.extend({
  sourceType: z.enum(['upload', 'api', 'webhook', 'document']),
  payload: z.any(),
});

export type IngestionInput = z.infer<typeof IngestionInputSchema>;
