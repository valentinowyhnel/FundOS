import { VertexAI, type GenerativeModel } from '@google-cloud/vertexai';

export const defaultGeminiModel = 'gemini-2.0-flash-001';
export const highReasoningModel = 'gemini-2.5-pro-preview-06-05';

export function createGeminiClient(opts?: {
  project?: string;    // default: process.env.GOOGLE_CLOUD_PROJECT
  region?: string;     // default: process.env.GOOGLE_CLOUD_REGION ?? 'us-central1'
  model?: string;      // default: 'gemini-2.0-flash-001'
}): GenerativeModel {
  const project = opts?.project ?? process.env.GOOGLE_CLOUD_PROJECT;
  const region = opts?.region ?? process.env.GOOGLE_CLOUD_REGION ?? 'us-central1';
  const model = opts?.model ?? defaultGeminiModel;

  if (!project) {
    throw new Error('GOOGLE_CLOUD_PROJECT is not defined');
  }

  const vertexAI = new VertexAI({ project, location: region });
  return vertexAI.getGenerativeModel({ model });
}
