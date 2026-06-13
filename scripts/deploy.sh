#!/bin/bash
set -e

PROJECT_ID="fundos-hackathon"
REGION="europe-west1"

echo "🚀 Starting deployment for FundOS..."

# 1. Enable APIs
echo "Step 1: Enabling Google Cloud APIs..."
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  artifactregistry.googleapis.com \
  aiplatform.googleapis.com \
  firestore.googleapis.com \
  compute.googleapis.com \
  iam.googleapis.com \
  --project=$PROJECT_ID

# 2. Infrastructure provisioning with Terraform
echo "Step 2: Provisioning infrastructure..."
terraform -chdir=infra/terraform/environments/dev init
terraform -chdir=infra/terraform/environments/dev apply -auto-approve

# 3. Create Secrets in Secret Manager
echo "Step 3: Configuring Secrets..."
JWT_SECRET=$(openssl rand -base64 32)
gcloud secrets create JWT_SECRET --replication-policy="automatic" --project=$PROJECT_ID || true
echo -n "$JWT_SECRET" | gcloud secrets versions add JWT_SECRET --data-file=- --project=$PROJECT_ID

# 4. Database migrations
echo "Step 4: Running database migrations..."
cd packages/database
# We use the Cloud SQL Auth proxy if running locally, or assume direct connectivity in Cloud Build
# For this script, we assume the environment has access to DATABASE_URL from TF outputs
npx prisma migrate deploy
npx prisma db seed
cd ../..

# 5. Build and Deploy all services via Cloud Build
echo "Step 5: Building and deploying services..."
gcloud builds submit --config=cloudbuild.yaml --project=$PROJECT_ID

echo "✅ Deployment completed successfully!"
