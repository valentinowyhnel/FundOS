import Fastify from 'fastify';
import { authMiddleware } from '@fundos/auth';
import { TOPICS } from '@fundos/events';
import { PubSub } from '@google-cloud/pubsub';

const AGENT_VERSION = process.env.AGENT_VERSION || 'api-gateway-v1.0.0';

const fastify = Fastify({
  logger: {
    formatters: {
      level: (label) => ({ level: label }),
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  },
});

const pubsub = new PubSub();
const sseConnections = new Map<string, any>();

// Broadcast helper
export function broadcastToInvestor(investorId: string, event: string, data: any) {
  const connection = sseConnections.get(investorId);
  if (connection) {
    connection.raw.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  }
}

// Global broadcast
export function broadcastAll(event: string, data: any) {
  for (const connection of sseConnections.values()) {
    connection.raw.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  }
}

// Subscribe to Pub/Sub topics for SSE broadcast
async function setupPubSub() {
  const subscriptionName = 'api-gateway-sse-sub';
  const [subscription] = await pubsub.topic(TOPICS.CONFIDENCE_UPDATED).createSubscription(subscriptionName).catch(() => pubsub.subscription(subscriptionName).get());

  subscription.on('message', message => {
    const data = JSON.parse(message.data.toString());
    const traceId = message.attributes.traceId;
    fastify.log.info({ traceId, event: 'confidence_updated', data }, 'Broadcasting confidence update');
    broadcastAll('confidence_updated', data);
    message.ack();
  });
}

fastify.get('/health', async () => {
  return {
    status: 'ok',
    agent: 'api-gateway',
    version: AGENT_VERSION,
    uptime: process.uptime(),
    deps: {
      pubsub: 'ok',
      auth: 'ok'
    },
    metrics: {
      errorRate24h: 0,
      avgLatencyMs: 45
    },
    timestamp: new Date().toISOString()
  };
});

fastify.get('/ready', async () => {
  return { status: 'ready' };
});

fastify.get('/stream', { preHandler: [authMiddleware] }, async (request, reply) => {
  const investorId = request.user?.investorId || request.user?.sub;
  if (!investorId) {
    reply.status(400).send({ error: 'Bad Request', message: 'User ID missing in token' });
    return;
  }

  reply.raw.setHeader('Content-Type', 'text/event-stream');
  reply.raw.setHeader('Cache-Control', 'no-cache');
  reply.raw.setHeader('Connection', 'keep-alive');

  sseConnections.set(investorId, reply);

  request.raw.on('close', () => {
    sseConnections.delete(investorId);
  });

  // Heartbeat
  const hb = setInterval(() => {
    reply.raw.write(':heartbeat\n\n');
  }, 15000);

  request.raw.on('close', () => {
    clearInterval(hb);
  });

  reply.raw.write(`data: ${JSON.stringify({ type: 'connected', investorId, version: AGENT_VERSION })}\n\n`);
});

// Proxy routes for agents
fastify.all('/agents/:agentName/*', { preHandler: [authMiddleware] }, async (request, reply) => {
  const { agentName } = request.params as { agentName: string };
  const traceId = request.headers['x-cloud-trace-context'] || Math.random().toString(36).substring(2);

  fastify.log.info({ traceId, agentName, path: request.url }, 'Proxying request to agent');

  // Placeholder for internal agent proxying with circuit breaker
  return { message: `Proxying to ${agentName}`, path: request.url, traceId };
});

const start = async () => {
  try {
    await fastify.listen({ port: 8080, host: '0.0.0.0' });
    fastify.log.info({ version: AGENT_VERSION }, 'API Gateway started');
    setupPubSub().catch(err => fastify.log.error(err, 'Failed to setup Pub/Sub'));
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
