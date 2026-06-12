import { createAgentServer } from '@fundos/runtime';
import { agent } from './agent/agent';

async function bootstrap() {
  const server = await createAgentServer({
    name: 'agent-investor-confidence',
  });

  server.post('/invoke', async (request, reply) => {
    // TODO: Implement ADK agent invocation logic
    return { message: 'Agent agent-investor-confidence invoked' };
  });

  await (server as any).start();
}

bootstrap();
