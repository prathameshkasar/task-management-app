# Task Management Application – End-to-End DevOps CI/CD Project

## 1. Project Overview

This project demonstrates an end-to-end DevOps CI/CD pipeline for a Task Management web application using Jenkins, GitHub, Maven, Docker, Docker Hub and Kubernetes.

The main objective is to automate the complete application delivery process, starting from source code management to application deployment on a Kubernetes cluster.

Whenever a developer pushes code changes to the GitHub repository, GitHub Webhook can trigger Jenkins. Jenkins checks out the source code, builds the application using Maven, runs tests, creates a Docker image, pushes the image to Docker Hub and deploys the application to a Kubernetes cluster.

The project also covers Jenkins pipeline automation, credentials management, build retention, artifact archiving, error handling, deployment verification, troubleshooting and backup and restore.

## 2. Project Objectives

- Automate application build and deployment using Jenkins.
- Integrate Jenkins with GitHub.
- Configure GitHub Webhook for automatic pipeline triggering.
- Build the Spring Boot application using Maven.
- Create Docker images using a Dockerfile.
- Push Docker images to Docker Hub.
- Deploy the application on Kubernetes using Minikube.
- Implement Kubernetes Deployment and Service.
- Configure application health checks using Kubernetes probes.
- Manage Jenkins credentials securely.
- Implement pipeline error handling, retry and timeout.
- Archive build artifacts.
- Configure workspace cleanup and build retention.
- Implement Jenkins backup and restore.
- Understand and troubleshoot common DevOps and Kubernetes issues.

## 3. Project Architecture

The project uses the following architecture:

GitHub → Jenkins Controller → Jenkins Agent → Maven Build → Docker Image → Docker Hub → Kubernetes Deployment → Application Running

### Architecture Components

| Component | Purpose |
|---|---|
| AWS EC2 | Provides cloud infrastructure |
| Jenkins Controller | Manages Jenkins jobs and pipeline execution |
| Jenkins Agent | Executes build, test, Docker and deployment operations |
| GitHub | Stores application source code and Jenkinsfile |
| GitHub Webhook | Notifies Jenkins about repository changes |
| Java 21 | Application development and execution |
| Maven | Builds and packages the Spring Boot application |
| Docker | Creates application container images |
| Docker Hub | Stores Docker images |
| Kubernetes | Manages application deployment and Pods |
| Minikube | Provides a local Kubernetes cluster on the Jenkins Agent |
| kubectl | Communicates with Kubernetes cluster |

## 4. Technology Stack

| Technology | Version / Configuration |
|---|---|
| Operating System | Ubuntu 24.04 |
| Cloud Platform | AWS |
| Compute | Amazon EC2 |
| Jenkins | 2.580.2 |
| Java | 21 |
| Maven | 3.9.16 |
| Git | Git |
| Docker | 29.9.2 |
| Docker Compose | 5.6.1 |
| Kubernetes | Minikube |
| Minikube | 1.38.1 |
| kubectl | 1.36.4 |
| Kubernetes Cluster Version | v1.35.1 |
| Application Framework | Spring Boot 3.5.7 |

*Versions represent the environment used during this project. Your installed versions may differ if the infrastructure is updated.*

## 5. AWS Infrastructure

The project uses two EC2 instances.

### Jenkins Controller EC2

| Configuration | Details |
|---|---|
| Operating System | Ubuntu 24.04 |
| Instance Type | t3.small |
| Private IP | 172.31.32.158 |
| Jenkins Port | 8080 |
| Jenkins Home Directory | /var/lib/jenkins |
| Jenkins Service | jenkins |

Jenkins Controller responsibilities:

- Manage Jenkins jobs.
- Manage pipeline execution.
- Connect with GitHub.
- Manage Jenkins credentials.
- Schedule and coordinate pipeline execution.
- Display pipeline build history and Console Output.

### Jenkins Agent EC2

