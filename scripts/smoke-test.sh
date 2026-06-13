#!/bin/bash
# Minimal smoke test script
set -e

SERVICES=(
  "api-gateway"
  "agent-ingestion"
  "agent-scoring"
  "agent-investor-confidence"
  "agent-market-research"
  "compliance-service"
  "agent-matching"
  "web-investor"
  "web-founder"
)

for service in "${SERVICES[@]}"; do
  echo "Testing $service..."
  URL=$(gcloud run services describe $service-dev --platform managed --region europe-west1 --format 'value(status.url)')
  if [ -z "$URL" ]; then
    echo "❌ Could not find URL for $service-dev"
    continue
  fi

  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$URL/health" || curl -s -o /dev/null -w "%{http_code}" "$URL")
  if [ "$RESPONSE" == "200" ]; then
    echo "✅ $service is healthy ($URL)"
  else
    echo "❌ $service failed with status $RESPONSE ($URL)"
  fi
done
