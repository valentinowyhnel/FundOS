import { createAgentServer } from '@fundos/runtime';

async function bootstrap() {
  const server = await createAgentServer({
    name: 'onchain-listener',
  });

  // Basic route to avoid 404 on root
  server.get('/', async () => {
    return {
      status: 'ok',
      service: 'onchain-listener',
      version: '1.0.0'
    };
  });

  await (server as any).start();
}

bootstrap().catch(err => {
  console.error('Failed to start onchain-listener:', err);
  process.exit(1);
});