| Configuration | Details |
|---|---|
| Operating System | Ubuntu |
| Instance Type | c7i-flex.large |
| Private IP | 172.31.32.84 |
| Jenkins Agent Label | linux-agent |
| Java | 21 |
| Maven | 3.9.16 |
| Docker | Installed |
| kubectl | Installed |
| Minikube | Installed |

Jenkins Agent responsibilities:

- Execute Jenkins pipeline stages.
- Download application source code.
- Build the application using Maven.
- Run application tests.
- Create Docker images.
- Push Docker images to Docker Hub.
- Execute Kubernetes deployment commands.
- Verify application deployment.

## 6. GitHub Repository

Repository Name:

task-management-app

GitHub Repository:

https://github.com/prathameshkasar/task-management-app

Main Branch:

main

The repository contains application source code, Dockerfile, Kubernetes manifests and Jenkinsfile.

### Repository Structure

```text
task-management-app/
│
├── Jenkinsfile
│
├── Dockerfile
│
├── .gitignore
│
├── README.md
│
├── backend/
│   │
│   ├── pom.xml
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/taskmanager/
│   │   │   │       ├── TaskManagerApplication.java
│   │   │   │       ├── controller/
│   │   │   │       ├── model/
│   │   │   │       └── service/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── static/
│   │   │           ├── index.html
│   │   │           ├── style.css
│   │   │           └── script.js
│   │   │
│   │   └── test/
│   │
│   └── target/
│
└── k8s/
    ├── deployment.yaml
    └── service.yaml
```

Note: The `backend/target/` directory is generated during the Maven build and is excluded from Git using `.gitignore`.

## 7. Application Details

The project uses a Spring Boot application for Task Management.

### Application Features

- Create a new task.
- View all tasks.
- View an individual task.
- Update an existing task.
- Delete a task.
- Manage task status.

### Application Technology

- Java 21
- Spring Boot 3.5.7
- Maven
- REST API
- HTML
- CSS
- JavaScript

### REST API Endpoints

| HTTP Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/tasks | Retrieve all tasks |
| GET | /api/tasks/{id} | Retrieve task by ID |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |

### Application Port

8080

### Important Application Note

The current application uses in-memory storage through an ArrayList.

This means tasks are not permanently stored in a database. When the application restarts, existing task data may be lost.

Database persistence is not configured in this project.

## 8. Jenkins Installation and Configuration

Jenkins is installed on the Controller EC2 instance.

Jenkins URL:

http://<controller-public-ip>:8080

Jenkins Home:

/var/lib/jenkins

Check Jenkins service:

```bash
sudo systemctl status jenkins
```

Start Jenkins:

```bash
sudo systemctl start jenkins
```

Restart Jenkins:

```bash
sudo systemctl restart jenkins
```

Check Jenkins logs:

```bash
sudo journalctl -u jenkins -n 50 --no-pager
```

Check Jenkins listening port:

```bash
sudo ss -lntp | grep 8080
```

## 9. Jenkins Agent Configuration

The Jenkins Agent is configured with the label:

linux-agent

The main pipeline uses this label to execute its stages on the Agent.

Jenkinsfile configuration:

```groovy
pipeline {
    agent {
        label 'linux-agent'
    }

    stages {
        stage('Check Agent') {
            steps {
                sh 'hostname'
            }
        }
    }
}
```

The Agent is responsible for application build, testing, Docker image creation, image push and Kubernetes deployment.

## 10. GitHub Integration and Webhook

The Jenkins pipeline is integrated with the GitHub repository.

### Webhook Configuration

Payload URL:

http://<controller-public-ip>:8080/github-webhook/

Content Type:

application/json

Events:

Push events

In Jenkins job configuration, the following option is enabled:

GitHub hook trigger for GITScm polling

### Webhook Workflow

1. Developer makes changes to application source code.
2. Developer commits and pushes changes to GitHub.
3. GitHub sends a webhook notification to Jenkins.
4. Jenkins receives the notification.
5. Jenkins triggers the configured pipeline when the repository change matches the job configuration.
6. Jenkins checks out the updated source code.
7. Pipeline execution begins.

