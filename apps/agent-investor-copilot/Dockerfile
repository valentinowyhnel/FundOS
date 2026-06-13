FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json turbo.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/agent-investor-copilot/ ./apps/agent-investor-copilot/
RUN npm install -g pnpm@10.12.1
RUN pnpm install --frozen-lockfile
RUN pnpm run build --filter="@fundos/agent-investor-copilot"

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Some apps use dist/main.js, others next start
COPY --from=builder /app/apps/agent-investor-copilot/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
CMD ["node", "dist/main.js"]
