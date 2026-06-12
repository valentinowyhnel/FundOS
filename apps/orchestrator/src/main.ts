import Fastify from 'fastify';
import { orchestratorAgent, handleNewCampaign, handleNewInvestment } from './agent/agent.js';

const AGENT_VERSION = process.env.AGENT_VERSION || 'orchestrator-v1.0.0';

const fastify = Fastify({
  logger: {
    formatters: {
      level: (label) => ({ level: label }),
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  },
});

fastify.get('/health', async () => ({
  status: 'ok',
  agent: orchestratorAgent.name,
  version: AGENT_VERSION,
  uptime: process.uptime(),
  timestamp: new Date().toISOString()
}));

fastify.get('/ready', async () => ({ status: 'ready' }));

fastify.post('/orchestrate/campaign', async (request, reply) => {
  const { campaignId } = request.body as { campaignId: string };
  const traceId = (request.headers['x-cloud-trace-context'] as string) || Math.random().toString(36).substring(2);

  fastify.log.info({ traceId, campaignId }, 'Starting campaign orchestration');
  const result = await handleNewCampaign(campaignId, traceId);

  return { status: 'orchestration_completed', campaignId, traceId, result };
});

fastify.post('/orchestrate/investment', async (request, reply) => {
  const { investmentId } = request.body as { investmentId: string };
  const traceId = (request.headers['x-cloud-trace-context'] as string) || Math.random().toString(36).substring(2);

  fastify.log.info({ traceId, investmentId }, 'Starting investment orchestration');
  const result = await handleNewInvestment(investmentId, traceId);

  return { status: 'orchestration_completed', investmentId, traceId, result };
});

const start = async () => {
  try {
    await fastify.listen({ port: 8080, host: '0.0.0.0' });
    fastify.log.info({ version: AGENT_VERSION }, 'Orchestrator started');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
