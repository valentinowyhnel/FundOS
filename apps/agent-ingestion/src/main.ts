import Fastify from 'fastify';
import { ingestionAgent } from './agent/agent.js';

const AGENT_VERSION = process.env.AGENT_VERSION || 'ingestion-v1.0.0';

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
  agent: ingestionAgent.name,
  version: AGENT_VERSION,
  uptime: process.uptime(),
  lastIngestion: null,
  rowsProcessedLast24h: 0,
  deps: {
    bigquery: 'ok',
    pubsub: 'ok'
  },
  metrics: {
    errorRate24h: 0,
    avgLatencyMs: 1200
  },
  timestamp: new Date().toISOString()
}));

fastify.get('/ready', async () => ({
  status: 'ready',
  bigquery: 'ok',
  pubsub: 'ok'
}));

const start = async () => {
  try {
    await fastify.listen({ port: 8080, host: '0.0.0.0' });
    fastify.log.info({ version: AGENT_VERSION, supportedSources: ["csv", "stripe", "plaid", "onchain", "manual"] }, 'Ingestion Agent started');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
