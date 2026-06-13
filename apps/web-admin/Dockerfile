FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json turbo.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/web-admin/ ./apps/web-admin/
RUN npm install -g pnpm@10.12.1
RUN pnpm install --frozen-lockfile
RUN pnpm run build --filter="@fundos/web-admin"

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Some apps use dist/main.js, others next start
COPY --from=builder /app/apps/web-admin/.next ./apps/web-admin/.next
COPY --from=builder /app/apps/web-admin/public ./apps/web-admin/public
COPY --from=builder /app/apps/web-admin/package.json ./apps/web-admin/package.json
COPY --from=builder /app/node_modules ./node_modules
WORKDIR /app/apps/web-admin
EXPOSE 8080
CMD ["npx", "next", "start", "-p", "8080"]
