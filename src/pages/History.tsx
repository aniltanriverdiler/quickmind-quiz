import { useAuthStore } from "../store/authStore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import bgVideo from "../assets/color-smoke-14.mp4";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import {
  Trophy,
  LineChart,
  CalendarClock,
  UserCircle2,
  Medal,
  Gamepad2,
  CheckCircle2,
  XCircle,
  CircleDashed,
  Download,
  RotateCcw,
  BarChart3,
  Search,
  TrendingUp,
  TrendingDown,
  Copy,
  Share2,
  Calendar,
  Target,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// @ts-expect-error - file-saver doesn't have TypeScript declarations
import { saveAs } from "file-saver";

// Represents a single quiz history record stored in localStorage
type QuizHistoryItem = {
  date: string;
  score: number; // correct answers count
  wrongAnswers: number;
  skippedQuestions: number;
  percentage: number;
};

function History() {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizHistoryItem[]>([]);
  const [sortKey, setSortKey] = useState<
    "date_desc" | "date_asc" | "percent_desc" | "percent_asc"
  >("date_desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<
    "all" | "week" | "month" | "year"
  >("all");
  const [scoreFilter, setScoreFilter] = useState<
    "all" | "excellent" | "good" | "fair" | "poor"
  >("all");
  const [showStats, setShowStats] = useState(true);

  // Export functions
  const exportToCSV = () => {
    if (!currentUser) return;

    const headers = ["Date", "Correct", "Wrong", "Skipped", "Percentage"];
    const csvContent = [
      headers.join(","),
      ...results.map((result) =>
        [
          result.date,
          result.score,
          result.wrongAnswers,
          result.skippedQuestions,
          result.percentage,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `quiz-history-${currentUser.email.split("@")[0]}.csv`);
  };

  const exportToJSON = () => {
    if (!currentUser) return;

    const jsonContent = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonContent], {
      type: "application/json;charset=utf-8;",
    });
    saveAs(blob, `quiz-history-${currentUser.email.split("@")[0]}.json`);
  };

  const resetHistory = () => {
    if (!currentUser) return;

    const storageKey = `quizHistory_${currentUser.email}`;
    localStorage.removeItem(storageKey);
    setResults([]);
  };

  // Copy quiz stats to clipboard
  const copyStats = () => {
    const statsText = `📊 My Quiz Statistics
🎯 Total Quizzes: ${summary.totalQuizzes}
✅ Correct Answers: ${summary.totalCorrect}
❌ Wrong Answers: ${summary.totalWrong}
⏭️ Skipped: ${summary.totalSkipped}
📈 Average Score: ${summary.averagePercentage}%
🏆 Best Score: ${summary.bestPercentage}%

#QuickMindQuiz #Statistics`;

    navigator.clipboard
      .writeText(statsText)
      .then(() => {
        // Toast notification would go here
        alert("Statistics copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy statistics");
      });
  };

  // Share quiz stats
  const shareStats = () => {
    const shareText = `Check out my QuickMind Quiz stats! 📊 ${summary.totalQuizzes} quizzes completed with ${summary.averagePercentage}% average score! 🎯`;

    if (navigator.share) {
      navigator
        .share({
          title: "My Quiz Statistics",
          text: shareText,
          url: window.location.origin,
        })
        .catch(() => {
          copyStats();
        });
    } else {
      copyStats();
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const storageKey = `quizHistory_${currentUser.email}`;
    const history = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setResults(history);
  }, [currentUser, navigate]);

  // Filtered and sorted results
  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...results];

    // Date filtering
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(
        (result) => new Date(result.date) >= filterDate
      );
    }

    // Score filtering
    if (scoreFilter !== "all") {
      filtered = filtered.filter((result) => {
        switch (scoreFilter) {
          case "excellent":
            return result.percentage >= 90;
          case "good":
            return result.percentage >= 70 && result.percentage < 90;
          case "fair":
            return result.percentage >= 50 && result.percentage < 70;
          case "poor":
            return result.percentage < 50;
          default:
            return true;
        }
      });
    }

    // Search filtering
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (result) =>
          result.date.toLowerCase().includes(searchLower) ||
          result.percentage.toString().includes(searchLower)
      );
    }

    // Sorting
    switch (sortKey) {
      case "date_asc":
        return filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "percent_desc":
        return filtered.sort((a, b) => b.percentage - a.percentage);
      case "percent_asc":
        return filtered.sort((a, b) => a.percentage - b.percentage);
      case "date_desc":
      default:
        return filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
  }, [results, sortKey, searchTerm, dateFilter, scoreFilter]);

  // Summary statistics displayed at the top of the dashboard
  const summary = useMemo(() => {
    const totalQuizzes = results.length;
    const totals = results.reduce(
      (acc, item) => {
        acc.correct += item.score;
        acc.wrong += item.wrongAnswers;
        acc.skipped += item.skippedQuestions;
        acc.percentageSum += item.percentage;
        return acc;
      },
      { correct: 0, wrong: 0, skipped: 0, percentageSum: 0 }
    );
    const averagePercentage =
      totalQuizzes > 0 ? Math.round(totals.percentageSum / totalQuizzes) : 0;
    const bestPercentage =
      totalQuizzes > 0 ? Math.max(...results.map((r) => r.percentage)) : 0;
    return {
      totalQuizzes,
      totalCorrect: totals.correct,
      totalWrong: totals.wrong,
      totalSkipped: totals.skipped,
      averagePercentage,
      bestPercentage,
    };
  }, [results]);

  // Player profile information derived from user and history
  const profile = useMemo(() => {
    const fullName =
      currentUser?.name || (currentUser?.email?.split("@")[0] ?? "Player");
    const username = fullName.split(" ")[0]; // Extract only first name
    const joined =
      results.length > 0
        ? new Date(
            results
              .map((r) => new Date(r.date).getTime())
              .reduce((min, t) => Math.min(min, t), Date.now())
          ).toLocaleDateString()
        : new Date().toLocaleDateString();
    const average = summary.averagePercentage;
    const level =
      average >= 80 ? "Expert" : average >= 50 ? "Intermediate" : "Beginner";
    const title = "Quiz Enthusiast"; // subtitle under the name
    return { username, joined, level, title };
  }, [currentUser, results, summary.averagePercentage]);

  // Chart data for line chart
  const chartData = useMemo(() => {
    return results
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((result, index) => ({
        date: new Date(result.date).toLocaleDateString(),
        percentage: result.percentage,
        correct: result.score,
        wrong: result.wrongAnswers,
        skipped: result.skippedQuestions,
        index: index + 1,
      }));
  }, [results]);

  // Last quiz data
  const lastQuiz = useMemo(() => {
    if (results.length === 0) return null;
    return results.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  }, [results]);

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
      <div className="relative z-20 max-w-5xl mx-auto pt-8 sm:pt-10 pb-8 p-4 sm:p-6">
        {/* Gamified player card */}
        <Card className="mb-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar (fallback to brain icon) */}
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center ring-4 ring-white/20 overflow-hidden">
                <UserCircle2 className="h-14 w-14 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                    {profile.username.toUpperCase()}
                  </h2>
                  <Medal className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-sm text-white/80">{profile.title}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-white/70">
                  <span className="inline-flex items-center gap-1">
                    <CalendarClock className="h-4 w-4" /> Member since:{" "}
                    {profile.joined}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Trophy className="h-4 w-4" /> Level: {profile.level}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                <Input
                  placeholder="Search history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-40 bg-white/10 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
                />
              </div>

              {/* Date Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {dateFilter === "all"
                      ? "All Time"
                      : dateFilter === "week"
                      ? "This Week"
                      : dateFilter === "month"
                      ? "This Month"
                      : "This Year"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white/10 backdrop-blur-md border border-white/20">
                  <DropdownMenuLabel className="text-white">
                    Filter by Date
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={dateFilter === "all"}
                    onCheckedChange={() => setDateFilter("all")}
                    className="text-white hover:bg-white/10"
                  >
                    All Time
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={dateFilter === "week"}
                    onCheckedChange={() => setDateFilter("week")}
                    className="text-white hover:bg-white/10"
                  >
                    This Week
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={dateFilter === "month"}
                    onCheckedChange={() => setDateFilter("month")}
                    className="text-white hover:bg-white/10"
                  >
                    This Month
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={dateFilter === "year"}
                    onCheckedChange={() => setDateFilter("year")}
                    className="text-white hover:bg-white/10"
                  >
                    This Year
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Score Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    {scoreFilter === "all"
                      ? "All Scores"
                      : scoreFilter === "excellent"
                      ? "90%+"
                      : scoreFilter === "good"
                      ? "70-89%"
                      : scoreFilter === "fair"
                      ? "50-69%"
                      : "&lt;50%"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white/10 backdrop-blur-md border border-white/20">
                  <DropdownMenuLabel className="text-white">
                    Filter by Score
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={scoreFilter === "all"}
                    onCheckedChange={() => setScoreFilter("all")}
                    className="text-white hover:bg-white/10"
                  >
                    All Scores
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={scoreFilter === "excellent"}
                    onCheckedChange={() => setScoreFilter("excellent")}
                    className="text-white hover:bg-white/10"
                  >
                    Excellent (90%+)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={scoreFilter === "good"}
                    onCheckedChange={() => setScoreFilter("good")}
                    className="text-white hover:bg-white/10"
                  >
                    Good (70-89%)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={scoreFilter === "fair"}
                    onCheckedChange={() => setScoreFilter("fair")}
                    className="text-white hover:bg-white/10"
                  >
                    Fair (50-69%)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={scoreFilter === "poor"}
                    onCheckedChange={() => setScoreFilter("poor")}
                    className="text-white hover:bg-white/10"
                  >
                    Poor (&lt;50%)
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                  >
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white/10 backdrop-blur-md border border-white/20">
                  <DropdownMenuLabel className="text-white">
                    Sort by
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/20" />
                  <DropdownMenuCheckboxItem
                    checked={sortKey === "date_desc"}
                    onCheckedChange={() => setSortKey("date_desc")}
                    className="text-white hover:bg-white/10"
                  >
                    Date (newest)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortKey === "date_asc"}
                    onCheckedChange={() => setSortKey("date_asc")}
                    className="text-white hover:bg-white/10"
                  >
                    Date (oldest)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortKey === "percent_desc"}
                    onCheckedChange={() => setSortKey("percent_desc")}
                    className="text-white hover:bg-white/10"
                  >
                    Percentage (high to low)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortKey === "percent_asc"}
                    onCheckedChange={() => setSortKey("percent_asc")}
                    className="text-white hover:bg-white/10"
                  >
                    Percentage (low to high)
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                onClick={() => navigate("/quiz")}
                className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20 hover:from-blue-500/30 hover:to-cyan-400/30 text-white border border-blue-400/30 hover:border-blue-400/50 backdrop-blur-sm shadow-sm hover:shadow-md"
              >
                <Gamepad2 className="w-7 h-7" />
                <span className="ml-1">Start New Quiz</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Toggle and Share */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowStats(!showStats)}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm"
            >
              {showStats ? (
                <EyeOff className="h-4 w-4 mr-2" />
              ) : (
                <Eye className="h-4 w-4 mr-2" />
              )}
              {showStats ? "Hide Stats" : "Show Stats"}
            </Button>
            <span className="text-white/60 text-sm">
              Showing {filteredAndSortedResults.length} of {results.length}{" "}
              results
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={copyStats}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Stats
            </Button>
            <Button
              onClick={shareStats}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Stats
            </Button>
          </div>
        </div>

        {/* Summary cards with icons */}
        {showStats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {/* Total Quizzes Card */}
            <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-sm text-white/80 flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-cyan-400" /> Total Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-cyan-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                    {summary.totalQuizzes}
                  </div>
                  <div className="w-12 h-12">
                    <CircularProgressbar
                      value={Math.min((summary.totalQuizzes / 20) * 100, 100)}
                      text=""
                      styles={buildStyles({
                        pathColor:
                          summary.totalQuizzes >= 15
                            ? "#10b981"
                            : summary.totalQuizzes >= 8
                            ? "#f59e0b"
                            : "#ef4444",
                        trailColor: "rgba(255,255,255,0.2)",
                        textSize: "0px",
                      })}
                    />
                  </div>
                </div>
                <div className="text-xs text-white/70 mt-1">
                  {summary.totalQuizzes >= 15
                    ? "High Activity"
                    : summary.totalQuizzes >= 8
                    ? "Medium Activity"
                    : "Low Activity"}
                </div>
              </CardContent>
            </Card>

            {/* Total Correct Card */}
            <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-sm text-white/80 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" /> Total
                  Correct
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-green-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                    {summary.totalCorrect}
                  </div>
                  <div className="w-12 h-12">
                    <CircularProgressbar
                      value={Math.min((summary.totalCorrect / 100) * 100, 100)}
                      text=""
                      styles={buildStyles({
                        pathColor:
                          summary.totalCorrect >= 75
                            ? "#10b981"
                            : summary.totalCorrect >= 40
                            ? "#f59e0b"
                            : "#ef4444",
                        trailColor: "rgba(255,255,255,0.2)",
                        textSize: "0px",
                      })}
                    />
                  </div>
                </div>
                <div className="text-xs text-white/70 mt-1">
                  {summary.totalCorrect >= 75
                    ? "Excellent"
                    : summary.totalCorrect >= 40
                    ? "Good"
                    : "Keep Going"}
                </div>
              </CardContent>
            </Card>

            {/* Total Wrong Card */}
            <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-sm text-white/80 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" /> Total Wrong
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-red-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                    {summary.totalWrong}
                  </div>
                  <div className="w-12 h-12">
                    <CircularProgressbar
                      value={Math.min((summary.totalWrong / 50) * 100, 100)}
                      text=""
                      styles={buildStyles({
                        pathColor:
                          summary.totalWrong <= 10
                            ? "#10b981"
                            : summary.totalWrong <= 25
                            ? "#f59e0b"
                            : "#ef4444",
                        trailColor: "rgba(255,255,255,0.2)",
                        textSize: "0px",
                      })}
                    />
                  </div>
                </div>
                <div className="text-xs text-white/70 mt-1">
                  {summary.totalWrong <= 10
                    ? "Very Low"
                    : summary.totalWrong <= 25
                    ? "Moderate"
                    : "High"}
                </div>
              </CardContent>
            </Card>

            {/* Total Skipped Card */}
            <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-sm text-white/80 flex items-center gap-2">
                  <CircleDashed className="h-4 w-4 text-white/60" /> Total
                  Skipped
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                    {summary.totalSkipped}
                  </div>
                  <div className="w-12 h-12">
                    <CircularProgressbar
                      value={Math.min((summary.totalSkipped / 30) * 100, 100)}
                      text=""
                      styles={buildStyles({
                        pathColor:
                          summary.totalSkipped <= 5
                            ? "#10b981"
                            : summary.totalSkipped <= 15
                            ? "#f59e0b"
                            : "#ef4444",
                        trailColor: "rgba(255,255,255,0.2)",
                        textSize: "0px",
                      })}
                    />
                  </div>
                </div>
                <div className="text-xs text-white/70 mt-1">
                  {summary.totalSkipped <= 5
                    ? "Very Low"
                    : summary.totalSkipped <= 15
                    ? "Moderate"
                    : "High"}
                </div>
              </CardContent>
            </Card>

            {/* Average Score Card */}
            <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-full -translate-y-8 translate-x-8"></div>
              <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-sm text-white/80 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-400" /> Average Score
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 flex items-center justify-center">
                <div className="w-20 h-20">
                  <CircularProgressbar
                    value={summary.averagePercentage}
                    text={`${summary.averagePercentage}%`}
                    styles={buildStyles({
                      pathColor:
                        summary.averagePercentage >= 80
                          ? "#10b981"
                          : summary.averagePercentage >= 50
                          ? "#f59e0b"
                          : "#ef4444",
                      textColor: "#ffffff",
                      trailColor: "rgba(255,255,255,0.2)",
                      textSize: "16px",
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Line Chart and Last Quiz Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                <BarChart3 className="h-5 w-5 text-cyan-400" />
                Score Progress Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.2)"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12, fill: "rgba(255,255,255,0.8)" }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 12, fill: "rgba(255,255,255,0.8)" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                        color: "white",
                      }}
                      formatter={(value: number, name: string) => [
                        `${value}%`,
                        name === "percentage" ? "Score" : name,
                      ]}
                      labelFormatter={(label: string) => `Date: ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="percentage"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#06b6d4", strokeWidth: 2 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-white/60">
                  No data available for chart
                </div>
              )}
            </CardContent>
          </Card>

          {/* Last Quiz Card */}
          <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
            <CardHeader className="relative z-10 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                  <Medal className="h-5 w-5 text-yellow-400" />
                  Last Quiz
                </CardTitle>
                <div className="text-xs text-white/70 font-medium">
                  {lastQuiz?.date}
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              {lastQuiz ? (
                <div className="space-y-6">
                  {/* Circular Progress Bar for Percentage */}
                  <div className="flex justify-center">
                    <div className="w-32 h-32">
                      <CircularProgressbar
                        value={lastQuiz.percentage}
                        text={`${lastQuiz.percentage}%`}
                        styles={buildStyles({
                          pathColor:
                            lastQuiz.percentage >= 80
                              ? "#10b981"
                              : lastQuiz.percentage >= 50
                              ? "#f59e0b"
                              : "#ef4444",
                          textColor: "#ffffff",
                          trailColor: "rgba(255,255,255,0.2)",
                          textSize: "24px",
                        })}
                      />
                    </div>
                  </div>

                  {/* Stats with Visual Progress Bars */}
                  <div className="space-y-3">
                    {/* Correct Answers */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="font-medium text-green-300">
                            Correct
                          </span>
                        </div>
                        <span className="font-bold text-green-300">
                          {lastQuiz.score}
                        </span>
                      </div>
                      <div className="w-full bg-green-500/20 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              (lastQuiz.score /
                                (lastQuiz.score +
                                  lastQuiz.wrongAnswers +
                                  lastQuiz.skippedQuestions)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Wrong Answers */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-400" />
                          <span className="font-medium text-red-300">
                            Wrong
                          </span>
                        </div>
                        <span className="font-bold text-red-300">
                          {lastQuiz.wrongAnswers}
                        </span>
                      </div>
                      <div className="w-full bg-red-500/20 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              (lastQuiz.wrongAnswers /
                                (lastQuiz.score +
                                  lastQuiz.wrongAnswers +
                                  lastQuiz.skippedQuestions)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Skipped Questions */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <CircleDashed className="h-4 w-4 text-white/60" />
                          <span className="font-medium text-white/80">
                            Skipped
                          </span>
                        </div>
                        <span className="font-bold text-white/80">
                          {lastQuiz.skippedQuestions}
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-white/60 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              (lastQuiz.skippedQuestions /
                                (lastQuiz.score +
                                  lastQuiz.wrongAnswers +
                                  lastQuiz.skippedQuestions)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-white/60">
                  <div className="text-center space-y-2">
                    <Medal className="h-12 w-12 mx-auto text-white/30" />
                    <p className="text-sm">No quiz history available</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Export and Reset Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button
              onClick={exportToCSV}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={exportToJSON}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
            >
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30 hover:border-red-400/50 backdrop-blur-sm shadow-sm hover:shadow-md"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white/10 backdrop-blur-md border border-white/20">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">
                  Reset Quiz History
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white/80">
                  Are you sure you want to delete all your quiz history? This
                  action cannot be undone and will permanently remove all your
                  quiz results, scores, and progress data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={resetHistory}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30 hover:border-red-400/50"
                >
                  Yes, Reset History
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* History cards */}
        {filteredAndSortedResults.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <CardContent className="py-8 text-center text-white/60">
              No quiz history found.
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredAndSortedResults.map((result, index) => {
              const isRecentBest = result.percentage === summary.bestPercentage;
              const trend =
                index > 0 && filteredAndSortedResults[index - 1]
                  ? result.percentage -
                    filteredAndSortedResults[index - 1].percentage
                  : 0;

              return (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Medal
                          className={`h-6 w-6 ${
                            isRecentBest ? "text-yellow-400" : "text-white/60"
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                              {result.percentage}% Score
                            </div>
                            {isRecentBest && (
                              <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full border border-yellow-400/30">
                                Best
                              </span>
                            )}
                            {trend > 0 && (
                              <TrendingUp className="h-4 w-4 text-green-400" />
                            )}
                            {trend < 0 && (
                              <TrendingDown className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                          <div className="text-xs text-white/70">
                            {result.date}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-1 justify-end">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="font-semibold text-green-300">
                            {result.score}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                          <XCircle className="h-4 w-4 text-red-400" />
                          <span className="font-semibold text-red-300">
                            {result.wrongAnswers}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                          <CircleDashed className="h-4 w-4 text-white/60" />
                          <span className="font-semibold text-white/80">
                            {result.skippedQuestions}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
