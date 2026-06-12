// import { Agent } from '@google-cloud/adk';
import { createGeminiClient } from '@fundos/ai';
import { InputSchema } from './schemas/input.schema';
import { OutputSchema } from './schemas/output.schema';
import { systemPrompt } from './prompts/system.prompt';

export const agent = {
  name: 'agent-investor-copilot',
  description: 'Answer investor questions using outputs of other agents and services',
  inputSchema: InputSchema,
  outputSchema: OutputSchema,
  systemPrompt,
};

console.log('ADK Agent "agent-investor-copilot" initialized');
