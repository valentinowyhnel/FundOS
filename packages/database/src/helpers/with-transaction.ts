import { PrismaClient } from '@prisma/client';

/**
 * Transaction wrapper with retry logic for P2034 (Transaction failed due to a write conflict or a deadlock).
 */
export async function withTransaction<T>(
  prisma: PrismaClient,
  fn: (tx: any) => Promise<T>,
  retries = 3
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < retries; i++) {
    try {
      return await prisma.$transaction(fn);
    } catch (error: any) {
      lastError = error;
      if (error.code === 'P2034') {
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
        continue;
      }
      throw error;
    }
  }

  throw lastError;
}
