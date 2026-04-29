```markdown
# 🚀 Portfolio

A modern, full-stack developer portfolio powered by real-time analytics and recruiter engagement tracking.  
Built with performance, simplicity, and scalability in mind — this isn’t just a portfolio, it’s a **data-aware personal platform**.

---

## 🌐 Live Links

https://yt-portfolio-xi.vercel.app  

## ✨ What Makes This Different?

Most portfolios just *show* projects.  
This one **tracks, analyzes, and learns from user interactions**.

---

## 🔥 Features

### 👁️ Smart Visitor Tracking
- Automatically logs every visit
- Stores metadata in MongoDB
- Displays live visitor count

---

### 📊 Project Engagement Analytics
- Tracks clicks on each project
- Helps understand what recruiters are interested in
- Dynamic engagement insights

---

### 📩 Recruiter Contact System
- Clean, minimal contact form
- Captures:
  - Name
  - Company
  - Role
  - Email
  - Message
- Stores submissions securely in database

---

### ⚡ Full-Stack Architecture
- **Frontend:** React (Vercel)
- **Backend:** Node.js + Express (Render)
- **Database:** MongoDB Atlas
- **Communication:** REST APIs

---

## 🏗️ Project Structure

```

portfolio/
│
├── server/                # Backend (Node + Express)
│   ├── models/
│   │   ├── Visitor.js
│   │   ├── Project.js
│   │   └── Recruiter.js
│   ├── routes/
│   │   ├── stats.js
│   │   ├── projects.js
│   │   └── recruiters.js
│   ├── server.js
│   └── .env
│
├── client/                # Frontend (React)
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── .env
│
└── README.md

```

---

## ⚙️ Environment Variables

### 🔹 Backend (`server/.env`)
```

PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_ORIGIN=[https://yt-portfolio-xi.vercel.app](https://yt-portfolio-xi.vercel.app)

```

---

### 🔹 Frontend (`client/.env`)
```

REACT_APP_API_BASE_URL=[https://yt-portfolio-lgb6.onrender.com](https://yt-portfolio-lgb6.onrender.com)

````

---

## 🛠️ Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
````

---

### 2. Setup Backend

```bash
cd server
npm install
npm run dev
```

---

### 3. Setup Frontend

```bash
cd client
npm install
npm start
```

---

## 🚀 Deployment

* **Frontend:** Deployed on Vercel
* **Backend:** Deployed on Render
* **Database:** MongoDB Atlas

---

## 🤝 Contributing

Contributions, ideas, and improvements are welcome.
Feel free to fork and build on top of it.

---

## 📬 Contact

If you’re a recruiter or collaborator, feel free to connect via the portfolio contact form.

---

## ⭐ Final Note

This project reflects not just my work, but **how I think about building products** —
data-driven, scalable, and user-focused.

---

**If you like this project, consider giving it a ⭐ on GitHub.**

```
