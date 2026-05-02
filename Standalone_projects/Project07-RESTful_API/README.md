# Project07 - RESTful API (User CRUD)

**A full-stack RESTful API** for managing users with Express, Prisma + MongoDB, and a polished dark-themed frontend.

Live Demo → **[https://devclub-academy.onrender.com](https://devclub-academy.onrender.com)**

``` 
<image-card alt="Project07 Screenshot" src="https://github.com/ArielFrajacomo/DevClub_Academy/blob/main/Standalone_projects/Project07-RESTful_API/screenshot.png" ></image-card>
```

## ✨ Features

- Full **CRUD** operations (Create, Read, Update, Delete) on users
- Floating toast messages
- Search by name
- Edit & delete directly from the list (square action buttons)
- Production-ready backend with proper environment handling
- Local vs Production endpoint switch

## 🛠️ Tech Stack

**Backend**
- Node.js + Express
- Prisma ORM + MongoDB (Atlas)
- CORS enabled

**Frontend**
- Vanilla HTML + CSS + JavaScript (ES modules)
- Modern CSS with glassmorphism and smooth transitions

**Deployment**
- Render.com (free tier)

## 🚀 How to Run Locally

1. Clone the repo
   ``` 
   git clone https://github.com/ArielFrajacomo/DevClub_Academy.git
   cd DevClub_Academy/Standalone_projects/Project07-RESTful_API
   ```

2. Install dependencies
   ``` 
   npm install
   ```

3. Create `.env` file:
   ``` 
   PORT=3000
   DATABASE_URL="your_mongodb_atlas_connection_string"
   ```

4. Run the server
   ``` 
   npm start
   ```

5. Open `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| GET    | `/users`          | Get all / search users       |
| POST   | `/users`          | Create new user              |
| PUT    | `/users`          | Update user                  |
| DELETE | `/users`          | Delete user                  |

## 📋 Project Notes

- Final standalone project from **DevClub Academy Full Stack** course.
- Heavy focus on clean architecture and production practices.
- UI fully redesigned with floating messages and a dark theme.

---

**Made with ☕ and late-night coding by Ariel F. + Grok's team on the CSS**  