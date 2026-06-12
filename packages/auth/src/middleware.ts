import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { verifyJwt } from './jwt.js';

declare module 'fastify' {
  interface FastifyRequest {
    user?: import('./jwt.js').JwtPayload;
  }
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    reply.status(401).send({ error: 'Unauthorized', message: 'Missing or invalid token' });
    return;
  }

  const token = authHeader.substring(7);

  try {
    const payload = await verifyJwt(token);
    request.user = payload;
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized', message: 'Invalid token' });
  }
}

export function isRole(role: 'investor' | 'founder' | 'admin') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.user?.role !== role) {
      reply.status(403).send({ error: 'Forbidden', message: `Insufficient permissions. Required role: ${role}` });
    }
  };
}

export const isInvestor = isRole('investor');
export const isFounder = isRole('founder');
export const isAdmin = isRole('admin');
