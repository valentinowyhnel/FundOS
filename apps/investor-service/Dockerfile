FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json turbo.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/investor-service/ ./apps/investor-service/
RUN npm install -g pnpm@10.12.1
RUN pnpm install --frozen-lockfile
RUN pnpm run build --filter="@fundos/investor-service"

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Some apps use dist/main.js, others next start
COPY --from=builder /app/apps/investor-service/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
CMD ["node", "dist/main.js"]