Webhook delivery was successfully verified after correcting the Jenkins Controller Security Group rules.

Important: The Controller public IP can change when an EC2 instance is stopped and started. Update the webhook URL if the public IP changes.

For production environments, use HTTPS and appropriate webhook authentication and source restrictions.

## 11. Jenkins Pipeline Implementation

The main Jenkins job is:

Task-Management-Pipeline

Pipeline Type:

Pipeline from SCM

SCM:

Git

Repository:

https://github.com/prathameshkasar/task-management-app.git

Branch:

*/main

Script Path:

Jenkinsfile

The Jenkinsfile is stored in the root directory of the GitHub repository.

### Pipeline Stages

The pipeline includes the following stages:

#### Stage 1: Checkout

- Downloads source code from GitHub.
- Checks the current Git commit.
- Verifies project files.

#### Stage 2: Show Environment

Checks the build environment:

- Java version.
- Maven version.
- Git version.
- Docker version.
- kubectl version.
- Agent hostname.

#### Stage 3: Build

Builds the Spring Boot application using Maven.

Command:

```bash
mvn -B -f backend/pom.xml clean compile
```

#### Stage 4: Test

Executes Maven tests.

Command:

```bash
mvn -B -f backend/pom.xml test
```

JUnit reports are collected from:

```text
backend/target/surefire-reports/
```

#### Stage 5: Package

Packages the application and generates the JAR file.

Command:

```bash
mvn -B -f backend/pom.xml package -DskipTests
```

Generated JAR:

```text
backend/target/task-manager-1.0.0.jar
```

#### Stage 6: Verify Credentials

Checks the availability of Docker Hub credentials stored in Jenkins.

Credential ID:

dockerhub-credentials

Credentials are accessed using Jenkins `withCredentials`.

Passwords and tokens are not printed in the Console Output.

#### Stage 7: Build Docker Image

Creates the Docker image.

Command:

```bash
docker build -t task-management-app:${BUILD_NUMBER} .
```

The image tag uses the Jenkins build number.

#### Stage 8: Push Docker Image

Authenticates with Docker Hub using Jenkins credentials.

Tags and pushes the image:

```text
<dockerhub-username>/task-management-app:<build-number>
```

Docker login uses `--password-stdin` to avoid exposing the token in the command line.

#### Stage 9: Deploy to Development

This stage deploys the application to the existing Minikube Kubernetes cluster when:

```text
DEPLOY_ENV = dev
```

The pipeline performs the following operations:

1. Applies Kubernetes Deployment.
2. Applies Kubernetes Service.
3. Updates the Deployment image with the current Jenkins build number.
4. Waits for Kubernetes rollout.
5. Checks Deployments.
6. Checks Pods.
7. Checks Services and endpoints.
8. Tests the application API.

Important commands:

```bash
kubectl apply -f k8s/deployment.yaml

kubectl apply -f k8s/service.yaml
```

Update image:

```bash
kubectl set image deployment/task-management-app \
task-management-app=<dockerhub-username>/task-management-app:<build-number>
```

Check rollout:

```bash
kubectl rollout status deployment/task-management-app
```

#### Stage 10: Deploy to Staging

Staging is currently a placeholder.

A separate staging environment has not been configured.

#### Stage 11: Deploy to Production

Production is currently a placeholder.

A separate production environment has not been configured.

#### Stage 12: Archive Artifacts

Archives the generated JAR file in Jenkins.

Command:

```groovy
archiveArtifacts(
    artifacts: 'backend/target/*.jar',
    fingerprint: true
)
```

#### Post Conditions

The Jenkinsfile implements:

- success
- unstable
- failure
- always

Workspace cleanup is performed using:

```groovy
cleanWs()
```

## 12. Jenkins Pipeline Features Implemented

