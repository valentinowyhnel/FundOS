import { z } from 'zod';
import { BaseAgentInputSchema } from '@fundos/validation';

export const InputSchema = BaseAgentInputSchema.extend({
  // TODO: Define specific input fields for agent-market-research
});

export type Input = z.infer<typeof InputSchema>;
