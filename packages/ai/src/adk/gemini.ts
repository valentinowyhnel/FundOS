import { VertexAI, type GenerativeModel } from '@google-cloud/vertexai';

export const defaultGeminiModel = 'gemini-2.0-flash-001';
export const highReasoningModel = 'gemini-2.5-pro-preview-06-05';
export const DEFAULT_GEMINI_MODEL = 'gemini-2.0-flash-001';

export interface GeminiConfig {
  project?: string;
  location?: string;
  model?: string;
}

export function createGeminiClient(config: GeminiConfig = {}): GenerativeModel {
  const project = config.project || process.env.GOOGLE_CLOUD_PROJECT;
  const location = config.location || process.env.GOOGLE_CLOUD_LOCATION || process.env.GOOGLE_CLOUD_REGION || 'us-central1';
  const modelName = config.model || process.env.GEMINI_MODEL || defaultGeminiModel;

  if (!project) {
    throw new Error('GOOGLE_CLOUD_PROJECT environment variable is required');
  }

  const vertexAI = new VertexAI({ project, location });
  return vertexAI.getGenerativeModel({ model: modelName });
}