| Jenkins Feature | Implementation |
|---|---|
| Declarative Pipeline | Jenkinsfile |
| Agent selection | linux-agent |
| Pipeline from SCM | GitHub repository |
| Environment variables | environment block |
| Build parameters | DEPLOY_ENV |
| Conditional execution | when |
| Parallel stages | Covered in pipeline practicals |
| Post conditions | success, failure, unstable, always |
| Error handling | try/catch |
| Retry | Docker Hub push |
| Timeout | Pipeline and deployment timeout |
| Credentials | withCredentials |
| Artifact archiving | archiveArtifacts |
| Workspace cleanup | cleanWs |
| Build retention | buildDiscarder |
| GitHub Webhook | Push event trigger |
| Docker image creation | docker build |
| Docker image push | docker push |
| Kubernetes deployment | kubectl apply and set image |
| Deployment verification | kubectl rollout status |
| Troubleshooting | Pod descriptions and Kubernetes events |

## 13. Docker Configuration

The project uses the following Dockerfile:

```dockerfile
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY backend/target/task-manager-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Dockerfile Explanation

FROM:

Uses the Java 21 runtime image.

WORKDIR:

Creates and selects the application working directory.

COPY:

Copies the generated Spring Boot JAR into the image.

EXPOSE:

Documents the application port 8080.

ENTRYPOINT:

Starts the Spring Boot application when the container runs.

### Build Docker Image Manually

```bash
docker build -t task-management-app:test .
```

### Check Docker Images

```bash
docker images
```

### Run Container Manually

```bash
docker run -d -p 8080:8080 \
--name task-management-test \
task-management-app:test
```

### Check Container

```bash
docker ps
```

### View Container Logs

```bash
docker logs task-management-test
```

## 14. Docker Hub Integration

Docker Hub is used to store the application's Docker images.

Repository:

```text
<dockerhub-username>/task-management-app
```

Image naming convention:

```text
<dockerhub-username>/task-management-app:<build-number>
```

Example:

```text
prathameshkasar/task-management-app:12
```

The Jenkins pipeline creates a new image tag using the Jenkins build number.

This makes it easier to identify which application build is deployed.

## 15. Kubernetes Deployment

The application is deployed on the existing Minikube cluster running on Jenkins Agent EC2.

### Kubernetes Components

1. Deployment
2. Pods
3. Service
4. NodePort

### Deployment Configuration

File:

```text
k8s/deployment.yaml
```

Deployment name:

```text
task-management-app
```

Container name:

```text
task-management-app
```

Replicas:

2

Container Port:

8080

The Deployment includes:

- CPU and memory requests.
- CPU and memory limits.
- Startup probe.
- Liveness probe.
- Readiness probe.

### Service Configuration

File:

```text
k8s/service.yaml
```

Service name:

```text
task-management-service
```

Service Type:

NodePort

Service Port:

8080

Target Port:

8080

NodePort:

30080

### Kubernetes Commands

Check Minikube:

```bash
minikube status
```

Start Minikube if stopped:

```bash
minikube start --driver=docker
```

Check Nodes:

```bash
kubectl get nodes
```

Check Deployments:

```bash
kubectl get deployments
```

Check Pods:

```bash
kubectl get pods
```

Check Services:

```bash
kubectl get services
```

Check rollout:

```bash
kubectl rollout status deployment/task-management-app
```

Check Deployment image:

```bash
kubectl get deployment task-management-app \
-o jsonpath='{.spec.template.spec.containers[0].image}'
```

## 16. Application Access

The application is exposed using a Kubernetes NodePort Service.

Minikube NodePort:

```text
30080
```

Application API:

```text
http://192.168.49.2:30080/api/tasks
```

The application was also accessed from Windows using SSH tunnelling and Kubernetes port forwarding.

### Step 1: Start port forwarding on Jenkins Agent

```bash
kubectl port-forward service/task-management-service 8081:8080
```

### Step 2: Open another Windows PowerShell terminal

Use the Agent's current public IP and correct SSH key:

```powershell
ssh -i CDC.pem -L 8081:127.0.0.1:8081 ubuntu@<agent-public-ip>
```

### Step 3: Open Browser

```text
http://localhost:8081/
```

Both the port-forwarding terminal and SSH tunnel must remain running while accessing the application.

## 17. Kubernetes Health Checks

The Deployment includes three probes.

### Startup Probe

Checks whether the application has started successfully.

### Liveness Probe

Checks whether the application is still running properly.

### Readiness Probe

Checks whether the application is ready to receive traffic.

These probes help Kubernetes identify application startup and health problems.

## 18. Kubernetes Troubleshooting

### Problem: ImagePullBackOff

Possible reasons:

- Incorrect Docker Hub username.
- Incorrect image name.
- Incorrect image tag.
- Image does not exist.
- Private repository authentication issue.
- Docker Hub connectivity or rate-limit issue.

Check Pods:

```bash
kubectl get pods
```

Describe Pod:

```bash
kubectl describe pod <pod-name>
```

Check events:

```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

