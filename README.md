# Markdown Notes Application

## 📌 Overview
This is a full-stack Markdown Notes Application that allows users to create, edit, delete, and preview notes in real-time using Markdown syntax.

## 🚀 Features
- Create, edit, and delete notes
- Real-time Markdown preview (split-screen)
- Persistent storage using SQLite
- Clean and simple UI
- Auto-save functionality (debounced)

## 🛠 Tech Stack
- Frontend: React.js
- Backend: Node.js (Express)
- Database: SQLite

## ⚙️ Setup Instructions

### 1. Clone Repository
git clone <your-repo-link>

### 2. Backend Setup
cd backend
npm install
node server.js

### 3. Frontend Setup
cd frontend
npm install
npm start

## 🔌 API Endpoints
- GET /notes → Fetch all notes
- POST /notes → Create note
- PUT /notes/:id → Update note
- DELETE /notes/:id → Delete note

## 💡 Key Decisions
- Used SQLite for simplicity and quick setup
- Implemented RESTful APIs
- Used debouncing for auto-save to optimize performance
- Maintained separation of frontend and backend

## 🌐 Future Improvements
- User authentication (JWT)
- Search functionality
- Tags & categories
- Dark mode
