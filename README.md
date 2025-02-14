Quizo - Quiz Management System
📌 Project Overview
Quizo is a Quiz Management System that allows teachers to log in, create, manage, and delete quizzes. The system consists of:

Frontend: React with ShadCN UI for modern styling.
Backend: TypeScript + Express + MySQL for handling authentication and quiz CRUD operations.
🚀 Features
✔ User Authentication: Simple login with hardcoded credentials (no JWT).
✔ Dashboard: View a list of quizzes.
✔ Create/Edit Quiz: Add or update quiz details (title & description).
✔ Delete Quiz: Remove an existing quiz.
✔ Responsive UI: Works on both mobile and desktop using ShadCN UI.

🛠️ Tech Stack
Frontend
React (Vite)
TypeScript
ShadCN UI
Axios (for API calls)
Backend
Node.js + Express
TypeScript
MySQL (Database)
🗄️ Database Schema (MySQL)
Users Table
Column	Type	Description
id	INT (PK)	Unique User ID
username	VARCHAR(50)	Teacher's Username
password	VARCHAR(50)	Hardcoded Password
Quizzes Table
Column	Type	Description
id	INT (PK)	Unique Quiz ID
title	VARCHAR(255)	Quiz Title
description	TEXT	Quiz Description
teacher_id	INT (FK)	Reference to Users Table
created_at	TIMESTAMP	Quiz Creation Timestamp
⚙️ Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/your-username/quizo.git
cd quizo
2️⃣ Backend Setup
sh
Copy
Edit
cd backend
npm install
Create a .env file and add:
ini
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=quizo
PORT=5000
Start the backend server:
sh
Copy
Edit
npm run dev
3️⃣ Frontend Setup
sh
Copy
Edit
cd frontend
npm install
npm run dev
🔥 API Endpoints
Authentication
POST /api/login → Validate username & password
Quiz Management
POST /api/quizzes → Create a quiz
GET /api/quizzes → Retrieve all quizzes
GET /api/quizzes/:id → Get quiz details
PUT /api/quizzes/:id → Update a quiz
DELETE /api/quizzes/:id → Delete a quiz
🎯 Usage Guide
1️⃣ Open the app and log in with demo credentials.
2️⃣ Access the dashboard to see the quizzes.
3️⃣ Click "Create Quiz" to add a new quiz.
4️⃣ Edit or delete quizzes from the list.

📌 Notes
This project does not use JWT for authentication.
The credentials are hardcoded for demo purposes.
Ensure MySQL is running before starting the backend.
