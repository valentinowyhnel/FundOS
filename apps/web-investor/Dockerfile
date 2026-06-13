FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json turbo.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/web-investor/ ./apps/web-investor/
RUN npm install -g pnpm@10.12.1
RUN pnpm install --frozen-lockfile
RUN pnpm run build --filter="@fundos/web-investor"

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Some apps use dist/main.js, others next start
COPY --from=builder /app/apps/web-investor/.next ./apps/web-investor/.next
COPY --from=builder /app/apps/web-investor/public ./apps/web-investor/public
COPY --from=builder /app/apps/web-investor/package.json ./apps/web-investor/package.json
COPY --from=builder /app/node_modules ./node_modules
WORKDIR /app/apps/web-investor
EXPOSE 8080
CMD ["npx", "next", "start", "-p", "8080"]
