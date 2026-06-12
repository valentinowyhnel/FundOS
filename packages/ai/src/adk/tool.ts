import type { ZodSchema } from 'zod';

export interface ToolContext {
  logger?: any;
  traceId?: string;
  [key: string]: any;
}

export interface AdkTool<TInput = any, TOutput = any> {
  name: string;
  description: string;
  schema: ZodSchema<TInput>;
  handler: (input: TInput, ctx: ToolContext) => Promise<TOutput>;
  retries: number;
  timeout: number;
}

export function createTool<TInput, TOutput>(config: {
  name: string;
  description: string;
  schema: ZodSchema<TInput>;
  handler: (input: TInput, ctx: ToolContext) => Promise<TOutput>;
  retries?: number;     // default: 2
  timeout?: number;     // default: 5000ms
}): AdkTool<TInput, TOutput> {
  return {
    ...config,
    retries: config.retries ?? 2,
    timeout: config.timeout ?? 5000,
  };
}
