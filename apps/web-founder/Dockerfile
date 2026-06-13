FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json turbo.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/web-founder/ ./apps/web-founder/
RUN npm install -g pnpm@10.12.1
RUN pnpm install --frozen-lockfile
RUN pnpm run build --filter="@fundos/web-founder"

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Some apps use dist/main.js, others next start
COPY --from=builder /app/apps/web-founder/.next ./apps/web-founder/.next
COPY --from=builder /app/apps/web-founder/public ./apps/web-founder/public
COPY --from=builder /app/apps/web-founder/package.json ./apps/web-founder/package.json
COPY --from=builder /app/node_modules ./node_modules
WORKDIR /app/apps/web-founder
EXPOSE 8080
CMD ["npx", "next", "start", "-p", "8080"]
