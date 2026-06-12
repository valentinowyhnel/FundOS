import { z } from 'zod';

export const ProjectScoredEventSchema = z.object({
  projectId: z.string(),
  score: z.number().min(0).max(100),
  breakdown: z.record(z.number()),
  updatedAt: z.string().datetime(),
});

export type ProjectScoredEvent = z.infer<typeof ProjectScoredEventSchema>;
