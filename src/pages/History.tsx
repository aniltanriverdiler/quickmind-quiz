import { useAuthStore } from "../store/authStore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
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
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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

  // Export functions
  const exportToCSV = () => {
    if (!currentUser) return;
    
    const headers = ["Date", "Correct", "Wrong", "Skipped", "Percentage"];
    const csvContent = [
      headers.join(","),
      ...results.map(result => [
        result.date,
        result.score,
        result.wrongAnswers,
        result.skippedQuestions,
        result.percentage
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `quiz-history-${currentUser.email.split("@")[0]}.csv`);
  };

  const exportToJSON = () => {
    if (!currentUser) return;
    
    const jsonContent = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
    saveAs(blob, `quiz-history-${currentUser.email.split("@")[0]}.json`);
  };

  const resetHistory = () => {
    if (!currentUser) return;
    
    const storageKey = `quizHistory_${currentUser.email}`;
    localStorage.removeItem(storageKey);
    setResults([]);
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

  // Derived, sorted results based on user's preference
  const sortedResults = useMemo(() => {
    const copy = [...results];
    switch (sortKey) {
      case "date_asc":
        return copy.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "percent_desc":
        return copy.sort((a, b) => b.percentage - a.percentage);
      case "percent_asc":
        return copy.sort((a, b) => a.percentage - b.percentage);
      case "date_desc":
      default:
        return copy.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
  }, [results, sortKey]);

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
        index: index + 1
      }));
  }, [results]);

  // Last quiz data
  const lastQuiz = useMemo(() => {
    if (results.length === 0) return null;
    return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  }, [results]);

  return (
    <div className="max-w-5xl mx-auto mt-8 sm:mt-10 p-4 sm:p-6">
      {/* Gamified player card */}
      <Card className="mb-6">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar (fallback to brain icon) */}
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center ring-4 ring-background overflow-hidden">
              <UserCircle2 className="h-14 w-14 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {profile.username.toUpperCase()}
                </h2>
                <Medal className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-sm text-muted-foreground">{profile.title}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
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
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={sortKey === "date_desc"}
                  onCheckedChange={() => setSortKey("date_desc")}
                >
                  Date (newest)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortKey === "date_asc"}
                  onCheckedChange={() => setSortKey("date_asc")}
                >
                  Date (oldest)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortKey === "percent_desc"}
                  onCheckedChange={() => setSortKey("percent_desc")}
                >
                  Percentage (high to low)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortKey === "percent_asc"}
                  onCheckedChange={() => setSortKey("percent_asc")}
                >
                  Percentage (low to high)
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => navigate("/quiz")}>
              <Gamepad2 className="w-7 h-7" />
              <span className="ml-1">Start New Quiz</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary cards with icons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {/* Total Quizzes Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-full -translate-y-8 translate-x-8"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <LineChart className="h-4 w-4 text-indigo-500" /> Total Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-indigo-600">
                {summary.totalQuizzes}
              </div>
              <div className="w-12 h-12">
                <CircularProgressbar
                  value={Math.min((summary.totalQuizzes / 20) * 100, 100)}
                  text=""
                  styles={buildStyles({
                    pathColor: summary.totalQuizzes >= 15 ? "#10b981" : summary.totalQuizzes >= 8 ? "#f59e0b" : "#ef4444",
                    trailColor: "#e5e7eb",
                    textSize: "0px",
                  })}
                />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {summary.totalQuizzes >= 15 ? "High Activity" : summary.totalQuizzes >= 8 ? "Medium Activity" : "Low Activity"}
            </div>
          </CardContent>
        </Card>

        {/* Total Correct Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full -translate-y-8 translate-x-8"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" /> Total Correct
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-green-600">
                {summary.totalCorrect}
              </div>
              <div className="w-12 h-12">
                <CircularProgressbar
                  value={Math.min((summary.totalCorrect / 100) * 100, 100)}
                  text=""
                  styles={buildStyles({
                    pathColor: summary.totalCorrect >= 75 ? "#10b981" : summary.totalCorrect >= 40 ? "#f59e0b" : "#ef4444",
                    trailColor: "#e5e7eb",
                    textSize: "0px",
                  })}
                />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {summary.totalCorrect >= 75 ? "Excellent" : summary.totalCorrect >= 40 ? "Good" : "Keep Going"}
            </div>
          </CardContent>
        </Card>

        {/* Total Wrong Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full -translate-y-8 translate-x-8"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" /> Total Wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-red-600">
                {summary.totalWrong}
              </div>
              <div className="w-12 h-12">
                <CircularProgressbar
                  value={Math.min((summary.totalWrong / 50) * 100, 100)}
                  text=""
                  styles={buildStyles({
                    pathColor: summary.totalWrong <= 10 ? "#10b981" : summary.totalWrong <= 25 ? "#f59e0b" : "#ef4444",
                    trailColor: "#e5e7eb",
                    textSize: "0px",
                  })}
                />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {summary.totalWrong <= 10 ? "Very Low" : summary.totalWrong <= 25 ? "Moderate" : "High"}
            </div>
          </CardContent>
        </Card>

        {/* Total Skipped Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gray-500/10 rounded-full -translate-y-8 translate-x-8"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <CircleDashed className="h-4 w-4 text-gray-600" /> Total Skipped
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-gray-600">
                {summary.totalSkipped}
              </div>
              <div className="w-12 h-12">
                <CircularProgressbar
                  value={Math.min((summary.totalSkipped / 30) * 100, 100)}
                  text=""
                  styles={buildStyles({
                    pathColor: summary.totalSkipped <= 5 ? "#10b981" : summary.totalSkipped <= 15 ? "#f59e0b" : "#ef4444",
                    trailColor: "#e5e7eb",
                    textSize: "0px",
                  })}
                />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {summary.totalSkipped <= 5 ? "Very Low" : summary.totalSkipped <= 15 ? "Moderate" : "High"}
            </div>
          </CardContent>
        </Card>

        {/* Average Score Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full -translate-y-8 translate-x-8"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" /> Average Score
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 flex items-center justify-center">
            <div className="w-20 h-20">
              <CircularProgressbar
                value={summary.averagePercentage}
                text={`${summary.averagePercentage}%`}
                styles={buildStyles({
                  pathColor: summary.averagePercentage >= 80 ? "#10b981" : summary.averagePercentage >= 50 ? "#f59e0b" : "#ef4444",
                  textColor: "#374151",
                  trailColor: "#e5e7eb",
                  textSize: "16px",
                })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart and Last Quiz Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Score Progress Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `${value}%`, 
                      name === 'percentage' ? 'Score' : name
                    ]}
                    labelFormatter={(label: string) => `Date: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="percentage" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available for chart
              </div>
            )}
          </CardContent>
        </Card>

        {/* Last Quiz Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 shadow-lg border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
          <CardHeader className="relative z-10 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Medal className="h-5 w-5 text-rose-500" />
                Last Quiz
              </CardTitle>
              <div className="text-xs text-muted-foreground font-medium">
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
                        pathColor: lastQuiz.percentage >= 80 ? "#10b981" : lastQuiz.percentage >= 50 ? "#f59e0b" : "#ef4444",
                        textColor: "#1f2937",
                        trailColor: "#e5e7eb",
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
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-700">Correct</span>
                      </div>
                      <span className="font-bold text-green-600">{lastQuiz.score}</span>
                    </div>
                    <div className="w-full bg-green-100 dark:bg-green-900/20 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(lastQuiz.score / (lastQuiz.score + lastQuiz.wrongAnswers + lastQuiz.skippedQuestions)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Wrong Answers */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-red-700">Wrong</span>
                      </div>
                      <span className="font-bold text-red-600">{lastQuiz.wrongAnswers}</span>
                    </div>
                    <div className="w-full bg-red-100 dark:bg-red-900/20 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(lastQuiz.wrongAnswers / (lastQuiz.score + lastQuiz.wrongAnswers + lastQuiz.skippedQuestions)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Skipped Questions */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <CircleDashed className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-gray-700">Skipped</span>
                      </div>
                      <span className="font-bold text-gray-600">{lastQuiz.skippedQuestions}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-900/20 rounded-full h-2">
                      <div 
                        className="bg-gray-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(lastQuiz.skippedQuestions / (lastQuiz.score + lastQuiz.wrongAnswers + lastQuiz.skippedQuestions)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                  <Medal className="h-12 w-12 mx-auto text-muted-foreground/50" />
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
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={exportToJSON} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset History
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Quiz History</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete all your quiz history? This action cannot be undone and will permanently remove all your quiz results, scores, and progress data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={resetHistory} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Yes, Reset History
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* History cards */}
      {sortedResults.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
                No quiz history found.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedResults.map((result, index) => (
            <Card key={index}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Medal className="h-6 w-6 text-rose-500" />
                    <div>
                      <div className="font-medium">
                        {result.percentage}% Score
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.date}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-1 justify-end">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-600">
                        {result.score}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <XCircle className="h-4 w-4 text-destructive" />
                      <span className="font-semibold text-destructive">
                        {result.wrongAnswers}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <CircleDashed className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-muted-foreground">
                        {result.skippedQuestions}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
