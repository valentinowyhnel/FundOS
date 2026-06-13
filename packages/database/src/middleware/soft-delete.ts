import { Prisma } from '@prisma/client';

/**
 * Prisma Extension for Soft Delete.
 * Automatically filters out records where deletedAt is not null.
 * Converts delete/deleteMany operations into updates that set deletedAt.
 */
export const softDeleteExtension = Prisma.defineExtension({
  name: 'softDelete',
  model: {
    $allModels: {
      // Logic moved to query level
    },
  },
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const modelsWithSoftDelete = ['User', 'Campaign', 'Document'];

        if (!modelsWithSoftDelete.includes(model)) {
          return query(args);
        }

        // --- Read Operations ---
        if (operation === 'findMany' || operation === 'findFirst' || operation === 'count') {
          (args as any).where = { ...(args as any).where, deletedAt: null };
        }

        if (operation === 'findUnique') {
          // findUnique doesn't allow adding where: { deletedAt: null } because it requires unique fields.
          // We convert it to findFirst which does allow it.
          const findFirstResult = await (Prisma.getExtensionContext(this) as any).findFirst({
            ...(args as any),
            where: { ...(args as any).where, deletedAt: null },
          });
          return findFirstResult;
        }

        // --- Write Operations ---
        if (operation === 'delete') {
          return (Prisma.getExtensionContext(this) as any).update({
            ...(args as any),
            data: { deletedAt: new Date() },
          });
        }

        if (operation === 'deleteMany') {
          return (Prisma.getExtensionContext(this) as any).updateMany({
            ...(args as any),
            data: { deletedAt: new Date() },
          });
        }

        return query(args);
      },
    },
  },
});
