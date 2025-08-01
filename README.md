# 🧠 QuickMind Quiz App

QuickMind is a **React + TypeScript + Vite** powered quiz application designed to challenge your knowledge with **5 interactive questions**.  
The project features **real-time feedback**, user authentication, and result tracking — all in a modern, responsive design.

---

## 🚀 Live Demo & Source Code

🔗 **Live Demo:** [https://quickmind-quiz-app.netlify.app/](https://quickmind.netlify.app)  
💻 **GitHub Repository:** [https://github.com/aniltanriverdiler/quickmind-quiz.git](https://github.com/yourusername/quickmind)

---

## ✨ Features

### 🎯 Quiz System
- ✅ **5 Questions:** Each quiz session has 5 randomized questions.  
- ✅ **Timer per Question:** Each question has **60 seconds** to answer.  
- ✅ **Real-Time Feedback:** Correct or wrong answers are instantly shown for **2 seconds**.  
- ✅ **Skip Option:** Users can skip a question using the **Next** button.  
- ✅ **Score Calculation:** Shows **correct, wrong, and skipped** answers.  
- ✅ **Result Dialog:** Displays wrong & skipped answers in detail.

### 👤 User System
- 🔑 **Register & Login:** Users can create an account or log in.  
- 📂 **Personal Quiz History:** Results are saved **per user**.  
- 🚪 **Logout Option:** Secure logout feature.

### 🎨 Design
- 🌗 **Dark/Light Mode:** Switch themes easily.  
- 📱 **Responsive Layout:** Works on desktop, tablet, and mobile.  
- ✨ **Modern UI:** Styled with **TailwindCSS** and **Shadcn/UI**.  
- 🎭 **Gradient Titles:** Stylish gradient headings for a modern look.  

---

## 📂 Project Structure
```quickmind/
├─ public/                  # Static assets (favicon, brain logo, etc.)
├─ src/
│  ├─ assets/               # Images and static assets
│  ├─ components/           # Reusable React components
│  │   ├─ ui/               # Shadcn UI-based components (Button, Card, Dialog, etc.)
│  │   ├─ Navbar.tsx        # Navigation bar with login/logout
│  │   ├─ Footer.tsx        # Footer component
│  │   ├─ ModeToggle.tsx    # Dark/Light mode switch
│  │   ├─ QuestionCard.tsx  # Question display component
│  │   ├─ ScoreScreen.tsx   # Result summary screen
│  │   └─ ...
│  ├─ layout/               # Layout-related files
│  │   └─ Layout.tsx        # General page layout (header, footer, etc.)
│  ├─ pages/                # Page-level components
│  │   ├─ Home.tsx          # Landing page
│  │   ├─ Quiz.tsx          # Quiz page
│  │   ├─ History.tsx       # Score history page
│  │   └─ ...
│  ├─ routes/               # Route setup (React Router)
│  │   └─ index.tsx         # Centralized route definitions
│  ├─ store/                # Zustand state management
│  │   ├─ authStore.ts      # Handles user login/register
│  │   └─ quizStore.ts      # Handles quiz state
│  ├─ data/                 # Quiz data
│  │   └─ questions.ts      # All quiz questions
│  ├─ lib/                  # Helper utilities
│  │   └─ utils.ts          # Utility functions (e.g., cn for classNames)
│  ├─ main.tsx              # App entry point
│  └─ index.css             # Global styles
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md
```
---

## 🛠️ Installation & Run
1️⃣ Install dependencies:
  - ```npm install```
2️⃣ Run development server:
  - ```npm run dev```
3️⃣ Open the app in your browser:
  - ```http://localhost:5173```

---    

## 🏗️ Tech Stack

- ⚛ **React 18** – Frontend library  
- 🟦 **TypeScript** – Type-safe development  
- ⚡ **Vite** – Lightning-fast build tool  
- 🎨 **Tailwind CSS** – Modern utility-first styling  
- 🧩 **Shadcn UI** – Elegant UI components  
- 🌐 **React Router** – Navigation and routing  
- 🗂 **Zustand** – Lightweight state management  
- ☁ **Netlify** – Deployment & hosting  

---

## 🎮 How to Use

1️⃣ Register or Login – Create an account or log in to track your scores  
2️⃣ Start the Quiz – Answer 5 questions, each with a 60-second timer  
3️⃣ See Results – View your score instantly with correct/wrong/skipped breakdown  
4️⃣ Save Results – Store your quiz history to view later  
5️⃣ Check History – Access all your past quiz attempts via the History Page  

---

## 📌 Notes

- This project is frontend-only (no backend yet)  
- All data is stored in localStorage  
- Perfect for learning React, Zustand, and Shadcn UI  
- Future improvements: Backend API & Leaderboard  

---

## 🤝 Contribution

💡 Have an idea or found a bug?

- Fork the repo  
- Create a new branch (`feature/your-feature`)  
- Submit a Pull Request  

🚀 Let’s improve QuickMind together!
