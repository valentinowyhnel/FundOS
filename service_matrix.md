| Service | Runtime | Port | Dockerfile | Start Command | Health Check | Required Vars/Secrets | Status |
|---------|---------|------|------------|---------------|--------------|-----------------------|--------|
| api-gateway | NestJS/Fastify | 8080 | Yes | node dist/main.js | GET /health | DATABASE_URL, JWT_SECRET, PubSub | Ready |
| agent-ingestion | ADK/Fastify | 8080 | Yes | node dist/main.js | GET /health | BigQuery, PubSub | Ready |
| agent-scoring | ADK/Fastify | 8080 | Yes | node dist/main.js | GET /health | BigQuery, PubSub | Ready |
| agent-investor-confidence | ADK/Fastify | 8080 | Yes | node dist/main.js | GET /health | BigQuery, PubSub | Ready |
| agent-market-research | ADK/Fastify | 8080 | Yes | node dist/main.js | GET /health | Vertex AI | Ready |
| agent-matching | ADK/Fastify | 8080 | Yes | node dist/main.js | GET /health | Vertex AI Vector Search | Ready |
| agent-profile | ADK/Fastify | 8080 | Yes | node dist/main.js | GET /health | DATABASE_URL | Ready |
| agent-recommendation | ADK/Fastify | 8080 | Yes | node dist/main.js | GET /health | PubSub | Ready |
| agent-investor-copilot | ADK/Fastify | 8080 | Yes | node dist/main.js | GET /health | Vertex AI | Ready |
| campaign-service | NestJS/Fastify | 8080 | Yes | node dist/main.js | GET /health (implicit) | DATABASE_URL | Needs Healthcheck |
| compliance-service | NestJS/Fastify | 8080 | Yes | node dist/main.js | GET /health (implicit) | DATABASE_URL | Needs Healthcheck |
| investor-service | NestJS/Fastify | 8080 | Yes | node dist/main.js | GET /health (implicit) | DATABASE_URL | Needs Healthcheck |
| notification-service | NestJS/Fastify | 8080 | Yes | node dist/main.js | GET /health (implicit) | Redis, PubSub | Needs Healthcheck |
| settlement-service | NestJS/Fastify | 8080 | Yes | node dist/main.js | GET /health (implicit) | DATABASE_URL, Blockchain | Needs Healthcheck |
| orchestrator | NestJS/Fastify | 8080 | Yes | node dist/main.js | GET /health | PubSub | Ready |
| web-founder | Next.js | 8080 | Yes | next start | GET / (homepage) | API_URL | Ready |
| web-investor | Next.js | 8080 | Yes | next start | GET / (homepage) | API_URL | Ready |
| web-admin | Next.js | 8080 | Yes | next start | GET / (homepage) | API_URL | Ready |
