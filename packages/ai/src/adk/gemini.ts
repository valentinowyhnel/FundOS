import { VertexAI, GenerativeModel } from '@google-cloud/vertexai';

export interface GeminiConfig {
  project?: string;
  location?: string;
  model?: string;
}

export function createGeminiClient(config: GeminiConfig = {}): GenerativeModel {
  const project = config.project || process.env.GOOGLE_CLOUD_PROJECT;
  const location = config.location || process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
  const modelName = config.model || process.env.GEMINI_MODEL || 'gemini-2.0-flash-001';

  if (!project) {
    throw new Error('GOOGLE_CLOUD_PROJECT environment variable is required');
  }

  const vertexAI = new VertexAI({ project, location });
  return vertexAI.getGenerativeModel({ model: modelName });
}

export const DEFAULT_GEMINI_MODEL = 'gemini-2.0-flash-001';
