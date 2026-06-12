# Use official Node.js image
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pnpm install --frozen-lockfile
RUN pnpm run build --filter=@fundos/agent-profile...

FROM base AS runtime
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app

EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

CMD [ "pnpm", "start", "--filter=@fundos/agent-profile" ]
