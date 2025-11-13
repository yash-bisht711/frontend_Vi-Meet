# 🎥 Vi-Meet — Real-time Video Chat App (MERN Stack)

Vi-Meet is a **modern real-time video chat application** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **WebRTC**.  
It enables users to create or join video rooms, chat in real-time, and collaborate seamlessly — similar to Google Meet or Zoom, but simpler and fully customizable.

---

## 🚀 Features

✅ **Real-time Video & Audio Communication** using WebRTC  
✅ **Room-based meeting system** — Create or Join any room instantly  
✅ **Live Chat Messaging** (text messages during calls)  
✅ **Responsive UI** built with **Tailwind CSS**  
✅ **User Authentication** (Signup, Login, Forgot Password, Email Verification)  
✅ **Socket.io Integration** for low-latency real-time communication  
✅ **JWT-based secure sessions**  
✅ **Invite participants via room link**  
✅ **Dark/Light Theme support** (optional)  
✅ **Deployed Backend and Frontend** ready for production  

---

## 🧠 Tech Stack

**Frontend:**
- React.js (with Hooks & Context API)
- Tailwind CSS
- Axios
- Socket.io Client
- WebRTC APIs

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- JWT Authentication
- Nodemailer / Brevo SMTP (for password reset & verification)
- dotenv

**Hosting:**
- Frontend: Vercel / Netlify  
- Backend: Render / Railway / Heroku  
- Database: MongoDB Atlas  

---

## 📂 Folder Structure

vi-meet/
│
├── backend/
│ ├── server.js
│ ├── sockets/
│ │ └── index.js
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── roomRoutes.js
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── roomController.js
│ ├── config/
│ │ ├── db.js
│ │ └── nodemailer.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── App.js
│ │ └── index.js
│ ├── public/
│ └── tailwind.config.js
│
└── README.md

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/vi-meet.git
cd vi-meet
2️⃣ Install dependencies
Backend:
cd backend
npm install
Frontend:
cd ../frontend
npm install
3️⃣ Environment Variables
Create a .env file inside the backend/ directory with:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173
🧩 Running the App
Start the backend server
bash
Copy code
cd backend
npm run dev
Start the frontend (React)
bash
Copy code
cd frontend
npm run dev
Open http://localhost:5173 to view the app.

🔐 Authentication Features
Signup → Users register via email.

Login → JWT token-based secure login.

Forgot Password → Reset password via email (Brevo SMTP / Nodemailer).

Email Verification → Optional step for production-ready apps.

💬 Real-time Communication Flow
When a user creates or joins a room, a unique room ID is generated.

Socket.io establishes a WebSocket connection between participants.

WebRTC handles peer-to-peer video and audio streams.

Messages are exchanged through Socket.io events.

🧠 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login user
POST	/api/auth/forgot-password	Send reset link
POST	/api/auth/reset-password	Reset user password

Room Routes
Method	Endpoint	Description
POST	/api/room/create	Create a new room
GET	/api/room/:id	Get room info
DELETE	/api/room/:id	Delete a room

🧠 Future Enhancements
✅ Screen sharing

✅ Chat history persistence

✅ File sharing during meetings

✅ User profile dashboard

✅ Meeting recording feature

🌐 Deployment
Frontend:
Deploy on Netlify

Backend:
Deploy on Render


📞 Contact
👤 Author: Yash Bisht
📧 Email: whyrush711@gmail.com
📍 Location: Bareilly, Uttar Pradesh, India
💼 Portfolio: https://yash-bisht711.github.io/Yash-Bisht_Portfolio/
🐙 GitHub: @yash-bisht711

🪄 License
This project is licensed under the MIT License — feel free to use and modify it for your own projects.

“Connecting people through code — one video call at a time.” 🎥
