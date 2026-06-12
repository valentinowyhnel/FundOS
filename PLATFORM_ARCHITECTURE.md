# FundOS Platform Architecture

## Overview

FundOS is a multi-agent fintech platform built on Google Cloud. All agents are autonomous services deployed on Cloud Run, communicate asynchronously via Pub/Sub, and share a consistent TypeScript + ADK implementation pattern.

**Target Stack:**
- **Framework:** Google Agent Development Kit (ADK) for TypeScript
- **Runtime:** Google Cloud Run (stateless, containerized)
- **LLM:** Gemini 2.0 on Google Cloud
- **Async:** Pub/Sub (topics + subscriptions)
- **IaC:** Terraform (infrastructure definitions)
- **Packaging:** Docker (multi-stage builds)
- **Security:** Secret Manager + per-service IAM

---

## Design Principles

### 1. Agent Autonomy
- Every agent is a **standalone Cloud Run service** deployable independently.
- Each agent has its own service account with least-privilege IAM.
- Agents communicate via structured Pub/Sub events and internal HTTP (for reads).

### 2. Async-First, Sync-Where-Needed
- **Event-driven workflows** use Pub/Sub for loose coupling.
- **Real-time queries** use internal gRPC or HTTP service-to-service calls.
- No direct database sharing; services access data through APIs or event cache.

### 3. TypeScript + ADK Consistency
- All agents follow the same folder structure and build pattern.
- ADK provides structured input/output, tool definitions, and workflow orchestration.
- Reusable agent logic sits in `/packages/adk-*` for sharing.

### 4. Security by Design
- **No hardcoded secrets.** All secrets loaded from Secret Manager at runtime.
- **Service account per agent.** Fine-grained IAM roles (Pub/Sub subscribe, Secret Manager read, Cloud SQL access, etc.).
- **Audit logging enabled** for all infrastructure changes (Terraform + Cloud Build).

### 5. Observability as Foundation
- **Structured logging** (JSON) with requestId/traceId propagation.
- **Health endpoints** (`/health`, `/ready`) for Kubernetes-style checks on Cloud Run.
- **Metrics and traces** hooks prepared for future Prometheus/Cloud Trace integration.

---

## Monorepo Structure

```
FundOS/
├── apps/
│   ├── agent-ingestion/
│   ├── agent-profile/
│   ├── agent-market-research/
│   ├── agent-scoring/
│   ├── agent-investor-confidence/
│   ├── agent-matching/
│   ├── agent-recommendation/
│   ├── agent-investor-copilot/
│   ├── api-gateway/           (public HTTP entry point)
│   ├── compliance-service/    (REST service for compliance checks)
│   ├── investor-service/      (REST service for investor data)
│   └── web-*/                 (Next.js, React frontends)
├── packages/
│   ├── adk-core/              (shared ADK runtime helpers)
│   ├── adk-schemas/           (Zod schemas for agent I/O)
│   ├── adk-tools/             (tool definitions and helpers)
│   ├── events/                (Pub/Sub event contracts)
│   ├── config/                (env validation, config loading)
│   ├── logger/                (structured logging)
│   ├── cloud/                 (GCP clients: Pub/Sub, Secret Manager)
│   ├── database/              (Prisma setup, DB utilities)
│   ├── auth/                  (authentication helpers)
│   ├── types/                 (shared TypeScript types)
│   └── ...
├── infrastructure/
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   ├── modules/
│   │   │   ├── cloud_run/    (Cloud Run service module)
│   │   │   ├── pubsub/       (Pub/Sub topics + subscriptions)
│   │   │   ├── secrets/      (Secret Manager IAM)
│   │   │   └── service_account/ (service account + IAM)
│   │   └── environments/
│   │       ├── dev.tfvars
│   │       ├── staging.tfvars
│   │       └── prod.tfvars
│   └── scripts/
│       ├── deploy-agent.sh
│       └── setup-secrets.sh
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json
└── .github/workflows/          (CI/CD for ADK + Terraform)
```

---

## Agent App Internal Structure

Each agent follows this template:

