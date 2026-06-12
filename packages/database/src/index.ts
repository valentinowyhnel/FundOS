import { PrismaClient } from '@prisma/client';
import { softDeleteExtension } from './middleware/soft-delete.js';
import { auditLogExtension, traceStorage, extractTraceId } from './middleware/audit-log.js';

const basePrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const basePrismaReadonly = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_REPLICA_URL || process.env.DATABASE_URL,
    },
  },
});

// Important: Extensions should be applied to the client instance
export const prisma = basePrisma
  .$extends(softDeleteExtension)
  .$extends(auditLogExtension);

export const prismaReadonly = basePrismaReadonly
  .$extends(softDeleteExtension)
  .$extends(auditLogExtension);

export { traceStorage, extractTraceId };
export * from './helpers/paginate.js';
export * from './helpers/with-transaction.js';
// We export the types from @prisma/client
export * from '@prisma/client';
