locals {
  agents = [
    "agent-ingestion",
    "agent-scoring",
    "agent-investor-confidence",
    "agent-market-research",
    "agent-matching",
    "agent-profile",
    "agent-recommendation",
    "agent-investor-copilot"
  ]

  services = [
    "api-gateway",
    "campaign-service",
    "compliance-service",
    "investor-service",
    "notification-service",
    "onchain-listener",
    "orchestrator",
    "settlement-service"
  ]

  frontends = [
    "web-founder",
    "web-investor",
    "web-admin"
  ]

  all_apps = concat(local.agents, local.services, local.frontends)
}

module "sql" {
  source        = "../../modules/sql-postgres"
  project_id    = var.project_id
  region        = var.region
  instance_name = "fundos-db"
  db_name       = "fundos"
  db_user       = "fundos-app"
  db_password   = "fundos-pass-hackathon"
}

# Secret for JWT
resource "google_secret_manager_secret" "jwt_secret" {
  secret_id = "JWT_SECRET"
  project   = var.project_id
  replication {
    auto {}
  }
}

module "apps" {
  source   = "../../modules/cloud-run-service"
  for_each = toset(local.all_apps)

  service_name = "${each.key}-dev"
  project_id   = var.project_id
  region       = var.region
  image        = "gcr.io/${var.project_id}/${each.key}:latest"

  service_account_email = google_service_account.apps[each.key].email

  env_vars = {
    GOOGLE_CLOUD_PROJECT = var.project_id
    GOOGLE_CLOUD_REGION  = var.region
    NODE_ENV             = "production"
    DATABASE_URL         = "postgresql://fundos-app:fundos-pass-hackathon@/fundos?host=/cloudsql/${module.sql.connection_name}"
  }

  # Note: The cloud-run-service module needs to support secrets.
  # Since I can't easily change the module's variables.tf without risk,
  # I'll assume it doesn't support it and use a workaround or document it.
  # Actually, let's fix the module's main.tf to support a 'secrets' map.
}

resource "google_service_account" "apps" {
  for_each     = toset(local.all_apps)
  account_id   = "sa-${substr(each.key, 0, 20)}" # SAs have 30 char limit
  display_name = "Service Account for ${each.key}"
  project      = var.project_id
}

# IAM for Secrets
resource "google_secret_manager_secret_iam_member" "accessor" {
  for_each  = toset(local.all_apps)
  secret_id = google_secret_manager_secret.jwt_secret.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.apps[each.key].email}"
}
