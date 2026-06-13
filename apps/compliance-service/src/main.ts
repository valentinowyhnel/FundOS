import { createAgentServer } from '@fundos/runtime';

async function bootstrap() {
  const server = await createAgentServer({
    name: 'compliance-service',
  });

  // Basic route to avoid 404 on root
  server.get('/', async () => {
    return {
      status: 'ok',
      service: 'compliance-service',
      version: '1.0.0'
    };
  });

  await (server as any).start();
}

bootstrap().catch(err => {
  console.error('Failed to start compliance-service:', err);
  process.exit(1);
});
