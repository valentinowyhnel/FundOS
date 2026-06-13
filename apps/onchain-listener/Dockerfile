FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json turbo.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/onchain-listener/ ./apps/onchain-listener/
RUN npm install -g pnpm@10.12.1
RUN pnpm install --frozen-lockfile
RUN pnpm run build --filter="@fundos/onchain-listener"

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Some apps use dist/main.js, others next start
COPY --from=builder /app/apps/onchain-listener/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
CMD ["node", "dist/main.js"]
