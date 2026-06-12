import Fastify from 'fastify';
import { orchestratorAgent, handleNewCampaign } from './agent/agent.js';

const fastify = Fastify({ logger: true });

fastify.get('/health', async () => ({ status: 'ok', agent: orchestratorAgent.name }));

fastify.post('/orchestrate/campaign', async (request, reply) => {
  const { campaignId } = request.body as { campaignId: string };
  await handleNewCampaign(campaignId);
  return { status: 'orchestration_started', campaignId };
});

const start = async () => {
  try {
    await fastify.listen({ port: 8080, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