Check Deployment image:

```bash
kubectl get deployment task-management-app \
-o jsonpath='{.spec.template.spec.containers[0].image}'
```

Check image availability:

```bash
docker manifest inspect <dockerhub-username>/task-management-app:<tag>
```

Solution:

- Correct the image name or tag.
- Ensure the image exists in Docker Hub.
- Check whether image push succeeded.
- Configure Kubernetes image pull credentials if the repository is private.

### Problem: CrashLoopBackOff

Check Pod:

```bash
kubectl get pods
```

Check logs:

```bash
kubectl logs <pod-name>
```

Check previous container logs:

```bash
kubectl logs <pod-name> --previous
```

Describe Pod:

```bash
kubectl describe pod <pod-name>
```

### Problem: Pod Pending

Check:

```bash
kubectl describe pod <pod-name>
```

Check Nodes:

```bash
kubectl get nodes
```

Check resources:

```bash
kubectl describe node
```

### Problem: Deployment Rollout Failed

Check:

```bash
kubectl rollout status deployment/task-management-app
```

Check:

```bash
kubectl describe deployment task-management-app
```

Rollback if the previous version was working:

```bash
kubectl rollout undo deployment/task-management-app
```

### Problem: Service Not Accessible

Check:

```bash
kubectl get services
```

Check Service details:

```bash
kubectl describe service task-management-service
```

Check endpoints:

```bash
kubectl get endpoints task-management-service
```

Test API:

```bash
curl http://192.168.49.2:30080/api/tasks
```

## 19. Jenkins Backup and Restore

Jenkins home directory:

```text
/var/lib/jenkins
```

Backup directory:

```text
/var/backups/jenkins
```

### Create Backup Directory

```bash
sudo mkdir -p /var/backups/jenkins
```

### Stop Jenkins

```bash
sudo systemctl stop jenkins
```

### Create Jenkins Backup

```bash
sudo tar --acls --xattrs -czpf \
/var/backups/jenkins/jenkins-backup-$(date +%F-%H%M).tar.gz \
-C /var/lib jenkins
```

### Start Jenkins

```bash
sudo systemctl start jenkins
```

### Verify Backup

```bash
sudo ls -lh /var/backups/jenkins/
```

### Check Backup Contents

```bash
sudo tar -tzf /var/backups/jenkins/jenkins-backup-*.tar.gz | head -20
```

### Restore Test

Create temporary directory:

```bash
sudo mkdir -p /tmp/jenkins-restore-test
```

Extract backup:

```bash
sudo tar --acls --xattrs -xzpf \
/var/backups/jenkins/jenkins-backup-<date>.tar.gz \
-C /tmp/jenkins-restore-test
```

Verify restored files:

```bash
sudo ls -l /tmp/jenkins-restore-test/jenkins/
```

Remove temporary restore directory:

