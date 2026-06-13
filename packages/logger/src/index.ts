import pino from "pino";

export const createLogger = (service: string) =>
  pino({
    name: service,
    level: process.env.LOG_LEVEL ?? "info",
    formatters: {
      level: (label) => ({ severity: label.toUpperCase() }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  });

export type Logger = ReturnType<typeof createLogger>;

// Default logger
export const logger = createLogger(process.env.SERVICE_NAME || 'fundos-service');
