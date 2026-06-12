import { z } from 'zod';
import { BaseAgentOutputSchema } from '@fundos/validation';

export const OutputSchema = BaseAgentOutputSchema.extend({
  // TODO: Define specific output fields for agent-matching
});

export type Output = z.infer<typeof OutputSchema>;
