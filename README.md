# Quizo - Quiz Management System

## 📌 Project Overview

**Quizo** is a Quiz Management System that enables teachers to log in, create, manage, and delete quizzes efficiently.

## 🚀 Features

- **User Authentication**
  - Simple login with hardcoded credentials (no JWT)
  - Secure access to quiz management features

- **Dashboard**
  - Comprehensive view of all quizzes
  - Easy navigation and management interface

- **Quiz Management**
  - Create and edit quiz details (title & description)
  - Delete existing quizzes
  - View individual quiz information

- **Responsive Design**
  - Fully responsive UI using ShadCN UI
  - Optimized for both mobile and desktop viewing

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- TypeScript
- ShadCN UI
- Axios (for API calls)

### Backend
- Node.js + Express
- TypeScript
- MySQL (Database)

## 🗄️ Database Schema

### Users Table

| Column     | Type         | Description           |
|------------|--------------|----------------------|
| id         | INT (PK)     | Unique User ID       |
| username   | VARCHAR(50)  |teacher   |
| password   | VARCHAR(50)  | password123  |

### Quizzes Table

| Column       | Type         | Description               |
|--------------|--------------|--------------------------|
| id           | INT (PK)     | Unique Quiz ID           |
| title        | VARCHAR(255) | Quiz Title               |
| description  | TEXT         | Quiz Description         |
| teacher_id   | INT (FK)     | Reference to Users Table |
| created_at   | TIMESTAMP    | Quiz Creation Timestamp  |

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Arpita-oss/quizo.git
cd quizo
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=quizo
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔥 API Endpoints

### Authentication
- `POST /api/login` - Validate username & password

### Quiz Management
- `POST /api/quizzes` - Create a quiz
- `GET /api/quizzes` - Retrieve all quizzes
- `GET /api/quizzes/:id` - Get quiz details
- `PUT /api/quizzes/:id` - Update a quiz
- `DELETE /api/quizzes/:id` - Delete a quiz

## 🎯 Usage Guide

1. Open the application in your browser
2. Log in using the demo credentials
3. Navigate to the dashboard to view existing quizzes
4. Use the "Create Quiz" button to add new quizzes
5. Manage existing quizzes through edit and delete options
