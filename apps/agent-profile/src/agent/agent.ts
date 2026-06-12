// import { Agent } from '@google-cloud/adk';
import { createGeminiClient } from '@fundos/ai';
import { InputSchema } from './schemas/input.schema';
import { OutputSchema } from './schemas/output.schema';
import { systemPrompt } from './prompts/system.prompt';

export const agent = {
  name: 'agent-profile',
  description: 'Derive investor profile snapshots and preferences',
  inputSchema: InputSchema,
  outputSchema: OutputSchema,
  systemPrompt,
};

console.log('ADK Agent "agent-profile" initialized');
