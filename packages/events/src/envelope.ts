import { z } from 'zod';
import * as nodeCrypto from 'node:crypto';

export const EventEnvelopeSchema = z.object({
  id: z.string().uuid(),
  source: z.string(),
  type: z.string(),
  subject: z.string().optional(),
  time: z.string().datetime(),
  data: z.any(),
  datacontenttype: z.string().default('application/json'),
  specversion: z.string().default('1.0'),
});

export type EventEnvelope<T = any> = z.infer<typeof EventEnvelopeSchema> & {
  data: T;
};

export function createEventEnvelope<T>(params: {
  source: string;
  type: string;
  subject?: string;
  data: T;
}): EventEnvelope<T> {
  return {
    id: nodeCrypto.randomUUID(),
    source: params.source,
    type: params.type,
    subject: params.subject,
    time: new Date().toISOString(),
    data: params.data,
    datacontenttype: 'application/json',
    specversion: '1.0',
  };
}
