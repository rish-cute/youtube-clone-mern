# YouTube Clone MERN Application

A full-stack YouTube Clone built using the MERN stack (MongoDB, Express.js, React, and Node.js). The application allows users to register, log in, create channels, upload videos, browse videos, search content, filter videos by category, add comments, and manage their own videos.

## GitHub Repository

Repository: https://github.com/rish-cute/youtube-clone-mern

---

# Project Overview

This project is a simplified YouTube-like platform developed using the MERN stack. Users can register, log in, create channels, upload videos, search videos, filter videos by category, manage their uploaded videos, interact through comments, and browse channel pages.

The application implements authentication and authorization using JWT and supports complete CRUD operations for videos and comments. The project also includes category-based filtering, search functionality, channel management, video management, responsive layouts, and error handling.

The application follows a client-server architecture:

* Frontend built using React and Tailwind CSS
* Backend built using Node.js and Express.js
* Database managed using MongoDB Atlas
* Authentication implemented using JWT

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

## Channel Management

* Create Channel
* One Channel Per User Validation
* View Channel Details
* Display Channel Owner Information
* Display Channel Videos

## Video Management

* Upload Video
* View All Videos
* View Individual Video Details
* Search Videos by Title
* Filter Videos by Category
* Edit Uploaded Videos
* Delete Uploaded Videos
* Owner-only Video Controls

## Categories

* Education
* Programming
* Technology
* Gaming
* Music

## Comment Management

* Add Comment
* View Comments
* Edit Comment
* Delete Comment
* Display Comment Author

## Additional Features

* Sidebar Navigation
* Category-based Video Filtering
* Search Functionality
* Like/Dislike UI
* Responsive Layout
* Custom 404 Page
* Channel Navigation
* Video Cards
* Protected API Routes
* Form Validation
* Error Handling

---

# Technology Stack

## Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* React Icons
* Vite

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv

---

# Project Structure

```text
youtube-clone/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   ├── .gitignore
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── channelController.js
│   │   ├── commentController.js
│   │   └── videoController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Channel.js
│   │   ├── Comment.js
│   │   ├── User.js
│   │   └── Video.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── channelRoutes.js
│   │   ├── commentRoutes.js
│   │   └── videoRoutes.js
│   │
│   └── seed/
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── .gitignore
│   │
│   ├── public/
│   │
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── main.jsx
│       │
│       ├── assets/
│       │
│       ├── components/
│       │   ├── CommentSection.jsx
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   └── VideoCard.jsx
│       │
│       ├── layouts/
│       │   └── MainLayout.jsx
│       │
│       ├── pages/
│       │   ├── Channel.jsx
│       │   ├── CreateChannel.jsx
│       │   ├── EditVideo.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── NotFound.jsx
│       │   ├── Register.jsx
│       │   ├── UploadVideo.jsx
│       │   └── VideoDetails.jsx
│       │
│       ├── services/
│       │   └── api.js
│       │
│       └── styles/
│
└── screenshots/
```

---

# API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

## Channels

```http
POST /api/channels
GET /api/channels/:id
```

## Videos

```http
POST /api/videos
GET /api/videos
GET /api/videos/:id
PUT /api/videos/:id
DELETE /api/videos/:id
GET /api/videos/search
GET /api/videos/category/:category
```

## Comments

```http
POST /api/comments/:videoId
GET /api/comments/:videoId
PUT /api/comments/:commentId
DELETE /api/comments/:commentId
```

---

# Environment Variables

Create a file named:

```env
backend/.env
```

Add the following:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/rish-cute/youtube-clone-mern.git

cd youtube-clone-mern
```

---

# Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add the required environment variables.

Run backend server:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

# Frontend Setup

Open a new terminal.

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

# Running the Complete Application

### Terminal 1

```bash
cd backend
npm install
npm run dev
```

### Terminal 2

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

in your browser.

---

# Screenshots

Screenshots included in the repository demonstrate:

* Home Page
* Sidebar Navigation
* Category Filtering
* Search Results
* Login Page
* Registration Page
* Create Channel Page
* Channel Validation
* Upload Video Page
* Video Details Page
* Comment CRUD Operations
* Edit Video
* Delete Video
* Channel Page
* Custom 404 Page

---

# Future Improvements

* Real video streaming support
* Persistent likes and dislikes
* User subscriptions
* Watch history
* Playlist management
* User profiles
* Improved recommendation system

---

# Author

R. Naga Rishika

GitHub:
https://github.com/rish-cute