```
apps/agent-<name>/
├── src/
│   ├── agent.ts              (ADK agent definition, system prompt, tools)
│   ├── index.ts              (Cloud Run entry point, PORT listener)
│   ├── prompts/
│   │   └── system.prompt.ts   (system prompt template)
│   ├── schemas/
│   │   ├── input.schema.ts    (Zod input schema)
│   │   └── output.schema.ts   (Zod output schema)
│   ├── tools/
│   │   ├── index.ts
│   │   └── *.tool.ts          (individual tool definitions)
│   ├── workflows/
│   │   └── index.ts           (workflow orchestration, TODO comments)
│   ├── http/
│   │   ├── health.controller.ts      (health + readiness endpoints)
│   │   └── health.router.ts          (Express/Fastify routing)
│   ├── lib/
│   │   ├── env.ts             (environment variable validation)
│   │   ├── logger.ts          (logger initialization)
│   │   ├── clients.ts         (GCP clients: Pub/Sub, Secret Mgr)
│   │   └── metrics.ts         (metrics/observability hooks)
│   └── types/
│       └── index.ts           (agent-specific types)
├── Dockerfile                 (multi-stage, Cloud Run compatible)
├── package.json               (dependencies, build scripts)
├── tsconfig.json              (extends @fundos/tsconfig/adk.json)
├── .env.example               (required environment variables)
└── README.md                  (deployment instructions for this agent)
```

---

## Key Files & Patterns

### Agent Entry Point (`src/index.ts`)
```typescript
import { createServer } from 'http';
import { agent } from './agent';
import { healthRouter } from './http/health.router';
import { logger } from './lib/logger';

const PORT = process.env.PORT || 8080;

const server = createServer(async (req, res) => {
  // Health check routes
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }
  if (req.url === '/ready') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ready: true }));
    return;
  }
  
  // TODO: Setup ADK request routing
  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  logger.info(`Agent listening on port ${PORT}`);
});
```

### ADK Agent Definition (`src/agent.ts`)
```typescript
import { Agent } from '@google-cloud/adk';
import { inputSchema } from './schemas/input.schema';
import { outputSchema } from './schemas/output.schema';
import { systemPrompt } from './prompts/system.prompt';
import { tools } from './tools';

export const agent = new Agent({
  name: 'agent-<name>',
  description: 'TODO: agent description',
  systemPrompt,
  tools,
  model: 'gemini-2.0-flash', // or gemini-1.5-pro
  inputSchema,
  outputSchema,
});
```

### Environment Loading (`src/lib/env.ts`)
```typescript
import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.string().default('8080'),
  GCP_PROJECT_ID: z.string(),
  PUBSUB_TOPIC_PREFIX: z.string().default('fundos'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  GEMINI_API_KEY: z.string().optional(), // from Secret Manager if needed
});

export const env = EnvSchema.parse(process.env);
```

### Cloud Run Dockerfile
```dockerfile
# Multi-stage build for minimal final image
FROM node:20-alpine AS builder
WORKDIR /build
COPY pnpm-lock.yaml package.json ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build --filter=agent-<name>

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /build/apps/agent-<name>/dist ./dist
COPY --from=builder /build/apps/agent-<name>/package.json ./
RUN npm install --production

EXPOSE 8080
CMD ["node", "dist/index.js"]
```

---

## Pub/Sub Event Architecture

### Event Contracts

All events are published to Pub/Sub topics following this envelope:

```typescript
// packages/events/schemas.ts
export interface PubSubEvent<T = any> {
  eventType: string;      // e.g., 'project.ingested'
  aggregateId: string;    // project ID, investor ID, etc.
  aggregateType: string;  // 'Project', 'Investor', etc.
  version: number;        // event version for schema evolution
  timestamp: Date;
  correlationId: string;  // trace correlation
  causationId: string;    // causation chain
  data: T;
  metadata?: Record<string, string>;
}
```

### Standard Events

| Event | Publisher | Consumers | Purpose |
|-------|-----------|-----------|---------|
| `project.ingested` | agent-ingestion | agent-profile, agent-market-research | Project onboarded |
| `project.market-research.completed` | agent-market-research | agent-scoring | Market context added |
| `project.score.updated` | agent-scoring | agent-investor-confidence, agent-matching | Score changed |
| `project.confidence.updated` | agent-investor-confidence | agent-matching, agent-recommendation | Confidence computed |
| `investor.profile.updated` | agent-profile | agent-matching, agent-recommendation | Investor profile changed |
| `investor.matches.updated` | agent-matching | agent-recommendation | Matches computed |
| `investor.recommendations.updated` | agent-recommendation | api-gateway (push to UI) | Recommendations ready |

---

## Deployment Model

### Cloud Run Deployment Command

```bash
adk deploy cloud_run \
  --project=$GCP_PROJECT_ID \
  --region=$GCP_REGION \
  --service_name=agent-<name> \
  --memory=2Gi \
  --timeout=600 \
  --concurrency=10 \
  --set-env-vars="GCP_PROJECT_ID=$GCP_PROJECT_ID" \
  --service-account=$SERVICE_ACCOUNT_EMAIL \
  apps/agent-<name>
```

### Terraform-Driven Deployment

Infrastructure is defined in `infrastructure/terraform/`:

