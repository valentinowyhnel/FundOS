resource "google_cloud_run_v2_service" "default" {
  name     = var.service_name
  location = var.region
  project  = var.project_id

  template {
    service_account = var.service_account_email
    containers {
      image = var.image
      ports {
        container_port = 8080
      }
      dynamic "env" {
        for_each = var.env_vars
        content {
          name  = env.key
          value = env.value
        }
      }
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}

variable "service_name" { type = string }
variable "region" { type = string }
variable "project_id" { type = string }
variable "image" { type = string }
variable "service_account_email" { type = string }
variable "env_vars" {
  type    = map(string)
  default = {}
}

output "service_url" {
  value = google_cloud_run_v2_service.default.uri
}
