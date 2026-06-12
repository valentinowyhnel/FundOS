locals {
  agents = [
    "agent-ingestion",
    "agent-profile",
    "agent-market-research",
    "agent-scoring",
    "agent-investor-confidence",
    "agent-matching",
    "agent-recommendation",
    "agent-investor-copilot"
  ]

  topics = [
    "project-ingested",
    "project-market-research-completed",
    "project-score-updated",
    "project-confidence-updated",
    "investor-profile-updated",
    "investor-matches-updated",
    "investor-recommendations-updated"
  ]
}

# Cloud Run Services
module "agents" {
  source   = "../../modules/cloud-run-service"
  for_each = toset(local.agents)

  service_name = each.key
  project_id   = var.project_id
  region       = var.region
  image        = "gcr.io/${var.project_id}/${each.key}:latest"

  service_account_email = google_service_account.agents[each.key].email

  env_vars = {
    GOOGLE_CLOUD_PROJECT = var.project_id
    GOOGLE_CLOUD_REGION  = var.region
    NODE_ENV             = "production"
  }
}

# Service Accounts
resource "google_service_account" "agents" {
  for_each     = toset(local.agents)
  account_id   = each.key
  display_name = "Service Account for ${each.key}"
  project      = var.project_id
}

# Pub/Sub Topics
resource "google_pubsub_topic" "topics" {
  for_each = toset(local.topics)
  name     = each.key
  project  = var.project_id
}

# IAM Bindings for Secret Manager Access (Placeholder)
resource "google_project_iam_member" "secret_accessor" {
  for_each = toset(local.agents)
  project  = var.project_id
  role     = "roles/secretmanager.secretAccessor"
  member   = "serviceAccount:${google_service_account.agents[each.key].email}"
}

# IAM Bindings for Pub/Sub Publisher
resource "google_project_iam_member" "pubsub_publisher" {
  for_each = toset(local.agents)
  project  = var.project_id
  role     = "roles/pubsub.publisher"
  member   = "serviceAccount:${google_service_account.agents[each.key].email}"
}
