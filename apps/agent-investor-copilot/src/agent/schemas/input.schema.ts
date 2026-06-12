import { z } from 'zod';
import { BaseAgentInputSchema } from '@fundos/validation';

export const InputSchema = BaseAgentInputSchema.extend({
  // TODO: Define specific input fields for agent-investor-copilot
});

export type Input = z.infer<typeof InputSchema>;
