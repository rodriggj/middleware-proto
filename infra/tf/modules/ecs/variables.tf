variable "demo_app_cluster_name" {
  description = "ECS Cluster Name"
  type        = string
}

variable "availability_zones" {
  description = "us-east-1 AZs"
  type        = list(string)
}

variable "demo_app_task_family" {
  description = "ECS Task Family"
  type        = string
}

variable "ecr_repo_url" {
  description = "ECR Repo URL"
  type        = string
}

variable "container_port" {
  description = "Container Port"
  type        = string
}

variable "demo_app_task_mame" {
  description = "ECS Task Name"
  type        = string
}

variable "ecs_task_execution_role_name" {
  description = "ECS Task Execution Role Name"
  type        = string
}

variable "target_group_name" {
  description = "ECS Target Group Name"
  type = string
}

variable "demo_app_service_name" {
  description = "Service name"
  type = string
}

variable "application_load_balancer_name" {
  description = "Load Balancer name"
  type = string
}