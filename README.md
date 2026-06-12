# FundOS

Monorepo TypeScript — pnpm workspaces + Turborepo.

## Structure

- `apps/web-*` — frontends Next.js (founder, investor, admin)
- `apps/api-gateway` — point d'entrée public (NestJS + Fastify)
- `apps/agent-*`, `apps/orchestrator` — agents IA (matching, scoring, ingestion...)
- `apps/*-service` — services métier (campagnes, compliance, notifications, settlement)
- `packages/*` — code partagé (ui, database, auth, events, ai, blockchain...)
- `infra/` — Terraform, Docker, scripts
- `docs/` — architecture, ADR, runbooks

## Démarrage

```bash
pnpm install
pnpm dev
```

## Commandes

| Commande | Description |
| --- | --- |
| `pnpm dev` | Lance toutes les apps en mode dev |
| `pnpm build` | Build l'ensemble du monorepo (cache Turbo) |
| `pnpm check` | Lint + typecheck + tests |
| `pnpm format` | Formate le code avec Biome |
