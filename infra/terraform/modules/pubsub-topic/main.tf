resource "google_pubsub_topic" "topic" {
  name    = var.topic_name
  project = var.project_id
}
