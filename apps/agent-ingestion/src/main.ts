import { createAgentServer } from '@fundos/runtime';
import { agent } from './agent/agent';

async function bootstrap() {
  const server = await createAgentServer({
    name: 'agent-ingestion',
  });

  // Mount ADK agent or other routes here
  server.post('/invoke', async (request, reply) => {
    // TODO: Implement ADK agent invocation logic
    return { message: 'Agent ingestion invoked' };
  });

  await (server as any).start();
}

bootstrap();
