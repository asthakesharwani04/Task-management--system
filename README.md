Task Management System (TMS)

A simple and efficient Task Management System (TMS) built using the MERN stack.
It allows users to register, log in, and manage their tasks with an easy-to-use interface.

🚀 Features
🔐 Authentication

User Registration
User Login
JWT-based Authentication
Protected Routes

📝 Task Management

Create Task
Update Task
Delete Task
Mark Completed / Pending

View All Tasks

🎨 Frontend

React + Vite
Context API for authentication
Responsive UI

🛠 Backend

Node.js & Express.js
MongoDB + Mongoose
Secure API Endpoints
Proper Error Handling

⚙️ How to Run the Project
✅ 1. Clone the repository
git clone <repo-url>
cd TMS

▶️ Frontend Setup
cd frontend
npm install
npm run dev


The frontend will run at:

http://localhost:5173

🖥 Backend Setup
cd backend
npm install
npm start


Backend runs at:

http://localhost:5000

🔧 Environment Variables (Backend)

Create a .env file in the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

📦 Built Using - React (Vite), Node.js, Express.js, MongoDB, Context API, Axios
