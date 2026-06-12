// TODO: Import { Agent } from '@google-cloud/adk' once dependency is available
// import { Agent } from '@google-cloud/adk';
import { createGeminiClient } from '@fundos/ai';
import { IngestionInputSchema } from './schemas/input.schema';
import { IngestionOutputSchema } from './schemas/output.schema';
import { systemPrompt } from './prompts/system.prompt';

// This is a placeholder for the ADK Agent until the library is fully integrated
export const agent = {
  name: 'agent-ingestion',
  description: 'Normalizes uploads, APIs, webhooks, and documents',
  inputSchema: IngestionInputSchema,
  outputSchema: IngestionOutputSchema,
  systemPrompt,
  // tools: [],
  // workflow: async (input) => { ... }
};

console.log('ADK Agent "agent-ingestion" initialized with Gemini');
