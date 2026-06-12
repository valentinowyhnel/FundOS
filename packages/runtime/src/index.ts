import Fastify, { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import compress from '@fastify/compress';
import rateLimit from '@fastify/rate-limit';
import { logger } from '@fundos/logger';

export interface ServerConfig {
  name: string;
  port?: number;
}

export async function createAgentServer(config: ServerConfig): Promise<FastifyInstance> {
  const app = Fastify({
    logger: true,
  });

  const port = config.port || parseInt(process.env.PORT || '8080', 10);

  await app.register(helmet);
  await app.register(cors);
  await app.register(compress);
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  app.get('/health', async () => {
    return { status: 'ok', agent: config.name, timestamp: new Date().toISOString() };
  });

  app.get('/ready', async () => {
    return { status: 'ready' };
  });

  // Helper to start the server
  const start = async () => {
    try {
      await app.listen({ port, host: '0.0.0.0' });
      app.log.info(`Agent ${config.name} listening on port ${port}`);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  };

  // Attach start method to the instance for convenience
  (app as any).start = start;

  return app;
}
