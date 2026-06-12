import { z } from 'zod';
import { BaseAgentInputSchema } from '@fundos/validation';

export const InputSchema = BaseAgentInputSchema.extend({
  // TODO: Define specific input fields for agent-recommendation
});

export type Input = z.infer<typeof InputSchema>;