```hcl
# Example: Cloud Run service
resource "google_cloud_run_service" "agent_ingestion" {
  name     = "agent-ingestion"
  location = var.gcp_region

  template {
    spec {
      service_account_email = google_service_account.agent_ingestion.email
      containers {
        image = "${var.artifact_registry_url}/agent-ingestion:latest"
        env {
          name  = "GCP_PROJECT_ID"
          value = var.gcp_project_id
        }
        env {
          name = "GEMINI_API_KEY"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.gemini_key.id
              key  = "latest"
            }
          }
        }
      }
    }
  }
}
```

---

## Security Model

### Service Accounts
- **One per agent** (e.g., `agent-ingestion@$PROJECT.iam.gserviceaccount.com`)
- **Minimal IAM roles:**
  - `roles/pubsub.subscriber` (for Pub/Sub subscriptions)
  - `roles/pubsub.publisher` (if agent publishes events)
  - `roles/secretmanager.secretAccessor` (for Secret Manager secrets)
  - `roles/cloudsql.client` (if agent needs database access)

### Secrets Management
- All secrets stored in **Google Cloud Secret Manager**.
- Agents load secrets at startup (not baked into Docker image).
- Secret rotation: Update Secret Manager version, restart Cloud Run service (Terraform applies).

### Network
- Agents are **private by default** (not exposed to internet).
- **API Gateway** exposes public endpoints only.
- Internal service-to-service: VPC connector or private service connection (optional based on throughput).

---

## Local Development & Testing

### Local Agent Development
```bash
# Install dependencies
pnpm install

# Run agent locally
pnpm dev --filter=agent-<name>

# Runs on http://localhost:8080
# Test: curl http://localhost:8080/health
```

### Local Pub/Sub Emulator
```bash
# Start Pub/Sub emulator (Docker)
docker run -p 8085:8085 google/cloud-sdk gcloud beta emulators pubsub start --host-port 0.0.0.0:8085

# Set env var
export PUBSUB_EMULATOR_HOST=localhost:8085

# Agents will publish/subscribe locally
```

### Testing Agent Behavior
```bash
# Unit tests
pnpm test --filter=agent-<name>

# Integration tests (against Pub/Sub emulator)
pnpm test:integration --filter=agent-<name>

# Type checking
pnpm typecheck --filter=agent-<name>
```

---

## Observability & Monitoring

### Logging Standard
All agents use the shared logger from `@fundos/logger`:

```typescript
import { logger } from '@fundos/logger';

logger.info('Agent processing request', {
  requestId: req.id,
  correlationId: req.correlationId,
  agentName: 'agent-ingestion',
  duration: endTime - startTime,
});
```

### Health Endpoints
Every agent exposes:
- `GET /health` → `{ status: 'ok' }` (liveness probe)
- `GET /ready` → `{ ready: true }` (readiness probe)

### Metrics
- Request latency (p50, p99)
- Pub/Sub message lag
- Agent error rate
- Tool execution time (per tool)

(Prometheus/Cloud Monitoring integration prepared as TODO.)

---

## Naming Conventions

### Services
- Cloud Run services: `agent-<agent-name>` (lowercase, hyphens)
- Example: `agent-ingestion`, `agent-investor-confidence`

### Pub/Sub Topics
- Pattern: `fundos-<event-type>` (lowercase, hyphens)
- Example: `fundos-project-ingested`, `fundos-project-score-updated`

### Pub/Sub Subscriptions
- Pattern: `fundos-<event-type>-<consumer-agent>` (lowercase, hyphens)
- Example: `fundos-project-ingested-agent-profile`

### Service Accounts
- Pattern: `agent-<agent-name>@$PROJECT.iam.gserviceaccount.com`

### Secret Manager Secrets
- Pattern: `fundos-<agent-name>-<secret-name>` or `fundos-shared-<secret-name>`
- Examples: `fundos-shared-gemini-key`, `fundos-agent-ingestion-db-password`

---

## Next Steps: Agent-by-Agent Implementation

After this refactor, implement agents in this order:

1. **agent-ingestion** — Foundation for all others; normalizes input
2. **agent-profile** — Depends on investor data; enables matching
3. **agent-market-research** — Independent research task; no hard dependencies
4. **agent-scoring** — Depends on ingested + market research
5. **agent-investor-confidence** — Aggregates signals; depends on scoring
6. **agent-matching** — Depends on investor profile + project confidence
7. **agent-recommendation** — Depends on matching results
8. **agent-investor-copilot** — Reads outputs from other agents; final user interface

---

## References

- [Google ADK Documentation](https://cloud.google.com/docs/adk)
- [Cloud Run Best Practices](https://cloud.google.com/run/docs/concepts/quickstarts/build-and-deploy)
- [Pub/Sub Patterns](https://cloud.google.com/pubsub/docs/subscriber#architecture)
- [Terraform GCP Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
