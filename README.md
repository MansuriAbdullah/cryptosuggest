# CryptoSuggest Full Stack Project

A comprehensive directory for verified cryptocurrency websites, built with the MERN stack (MongoDB, Express, React, Node.js).

## 📂 Project Structure

- `backend/`: Node.js & Express API with MongoDB/Mongoose.
- `frontend/`: React + Vite + Tailwind CSS frontend application.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### 2. Backend Setup
```bash
cd backend
npm install
# Configure your .env file (one has been created for you)
npm run seed  # Optional: Seed the database with sample data
npm run dev   # Start backend on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev   # Start frontend on http://localhost:5173
```

## 🛠️ Features
- **Verified Directory**: Manually reviewed crypto platforms.
- **Search & Filter**: Find apps by category, trust score, or features.
- **User System**: Auth, bookmarks, and reviews.
- **Admin Dashboard**: Approve submissions and manage content.

## 📄 License
MIT
