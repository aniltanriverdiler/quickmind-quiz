# 🧠 QuickMind Quiz App

QuickMind is a **React + TypeScript + Vite** powered quiz application designed to challenge your knowledge with **interactive questions**.  
The project features **real-time feedback**, user authentication, result tracking, achievements system, global leaderboard, and comprehensive settings — all in a modern, responsive design with glassmorphism UI.

---

## 🚀 Live Demo & Source Code

🔗 **Live Demo:** [https://quickmind-quiz-app.netlify.app/](https://quickmind-quiz-app.netlify.app)

💻 **GitHub Repository:** [https://github.com/aniltanriverdiler/quickmind-quiz](https://github.com/aniltanriverdiler/quickmind-quiz)

---

## ✨ Features

### 🎯 Quiz System
- ✅ **Multiple Categories:** Science, History, Geography, Sports, Technology, and more
- ✅ **Difficulty Levels:** Easy, Medium, Hard with different question sets
- ✅ **Customizable Questions:** 5, 10, 15, 20, or 25 questions per quiz
- ✅ **Timer per Question:** Each question has **60 seconds** to answer
- ✅ **Real-Time Feedback:** Correct or wrong answers are instantly shown
- ✅ **Skip Option:** Users can skip a question using the **Next** button
- ✅ **Score Calculation:** Shows **correct, wrong, and skipped** answers
- ✅ **Detailed Results:** Displays wrong & skipped answers in detail

### 👤 User System
- 🔑 **Register & Login:** Users can create an account or log in
- 📂 **Personal Quiz History:** Results are saved **per user** with detailed analytics
- 🚪 **Logout Option:** Secure logout feature
- 👤 **User Profile:** Customizable display name, avatar, and visibility settings

### 🏆 Achievements System
- 🎖️ **21+ Achievements:** Unlock achievements based on performance
- 🏅 **Rarity System:** Common, Rare, Epic, and Legendary achievements
- 📊 **Progress Tracking:** Visual progress bars for achievement goals
- 🔍 **Filtering & Sorting:** Filter by unlocked/locked, sort by various criteria
- 🎯 **Categories:** Simple, Performance, Volume, Difficulty, Streak, and Social achievements

### 🏅 Global Leaderboard
- 🌍 **Global Rankings:** Compete with players worldwide
- 🔍 **Search & Filter:** Find specific players or filter by rank
- 📊 **Statistics:** View total players, average scores, and top performers
- 👑 **Top 3 Podium:** Special display for top performers
- 📈 **Real-time Updates:** Rankings update automatically

### 📊 Advanced Analytics
- 📈 **Performance Charts:** Visual representation of quiz history
- 📅 **Date Filtering:** Filter results by week, month, or year
- 🎯 **Score Analysis:** Detailed breakdown of performance trends
- 📤 **Export Data:** Export quiz history as CSV or JSON
- 📊 **Summary Statistics:** Comprehensive performance metrics

### ⚙️ Settings & Customization
- 🎨 **Theme System:** Light, Dark, and System (Auto) themes
- 🎨 **Color Palettes:** 4 different color scheme options
- ⚙️ **Quiz Settings:** Customize default questions, difficulty, and preferences
- 🔔 **Notifications:** Browser notification support with customizable preferences
- 💾 **Data Management:** Export/import all data, reset options
- 👤 **Profile Settings:** Avatar selection, display name, visibility controls

### 🎨 Design
- 🌗 **Dark/Light Mode:** Switch themes easily
- 📱 **Responsive Layout:** Works on desktop, tablet, and mobile
- ✨ **Modern UI:** Styled with **TailwindCSS** and **Shadcn/UI**
- 🎭 **Glassmorphism Design:** Beautiful frosted glass effects
- 🎬 **Video Backgrounds:** Dynamic video backgrounds for visual appeal
- 🎨 **Gradient Titles:** Stylish gradient headings for a modern look  

---

## 📂 Project Structure
```
quickmind-quiz/
├─ public/                  # Static assets (favicon, brain logo, etc.)
├─ src/
│  ├─ assets/               # Images and video backgrounds
│  │   ├─ color-smoke-7.mp4
│  │   ├─ color-smoke-14.mp4
│  │   ├─ brain.png
│  │   └─ ...
│  ├─ components/           # Reusable React components
│  │   ├─ ui/               # Shadcn UI-based components
│  │   │   ├─ button.tsx
│  │   │   ├─ card.tsx
│  │   │   ├─ dialog.tsx
│  │   │   ├─ select.tsx
│  │   │   └─ ...
│  │   ├─ layout/           # Layout components
│  │   │   ├─ Navbar.tsx    # Navigation with auth
│  │   │   ├─ Footer.tsx    # Footer component
│  │   │   └─ ModeToggle.tsx # Theme switcher
│  │   ├─ quiz/             # Quiz-related components
│  │   │   ├─ QuestionCard.tsx
│  │   │   ├─ ScoreScreen.tsx
│  │   │   └─ LevelSelection.tsx
│  │   ├─ history/          # History page components
│  │   │   ├─ HistoryCards.tsx
│  │   │   ├─ ChartSection.tsx
│  │   │   ├─ FilterControls.tsx
│  │   │   └─ ...
│  │   ├─ leaderboard/      # Leaderboard components
│  │   │   └─ LeaderBoard.tsx
│  │   └─ achievements/     # Achievement components
│  │       └─ AchievementCard.tsx
│  ├─ layout/               # Layout-related files
│  │   └─ Layout.tsx        # Main app layout
│  ├─ pages/                # Page-level components
│  │   ├─ Home.tsx          # Landing page
│  │   ├─ Quiz.tsx          # Quiz page
│  │   ├─ History.tsx       # Analytics & history page
│  │   ├─ LevelPage.tsx     # Level selection page
│  │   ├─ LeaderBoardPage.tsx # Global leaderboard
│  │   ├─ Achievements.tsx  # Achievement system
│  │   ├─ Settings.tsx      # User settings
│  │   └─ About.tsx         # About page
│  ├─ routes/               # Route setup (React Router)
│  │   └─ index.tsx         # Centralized route definitions
│  ├─ store/                # Zustand state management
│  │   ├─ authStore.ts      # User authentication
│  │   ├─ quizStore.ts      # Quiz state management
│  │   ├─ leader.ts         # Leaderboard data
│  │   ├─ achievements.ts   # Achievement system
│  │   └─ settingsStore.ts  # User settings & preferences
│  ├─ data/                 # Quiz data
│  │   └─ questions.ts      # All quiz questions by category
│  ├─ lib/                  # Helper utilities
│  │   └─ utils.ts          # Utility functions
│  ├─ main.tsx              # App entry point
│  └─ index.css             # Global styles
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ tailwind.config.js
└─ README.md
```
---

## 🛠️ Installation & Run
- 1️⃣ Install dependencies:
  - `npm install`
- 2️⃣ Run development server:
  - `npm run dev`
- 3️⃣ Open the app in your browser:
  - `http://localhost:5173`

---    

## 🏗️ Tech Stack

- ⚛ **React 19** – Frontend library with latest features
- 🟦 **TypeScript** – Type-safe development
- ⚡ **Vite** – Lightning-fast build tool
- 🎨 **Tailwind CSS** – Modern utility-first styling
- 🧩 **Shadcn UI** – Elegant UI components with Radix UI primitives
- 🌐 **React Router** – Navigation and routing
- 🗂 **Zustand** – Lightweight state management with persistence
- 📊 **Recharts** – Data visualization and charts
- 🔔 **Sonner** – Toast notifications
- 📁 **File-saver** – File download functionality
- ☁ **Netlify** – Deployment & hosting

---

## 🎮 How to Use

1️⃣ **Register or Login** – Create an account or log in to track your scores  
2️⃣ **Select Level** – Choose your quiz category and difficulty level  
3️⃣ **Start the Quiz** – Answer questions with a 60-second timer per question  
4️⃣ **See Results** – View your score with detailed breakdown  
5️⃣ **Save Results** – Store your quiz history automatically  
6️⃣ **Check History** – Access comprehensive analytics and performance charts  
7️⃣ **View Leaderboard** – See how you rank globally  
8️⃣ **Unlock Achievements** – Earn badges based on your performance  
9️⃣ **Customize Settings** – Personalize your experience with themes and preferences  

---

## 🚀 Key Pages

- **🏠 Home** – Landing page with app overview
- **🎯 Level Selection** – Choose quiz category and difficulty
- **🧠 Quiz** – Interactive quiz experience
- **📊 History** – Detailed analytics and performance tracking
- **🏆 Leaderboard** – Global rankings and competition
- **🎖️ Achievements** – Achievement system with 21+ badges
- **⚙️ Settings** – User preferences and data management
- **ℹ️ About** – App information and changelog

---

## 📌 Technical Notes

- **Frontend-only** – No backend required, all data stored in localStorage
- **Responsive Design** – Works perfectly on desktop, tablet, and mobile
- **Modern Architecture** – Built with latest React patterns and best practices
- **Performance Optimized** – Fast loading with Vite and optimized components
- **Accessibility** – Keyboard navigation and screen reader support
- **PWA Ready** – Can be installed as a Progressive Web App

---

## 🤝 Contributing

💡 Have an idea or found a bug?

- 🍴 **Fork the repository**
- 🌿 **Create a feature branch** (`git checkout -b feature/amazing-feature`)
- 💻 **Make your changes** and test thoroughly
- 📝 **Commit your changes** (`git commit -m 'Add amazing feature'`)
- 🚀 **Push to the branch** (`git push origin feature/amazing-feature`)
- 🔄 **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write clear commit messages
- Add tests for new features when applicable
- Update documentation as needed
- Ensure responsive design for all screen sizes

🚀 **Let's improve QuickMind together!**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Open Source Community** – For the amazing libraries and tools
- **React Team** – For the incredible framework
- **Tailwind CSS** – For the utility-first CSS framework
- **Shadcn/UI** – For the beautiful component library
- **All Contributors** – Who help make this project better