```bash
sudo rm -rf /tmp/jenkins-restore-test
```

Important:

- Jenkins backups contain sensitive information.
- Do not upload backup files to GitHub.
- Store a separate secure copy outside the Controller EC2.
- Actual disaster recovery requires restoring the backup to a compatible Jenkins installation with correct ownership, permissions and secrets.

## 20. General DevOps Troubleshooting Commands

### Linux

```bash
free -h
df -h
top
ps aux
sudo ss -lntp
sudo systemctl status <service>
sudo journalctl -u <service> -n 50
```

### Git

```bash
git status
git branch
git remote -v
git log --oneline
git diff --check
```

### Java and Maven

```bash
java -version
javac -version
mvn -version
mvn clean package
```

### Docker

```bash
docker info
docker ps
docker ps -a
docker images
docker logs <container-id>
```

### Kubernetes

```bash
minikube status
kubectl cluster-info
kubectl get nodes
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl get deployments
kubectl get services
kubectl get events
```

## 21. Security Considerations

- Never store AWS access keys or secret keys in GitHub.
- Never store Docker Hub passwords or tokens in Jenkinsfile.
- Use Jenkins Credentials for sensitive information.
- Restrict SSH access to authorized IP addresses.
- Restrict Jenkins port 8080 to authorized access.
- Keep GitHub Webhook source IP restrictions updated.
- Use HTTPS for production Jenkins access.
- Keep Jenkins and its plugins updated.
- Store Jenkins backups securely.
- Avoid exposing Kubernetes API or NodePort services unnecessarily.
- Use appropriate resource requests and limits for Kubernetes containers.

## 22. Project Limitations and Future Improvements

The current project demonstrates an end-to-end CI/CD workflow in a development environment.

The following improvements can be implemented in the future:

1. Configure a production-grade Kubernetes cluster such as Amazon EKS.
2. Add persistent database storage such as Amazon RDS or PostgreSQL.
3. Add real application unit and integration tests.
4. Add SonarQube for code quality analysis.
5. Add Nexus for artifact repository management.
6. Configure separate staging and production environments.
7. Implement Helm charts for Kubernetes deployments.
8. Configure monitoring using Prometheus and Grafana.
9. Configure centralized logging.
10. Implement automated rollback and deployment approvals.
11. Use HTTPS and secure secrets management.
12. Implement persistent storage for application data.

These are future enhancements and are not claimed as completed project features.

## 23. Project Results

The project successfully demonstrated:

- Jenkins Controller and Agent configuration.
- GitHub integration.
- GitHub Webhook delivery.
- Jenkins Pipeline from SCM.
- Maven application build.
- Docker image creation.
- Docker Hub image push.
- Kubernetes Deployment.
- Kubernetes Service using NodePort.
- Application access through port forwarding.
- Kubernetes rollout verification.
- Jenkins artifact archiving.
- Jenkins backup and restore testing.
- Jenkins and Kubernetes troubleshooting.

A successful Jenkins build (#12 in the earlier verified deployment) deployed the application image to Minikube, with two running Pods and a successful rollout.

## 24. Conclusion

This project demonstrates a practical end-to-end DevOps CI/CD workflow using AWS EC2, Jenkins, GitHub, Maven, Docker, Docker Hub and Kubernetes.

The pipeline automates application build, testing, packaging, container image creation, image publishing and Kubernetes deployment.

It also demonstrates important DevOps practices such as Jenkins credentials management, error handling, retry, timeout, artifact archiving, workspace cleanup, backup and restore, and troubleshooting.

The project provides hands-on experience with CI/CD automation, containerization, Kubernetes deployment and application delivery workflows.

---

**Project:** Task Management Application – End-to-End DevOps CI/CD Pipeline

**GitHub Repository:** https://github.com/prathameshkasar/task-management-app

**Environment:** AWS EC2 + Jenkins + GitHub + Maven + Docker + Docker Hub + Kubernetes (Minikube)
