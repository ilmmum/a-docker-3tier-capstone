# Docker 3-Tier Web Application (Capstone Project)

## Project Overview

This project demonstrates a containerized **3-tier web application** built using Docker.  
The architecture consists of a **Frontend**, **Backend API**, and **Database** running in separate containers.

The application is orchestrated using Docker Compose to ensure seamless communication between services.

---

## Architecture

Browser
   │
   ▼
Frontend (NGINX)
   │
   ▼
Backend API (Node.js)
   │
   ▼
MongoDB Database


---

## Technologies Used

- Docker
- Docker Compose
- NGINX (Frontend Web Server)
- Node.js (Backend API)
- MongoDB (Database)
- Git & GitHub

---

## Project Structure / Deployment Plan

---
Your Laptop
     │
     ▼
Git Push
     │
     ▼
GitHub Repository
     │
     ▼
GitHub Actions (CI Pipeline)
     │
     ▼
Azure Virtual Machine
     │
     ▼
Docker Containers Running Online