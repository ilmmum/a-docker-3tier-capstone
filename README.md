# 🐳 Docker 3-Tier Web Application - Capstone Project

## Project Overview

This project demonstrates a fully containerized 3-tier web application built with Docker. The architecture consists of a frontend web server, a backend REST API, and a MongoDB database, all running in separate containers and orchestrated using Docker Compose.

The application showcases modern containerization practices, microservices architecture, and automated deployment strategies essential for cloud-native applications.

---

## 📋 Table of Contents

- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Testing the Application](#testing-the-application)
- [Docker Hub Images](#docker-hub-images)
- [Deployment on Azure VM](#deployment-on-azure-vm)
- [CI/CD Pipeline](#cicd-pipeline)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Author](#author)

---

## 🏗️ Architecture
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Browser │────▶│ NGINX │────▶│ Node.js │────▶│ MongoDB │
│ (Client) │ │ (Frontend) │ │ (Backend) │ │ (Database) │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
│ │ │
▼ ▼ ▼
Port: 8080 Port: 5000 Port: 27017

text

### Components:

1. **Frontend (NGINX)**
   - Serves static HTML/CSS/JS files
   - Reverse proxy to backend API
   - Exposed on port `8080`

2. **Backend API (Node.js + Express)**
   - RESTful API endpoints
   - Handles business logic
   - Connects to MongoDB
   - Exposed on port `5000`

3. **Database (MongoDB)**
   - Persistent data storage
   - Stores application data
   - Internal network only

---

## 🛠️ Technologies Used

| Category | Technology | Version |
|----------|------------|---------|
| **Containerization** | Docker | 24.x+ |
| **Orchestration** | Docker Compose | 2.x+ |
| **Frontend** | NGINX | Alpine |
| **Backend** | Node.js | 18 Alpine |
| **Framework** | Express.js | 4.18.2 |
| **Database** | MongoDB | Latest |
| **CI/CD** | GitHub Actions | - |
| **Cloud** | Azure Virtual Machine | Ubuntu 22.04 |
| **Version Control** | Git & GitHub | - |

---

## 📁 Project Structure
a-docker-3tier-capstone/
├── .github/
│ └── workflows/
│ └── ci-cd.yml # GitHub Actions CI/CD pipeline
├── backend/
│ ├── Dockerfile # Backend container configuration
│ ├── package.json # Node.js dependencies
│ ├── server.js # Express API server
│ └── .dockerignore # Files to exclude from build
├── frontend/
│ ├── Dockerfile # Frontend container configuration
│ ├── nginx.conf # NGINX reverse proxy config
│ ├── index.html # Main HTML file
│ ├── style.css # CSS styling
│ └── .dockerignore # Files to exclude from build
├── screenshots/
│ ├── docker-ps.png # Running containers
│ ├── frontend-browser.png # Frontend in browser
│ ├── api-test.png # API test response
│ └── azure-deployment.png # VM deployment
├── docker-compose.yml # Multi-container orchestration
└── README.md # Project documentation

text

---

## 📦 Prerequisites

Before running this application, ensure you have the following installed:

- **Docker** (version 20.10+)
- **Docker Compose** (version 2.0+)
- **Git** (for cloning the repository)

### Verify Installations:

```bash
docker --version
docker-compose --version
git --version
🚀 Installation & Setup
Step 1: Clone the Repository
bash
git clone https://github.com/yourusername/a-docker-3tier-capstone.git
cd a-docker-3tier-capstone
Step 2: Build and Run with Docker Compose
bash
# Build images and start containers in detached mode
docker-compose up --build -d

# View running containers
docker ps

# View logs
docker-compose logs -f
Step 3: Verify All Containers are Running
You should see three containers:

text
CONTAINER ID   IMAGE                    STATUS         PORTS
xxx            mongodb:latest           Up             0.0.0.0:27017->27017/tcp
xxx            backend-api              Up             0.0.0.0:5000->5000/tcp
xxx            frontend-nginx           Up             0.0.0.0:8080->80/tcp
🧪 Testing the Application
1. Frontend Access
Open your browser and navigate to:

text
http://localhost:8080
You should see the Docker 3-Tier Application dashboard with system status.

2. Backend API Testing
Test the health endpoint:

bash
curl http://localhost:5000/health
Expected response:

json
{
  "status": "healthy",
  "timestamp": "2026-03-26T10:30:00.000Z",
  "service": "backend-api",
  "database": "connected"
}
3. Test API Connection from Frontend
Open http://localhost:8080

Click the "Test API Connection" button

You should see a success message with the backend response

🐳 Docker Hub Images
Push images to Docker Hub for distribution:

bash
# Login to Docker Hub
docker login

# Tag images
docker tag a-docker-3tier-capstone_backend yourusername/3tier-backend:latest
docker tag a-docker-3tier-capstone_frontend yourusername/3tier-frontend:latest

# Push images
docker push yourusername/3tier-backend:latest
docker push yourusername/3tier-frontend:latest
Docker Hub Images:
Backend: yourusername/3tier-backend:latest

Frontend: yourusername/3tier-frontend:latest

☁️ Deployment on Azure VM
Step 1: Create Azure Virtual Machine
bash
# Create resource group
az group create --name docker-rg --location eastus

# Create VM
az vm create \
  --resource-group docker-rg \
  --name docker-vm \
  --image Ubuntu2204 \
  --admin-username azureuser \
  --generate-ssh-keys \
  --size Standard_B1s
Step 2: SSH into VM
bash
ssh azureuser@<vm-public-ip>
Step 3: Install Docker on VM
bash
# Update packages
sudo apt-get update

# Install Docker
sudo apt-get install -y docker.io docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
Step 4: Deploy Application
bash
# Clone repository
git clone https://github.com/yourusername/a-docker-3tier-capstone.git
cd a-docker-3tier-capstone

# Run application
docker-compose up --build -d

# Check status
docker ps
Step 5: Access Deployed Application
text
http://<vm-public-ip>:8080
🔄 CI/CD Pipeline
GitHub Actions Workflow
The project includes an automated CI/CD pipeline that:

Triggers: On push to main branch

Builds: Docker images for backend and frontend

Pushes: Images to Docker Hub with version tags

Deploys: SSH into Azure VM and updates containers

GitHub Secrets Required
Configure these secrets in your GitHub repository:

Secret Name	Description
DOCKER_USERNAME	Docker Hub username
DOCKER_PASSWORD	Docker Hub password/token
VM_HOST	Azure VM public IP
VM_USERNAME	SSH username (azureuser)
VM_SSH_KEY	Private SSH key for VM access
Workflow File Location
.github/workflows/ci-cd.yml

📸 Screenshots
1. Running Containers
https://screenshots/docker-ps.png

2. Frontend Application
https://screenshots/frontend-browser.png

3. API Test Response
https://screenshots/api-test.png

4. Azure VM Deployment
https://screenshots/azure-deployment.png

🔧 Troubleshooting
Issue 1: Docker Permission Denied
bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Or use sudo
sudo docker-compose up
Issue 2: Port Already in Use
bash
# Check what's using port 8080
sudo lsof -i :8080

# Kill the process or change port in docker-compose.yml
Issue 3: MongoDB Connection Failed
bash
# Check MongoDB logs
docker-compose logs mongodb

# Ensure backend can reach MongoDB
docker exec backend-api ping mongodb
Issue 4: Containers Not Starting
bash
# Check all logs
docker-compose logs

# Rebuild with no cache
docker-compose build --no-cache
docker-compose up -d
Issue 5: Clean Up Everything
bash
# Stop and remove containers
docker-compose down

# Remove volumes (deletes database data)
docker-compose down -v

# Remove all unused images
docker system prune -a
📊 API Endpoints
Endpoint	Method	Description	Response
/	GET	Root endpoint	API information
/health	GET	Health check	Service status
/api/data	GET	Sample data	JSON array
📝 Submission Checklist
Dockerfile for Backend

Dockerfile for Frontend

docker-compose.yml

GitHub Actions CI/CD Pipeline

Images pushed to Docker Hub

Deployed on Azure VM

Screenshots of deployment

Complete README documentation

🎯 Learning Outcomes
Through this project, I have demonstrated:

✅ Containerizing applications with Docker

✅ Multi-container orchestration with Docker Compose

✅ Building a 3-tier architecture

✅ Implementing CI/CD with GitHub Actions

✅ Deploying to cloud infrastructure (Azure)

✅ Managing environment variables and configurations

✅ Network configuration between containers

✅ Persistent data storage with volumes

👤 Author
Your NameOluwole Olajide

GitHub: @ilmmum

Project Repository: a-docker-3tier-capstone

Date: March 2026