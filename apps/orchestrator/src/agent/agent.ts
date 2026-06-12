import { createAgent, createTool, runAgent } from '@fundos/ai';
import { z } from 'zod';

const invokeIngestionAgent = createTool({
  name: 'invokeIngestionAgent',
  description: 'Invokes the ingestion agent to process incoming data',
  schema: z.object({ data: z.any() }),
  handler: async (input) => {
    return { status: 'ingested', ingestionId: 'ing-123' };
  }
});

const invokeScoringAgent = createTool({
  name: 'invokeScoringAgent',
  description: 'Invokes the scoring agent to calculate campaign scores',
  schema: z.object({ campaignId: z.string() }),
  handler: async (input) => {
    return { status: 'scored', score: 85 };
  }
});

export const orchestratorAgent = createAgent({
  name: 'fundos-orchestrator',
  model: 'gemini-2.0-flash-001',
  system: 'You are the FundOS Orchestrator. Route tasks to the appropriate agents.',
  tools: [invokeIngestionAgent, invokeScoringAgent],
});

export async function handleNewCampaign(campaignId: string) {
  // Logic for FLOW: New Campaign Published
  console.log(`Orchestrating new campaign: ${campaignId}`);
  // In reality, this would use runAgent to decide steps
}
