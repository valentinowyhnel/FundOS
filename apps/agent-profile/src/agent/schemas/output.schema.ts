import { z } from 'zod';
import { BaseAgentOutputSchema } from '@fundos/validation';

export const OutputSchema = BaseAgentOutputSchema.extend({
  // TODO: Define specific output fields for agent-profile
});

export type Output = z.infer<typeof OutputSchema>;
