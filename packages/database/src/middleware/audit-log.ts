import { Prisma } from '@prisma/client';
import { AsyncLocalStorage } from 'node:async_hooks';

export const traceStorage = new AsyncLocalStorage<{ traceId: string }>();

/**
 * Extracts traceId from Cloud Trace header.
 */
export function extractTraceId(header: string | undefined | string[]): string | undefined {
  if (!header) return undefined;
  const h = Array.isArray(header) ? header[0] : header;
  return h.split('/')[0];
}

/**
 * Prisma Extension for Audit Logging and Immutability.
 */
export const auditLogExtension = Prisma.defineExtension({
  name: 'auditLog',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const traceContext = traceStorage.getStore();
        const traceId = traceContext?.traceId;

        // --- Immutability Guard ---
        const immutableModels = ['AuditLog', 'EscrowTransaction'];
        const forbiddenOps = ['update', 'updateMany', 'delete', 'deleteMany', 'upsert'];

        if (immutableModels.includes(model) && forbiddenOps.includes(operation)) {
          throw new Error(`COMPLIANCE ERROR: ${model} is immutable. UPDATE and DELETE operations are strictly prohibited.`);
        }

        // Execute original query
        const result = await query(args);

        // --- Audit Logging ---
        // Critical entities: Investment, Campaign, ComplianceRecord, EscrowTransaction
        const criticalModels = ['Investment', 'Campaign', 'ComplianceRecord', 'EscrowTransaction'];
        const writeOps = ['create', 'update', 'upsert', 'createMany', 'updateMany'];

        if (criticalModels.includes(model) && writeOps.includes(operation)) {
          // Note: We use a fire-and-forget approach or separate transaction to avoid blocking main path
          // In this extension context, we need access to the base client to avoid recursion
          const client = Prisma.getExtensionContext(this) as any;

          try {
            // Determine action name
            let action = operation.toUpperCase();

            // Entity ID determination (simplified)
            let entityId = 'N/A';
            if (result && typeof result === 'object' && 'id' in result) {
              entityId = result.id;
            } else if (args.where && args.where.id) {
              entityId = args.where.id;
            }

            // Create Audit Log entry
            // We use the base client's auditLog model to avoid triggering this same extension recursively
            await client.$root.auditLog.create({
              data: {
                action,
                entity: model,
                entityId,
                traceId: traceId || null,
                changes: args.data || args.update || null,
              }
            });
          } catch (auditError) {
            console.error('FAILED TO WRITE AUDIT LOG:', auditError);
            // We don't throw here to avoid failing the main operation if logging fails
          }
        }

        return result;
      },
    },
  },
});
