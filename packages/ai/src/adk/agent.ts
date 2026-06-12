import type { AdkTool } from './tool.js';

export interface AdkAgent {
  name: string;
  model: 'gemini-2.0-flash-001' | 'gemini-2.5-pro-preview-06-05';
  system: string;
  tools: AdkTool[];
  config: {
    temperature: number;
    maxOutputTokens: number;
    timeout: number;
  };
}

export function createAgent(config: {
  name: string;
  model: 'gemini-2.0-flash-001' | 'gemini-2.5-pro-preview-06-05';
  system: string;
  tools: AdkTool[];
  config?: { temperature?: number; maxOutputTokens?: number; timeout?: number; }
}): AdkAgent {
  return {
    ...config,
    config: {
      temperature: config.config?.temperature ?? 0.1,
      maxOutputTokens: config.config?.maxOutputTokens ?? 2048,
      timeout: config.config?.timeout ?? 10000,
    },
  };
}
