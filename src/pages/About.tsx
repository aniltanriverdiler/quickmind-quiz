import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import bgVideo from "../assets/color-smoke-14.mp4";
import { toast } from "sonner";
import {
  Info,
  Sparkles,
  Code2,
  BarChart3,
  MessageCircle,
  Github,
  Mail,
  Globe,
  Heart,
  CheckCircle2,
  Zap,
  Trophy,
  Users,
  Clock,
  Target,
  BookOpen,
  GitBranch,
  Scale,
  GitPullRequest,
  Package,
  Calendar,
  Tag,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useLeaderboardStore } from "../store/leader";
import { useAchievements } from "../store/achievements";

function About() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Get stats from stores
  const { currentUser } = useAuthStore();
  const { leaderboard } = useLeaderboardStore();
  const { list: achievements } = useAchievements();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    totalAchievements: 0,
    avgAccuracy: 0,
  });

  useEffect(() => {
    // Calculate stats
    const totalUsers = leaderboard.length;
    const totalAchievements = Object.values(achievements).filter(
      (a) => a.unlocked
    ).length;

    // Get quiz history
    let totalQuizzes = 0;
    let totalAccuracy = 0;
    let quizCount = 0;

    if (currentUser) {
      const key = `quizHistory_${currentUser.email}`;
      const history = JSON.parse(localStorage.getItem(key) || "[]");
      totalQuizzes = history.length;

      history.forEach((quiz: { percentage: number }) => {
        totalAccuracy += quiz.percentage;
        quizCount++;
      });
    }

    setStats({
      totalUsers,
      totalQuizzes,
      totalAchievements,
      avgAccuracy: quizCount > 0 ? Math.round(totalAccuracy / quizCount) : 0,
    });
  }, [currentUser, leaderboard, achievements]);

  // Handle feedback submission
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.name || !feedback.email || !feedback.message) {
      toast.error("Please fill in all fields!");
      return;
    }

    // In a real app, this would send to a backend
    console.log("Feedback submitted:", feedback);
    toast.success("Thank you for your feedback! We'll get back to you soon.");

    // Reset form
    setFeedback({ name: "", email: "", message: "" });
  };

  const features = [
    {
      icon: Target,
      title: "Multiple Categories",
      description: "Quiz questions across various topics",
    },
    {
      icon: Zap,
      title: "Timed Challenges",
      description: "60 seconds per question to test your speed",
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Unlock 21+ achievements as you progress",
    },
    {
      icon: Users,
      title: "Global Leaderboard",
      description: "Compete with players worldwide",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Detailed statistics and progress history",
    },
    {
      icon: Sparkles,
      title: "Beautiful UI",
      description: "Modern glassmorphism design",
    },
  ];

  const techStack = [
    { name: "React", description: "UI Library", icon: "⚛️" },
    { name: "TypeScript", description: "Type Safety", icon: "📘" },
    { name: "Vite", description: "Build Tool", icon: "⚡" },
    { name: "Tailwind CSS", description: "Styling", icon: "🎨" },
    { name: "Zustand", description: "State Management", icon: "🐻" },
    { name: "React Router", description: "Navigation", icon: "🛣️" },
    { name: "Shadcn/ui", description: "UI Components", icon: "🧩" },
    { name: "Lucide Icons", description: "Icons", icon: "🎯" },
  ];

  const changelog = [
    {
      version: "1.0.0",
      date: "October 2025",
      type: "major",
      changes: [
        "Initial release of QuickMind Quiz",
        "Multi-category quiz system",
        "Global leaderboard functionality",
        "21+ achievement system",
        "Performance tracking dashboard",
        "User authentication system",
        "Modern glassmorphism UI design",
      ],
    },
    {
      version: "0.9.0",
      date: "September 2025",
      type: "minor",
      changes: [
        "Added achievements page with filters",
        "Implemented Settings page",
        "Browser notification support",
        "Data export/import functionality",
        "Theme customization (Light/Dark/System)",
      ],
    },
    {
      version: "0.8.0",
      date: "August 2025",
      type: "minor",
      changes: [
        "Leaderboard search and filtering",
        "Enhanced quiz statistics",
        "Performance improvements",
        "Bug fixes and optimizations",
      ],
    },
  ];

  const openSourceLibraries = [
    { name: "React", license: "MIT", purpose: "UI Framework" },
    { name: "TypeScript", license: "Apache 2.0", purpose: "Type Safety" },
    { name: "Vite", license: "MIT", purpose: "Build Tool" },
    { name: "Tailwind CSS", license: "MIT", purpose: "Styling" },
    { name: "Zustand", license: "MIT", purpose: "State Management" },
    { name: "React Router", license: "MIT", purpose: "Routing" },
    { name: "Radix UI", license: "MIT", purpose: "UI Primitives" },
    { name: "Lucide React", license: "ISC", purpose: "Icons" },
    { name: "Sonner", license: "MIT", purpose: "Notifications" },
    { name: "Recharts", license: "MIT", purpose: "Charts" },
  ];

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src={bgVideo}
      />
      {/* Overlay for readability */}
      <div className="fixed inset-0 z-10 bg-gradient-to-b from-black/20 via-black/35 to-black/60" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto pt-8 sm:pt-10 pb-8 p-4 sm:p-6 space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="pb-2 text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-green-400 to-indigo-400 inline-block text-transparent bg-clip-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            ℹ️ About QuickMind Quiz
          </h1>
          <p className="text-xl text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            Test your knowledge, challenge your mind
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Application Info */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Info className="w-5 h-5 text-blue-400" />
                Application Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/90">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Version:</span>
                  <span className="font-semibold">1.0.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Developer:</span>
                  <span className="font-semibold">QuickMind Team</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">License:</span>
                  <span className="font-semibold">MIT License</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Release Date:</span>
                  <span className="font-semibold">October 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Last Updated:</span>
                  <span className="font-semibold">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm leading-relaxed">
                  QuickMind Quiz is an interactive quiz application designed to
                  test and improve your knowledge across various topics. Built
                  with modern web technologies, it offers a seamless and
                  engaging learning experience.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                  onClick={() =>
                    window.open(
                      "https://github.com/aniltanriverdiler/quickmind-quiz",
                      "_blank"
                    )
                  }
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                  onClick={() =>
                    window.open(
                      "https://quickmind-quiz-app.netlify.app/",
                      "_blank"
                    )
                  }
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Website
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 2. Features List */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold">
                        {feature.title}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* 3. Technology Stack */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Code2 className="w-5 h-5 text-purple-400" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all hover:scale-105 cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{tech.icon}</span>
                      <h4 className="text-white font-semibold text-sm">
                        {tech.name}
                      </h4>
                    </div>
                    <p className="text-white/60 text-xs">{tech.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/70 text-sm text-center">
                  Built with <Heart className="w-4 h-4 inline text-red-400" />{" "}
                  using modern web technologies
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4. Statistics */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Application Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-300" />
                    <span className="text-blue-200 text-sm font-semibold">
                      Total Users
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {stats.totalUsers}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-green-300" />
                    <span className="text-green-200 text-sm font-semibold">
                      Quizzes Taken
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {stats.totalQuizzes}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-300" />
                    <span className="text-yellow-200 text-sm font-semibold">
                      Achievements
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {stats.totalAchievements}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-purple-300" />
                    <span className="text-purple-200 text-sm font-semibold">
                      Avg Accuracy
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {stats.avgAccuracy}%
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Status:</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-semibold">
                      All Systems Operational
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. Support & Contact */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageCircle className="w-5 h-5 text-green-400" />
                Support & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg mb-3">
                    Get in Touch
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white/70 text-sm">Email Support</p>
                        <p className="text-white font-semibold">
                          support@quickmind.quiz
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Github className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white/70 text-sm">
                          GitHub Repository
                        </p>
                        <p className="text-white font-semibold text-xs">
                          github.com/aniltanriverdiler/quickmind-quiz
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Globe className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-white/70 text-sm">Live Demo</p>
                        <p className="text-white font-semibold text-xs">
                          quickmind-quiz-app.netlify.app
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/70 text-sm leading-relaxed">
                      We value your feedback! Whether you found a bug, have a
                      feature request, or just want to say hello, we'd love to
                      hear from you.
                    </p>
                  </div>
                </div>

                {/* Feedback Form */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg mb-3">
                    Send Feedback
                  </h3>

                  <form onSubmit={handleSubmitFeedback} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white/90">Name</Label>
                      <Input
                        value={feedback.name}
                        onChange={(e) =>
                          setFeedback({ ...feedback, name: e.target.value })
                        }
                        placeholder="Your name"
                        className="bg-white/15 border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white/90">Email</Label>
                      <Input
                        type="email"
                        value={feedback.email}
                        onChange={(e) =>
                          setFeedback({ ...feedback, email: e.target.value })
                        }
                        placeholder="your.email@example.com"
                        className="bg-white/15 border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white/90">Message</Label>
                      <textarea
                        value={feedback.message}
                        onChange={(e) =>
                          setFeedback({ ...feedback, message: e.target.value })
                        }
                        placeholder="Tell us what you think..."
                        rows={4}
                        className="w-full rounded-md bg-white/15 border border-white/30 text-white placeholder:text-white/70 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 hover:from-blue-500/30 hover:to-cyan-400/30 text-white border border-blue-400/30 hover:border-blue-400/50"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 6. Changelog / Version History */}
        <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BookOpen className="w-5 h-5 text-orange-400" />
              Changelog & Version History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {changelog.map((version, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-400/50 pl-4 py-2 bg-white/5 rounded-r-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-300" />
                    <span className="text-white font-bold">
                      Version {version.version}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        version.type === "major"
                          ? "bg-green-500/20 text-green-300 border border-green-400/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                      }`}
                    >
                      {version.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-white/60 text-sm">
                    <Calendar className="w-3 h-3" />
                    {version.date}
                  </div>
                </div>
                <ul className="space-y-1 text-white/80 text-sm">
                  {version.changes.map((change, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 7. Legal Information */}
        <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Scale className="w-5 h-5 text-indigo-400" />
              Legal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {/* Privacy Policy */}
              <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">
                      Privacy Policy
                    </h4>
                    <p className="text-white/70 text-sm mb-2">
                      We respect your privacy. All quiz data is stored locally
                      in your browser. We do not collect or share personal
                      information with third parties.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                      onClick={() =>
                        toast.info("Privacy Policy page coming soon!")
                      }
                    >
                      Read Full Policy
                    </Button>
                  </div>
                </div>
              </div>

              {/* Terms of Service */}
              <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">
                      Terms of Service
                    </h4>
                    <p className="text-white/70 text-sm mb-2">
                      By using QuickMind Quiz, you agree to our terms of
                      service. The application is provided "as is" for
                      educational purposes.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                      onClick={() =>
                        toast.info("Terms of Service page coming soon!")
                      }
                    >
                      Read Terms
                    </Button>
                  </div>
                </div>
              </div>

              {/* License */}
              <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                <div className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">
                      MIT License
                    </h4>
                    <p className="text-white/70 text-sm mb-2">
                      QuickMind Quiz is open-source software licensed under the
                      MIT License. You are free to use, modify, and distribute
                      this software.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                      onClick={() =>
                        window.open(
                          "https://opensource.org/licenses/MIT",
                          "_blank"
                        )
                      }
                    >
                      View License
                    </Button>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="pt-3 border-t border-white/10">
                <p className="text-white/60 text-xs text-center">
                  © 2025 QuickMind Quiz. All rights reserved. QuickMind™ is a
                  trademark of QuickMind Team.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 8. Contributing */}
        <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <GitPullRequest className="w-5 h-5 text-pink-400" />
              Contributing to QuickMind
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-white/80 leading-relaxed">
                We welcome contributions from the community! Whether you're
                fixing bugs, adding features, or improving documentation, your
                help is appreciated.
              </p>

              {/* How to Contribute */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Github className="w-4 h-4 text-white/70" />
                    <h4 className="text-white font-semibold text-sm">
                      Fork Repository
                    </h4>
                  </div>
                  <p className="text-white/60 text-xs">
                    Fork the repo and create a feature branch
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="w-4 h-4 text-white/70" />
                    <h4 className="text-white font-semibold text-sm">
                      Make Changes
                    </h4>
                  </div>
                  <p className="text-white/60 text-xs">
                    Write clean code following our guidelines
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="w-4 h-4 text-white/70" />
                    <h4 className="text-white font-semibold text-sm">
                      Create PR
                    </h4>
                  </div>
                  <p className="text-white/60 text-xs">
                    Submit a pull request with clear description
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-white/70" />
                    <h4 className="text-white font-semibold text-sm">
                      Code Review
                    </h4>
                  </div>
                  <p className="text-white/60 text-xs">
                    Wait for maintainers to review your code
                  </p>
                </div>
              </div>

              {/* Contribution Guidelines */}
              <div className="pt-3 border-t border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">
                  Contribution Guidelines:
                </h4>
                <ul className="space-y-1 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Follow the existing code style and conventions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Write clear commit messages
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Add tests for new features when applicable
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Update documentation as needed
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                  onClick={() =>
                    window.open(
                      "https://github.com/aniltanriverdiler/quickmind-quiz",
                      "_blank"
                    )
                  }
                >
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                  onClick={() =>
                    window.open(
                      "https://github.com/aniltanriverdiler/quickmind-quiz/issues",
                      "_blank"
                    )
                  }
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Report Issues
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                  onClick={() =>
                    window.open(
                      "https://github.com/aniltanriverdiler/quickmind-quiz#readme",
                      "_blank"
                    )
                  }
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 9. Open Source Libraries & Acknowledgments */}
        <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Package className="w-5 h-5 text-teal-400" />
              Open Source Libraries & Thanks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/80 leading-relaxed">
              QuickMind Quiz is built on the shoulders of giants. We're grateful
              to the open-source community for these amazing libraries:
            </p>

            {/* Libraries Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 px-3 text-white/90 font-semibold">
                      Library
                    </th>
                    <th className="text-left py-2 px-3 text-white/90 font-semibold">
                      License
                    </th>
                    <th className="text-left py-2 px-3 text-white/90 font-semibold">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {openSourceLibraries.map((lib, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-2 px-3 text-white font-medium">
                        {lib.name}
                      </td>
                      <td className="py-2 px-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-400/30">
                          {lib.license}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-white/70">{lib.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Special Thanks */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                Special Thanks
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Special thanks to all open-source contributors, the React
                community, and everyone who has helped make this project
                possible. Your dedication to building better tools inspires us
                every day.
              </p>
            </div>

            {/* Support Open Source */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-pink-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-1">
                    Support Open Source
                  </h4>
                  <p className="text-white/70 text-sm">
                    If you find these libraries useful, consider supporting
                    their maintainers through sponsorships or contributions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center pt-4">
          <p className="text-white/60 text-sm">
            Made with{" "}
            <Heart className="w-4 h-4 inline text-red-400 animate-pulse" /> by
            the QuickMind Team © 2025
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
