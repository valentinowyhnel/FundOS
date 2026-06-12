# FundOS Platform Architecture & Conventions

This document defines the standards and conventions for the FundOS multi-agent platform.

## Architecture Overview

FundOS is a multi-agent platform where each agent is an independent service.

- **Runtime**: Google Cloud Run
- **Framework**: Google ADK (TypeScript) + Fastify (Transport)
- **Communication**: Pub/Sub (Async), HTTP (Sync Internal)
- **LLM**: Gemini (via Vertex AI)
- **Infrastructure**: Terraform

## Agent Structure

All agents follow a standard directory structure:

```
apps/agent-<name>/
  src/
    main.ts          # Entrypoint (Fastify server + ADK mount)
    agent/
      agent.ts       # ADK Agent definition
      prompts/       # System prompts
      schemas/       # Zod input/output schemas
      tools/         # ADK tool functions
      workflows/     # Agent logic/orchestration
  Dockerfile         # Cloud Run compatible
  package.json
  tsconfig.json
```

## Shared Packages

- `@fundos/ai`: Centralized Gemini client and ADK helpers.
- `@fundos/events`: Pub/Sub event envelopes and topic definitions.
- `@fundos/validation`: Base Zod schemas for agents.
- `@fundos/runtime`: Shared Fastify server configuration.

## Deployment

### ADK CLI

Deploy an agent directly using the ADK CLI:

```bash
adk deploy cloud_run \
  --project=$PROJECT_ID \
  --region=$LOCATION_ID \
  --service_name=agent-<name> \
  apps/agent-<name>
```

### Terraform

Durable infrastructure (Service Accounts, Pub/Sub topics) is managed via Terraform in `infra/terraform`.

## Development Flow

1. **Add a new agent**: Use the skeleton of an existing agent.
2. **Define schemas**: Update `src/agent/schemas/input.schema.ts` and `output.schema.ts`.
3. **Write prompt**: Update `src/agent/prompts/system.prompt.ts`.
4. **Implement tools**: Add functions in `src/agent/tools/`.
5. **Local development**: Run `pnpm dev` within the agent directory.

## Security

- Each agent has a dedicated Google Service Account.
- Secrets are managed via Secret Manager (no secrets in source code).
- IAM roles are assigned per agent following the principle of least privilege.
