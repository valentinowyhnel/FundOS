import Fastify from 'fastify';
import { authMiddleware } from '@fundos/auth';

const fastify = Fastify({
  logger: true,
});

// SSE Connections storage
const sseConnections = new Map<string, any>();

fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

fastify.get('/ready', async () => {
  return { status: 'ready' };
});

fastify.get('/stream', { preHandler: [authMiddleware] }, async (request, reply) => {
  const investorId = request.user?.investorId;
  if (!investorId) {
    reply.status(400).send({ error: 'Bad Request', message: 'Investor ID missing in token' });
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

  reply.raw.write('data: {"type":"connected"}\n\n');
});

// Proxy routes for agents
fastify.all('/agents/:agentName/*', { preHandler: [authMiddleware] }, async (request, reply) => {
  const { agentName } = request.params as { agentName: string };
  // Simple proxy implementation for now
  // In real implementation, would use fastify-reply-from or similar with circuit breaker
  return { message: `Proxying to ${agentName}`, path: request.url };
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
