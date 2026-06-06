# Full Stack User Management App

A full-stack web application built with React.js, Node.js, Express.js, and PostgreSQL.

## Features
- JWT-based Login & Register authentication
- User profile page displaying details on a card
- Admin user table with pagination and infinite scroll
- Edit and Delete functionality per user
- REST API backend connected to PostgreSQL

## Tech Stack
**Frontend:** React.js, React Hooks, React Router, CSS3  
**Backend:** Node.js, Express.js, JWT Authentication  
**Database:** PostgreSQL

## Getting Started

### Backend
```bash
cd backend
npm install
# Add your .env file (DB credentials, JWT secret)
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Backend `.env` needs:
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
PORT=
```
