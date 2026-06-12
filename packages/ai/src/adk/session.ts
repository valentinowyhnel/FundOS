import type { AgentSession } from '@fundos/types';

export class SessionService {
  async get(sessionId: string): Promise<AgentSession | null> {
    // Backend: Firestore collection 'agent_sessions', TTL 24h
    // Stub for now, would use @google-cloud/firestore
    return null;
  }

  async set(sessionId: string, session: AgentSession, ttlSeconds: number = 86400): Promise<void> {
    // Stub
  }

  async delete(sessionId: string): Promise<void> {
    // Stub
  }
}
