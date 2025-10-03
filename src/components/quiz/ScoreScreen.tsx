import { useQuizStore } from "../../store/quizStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  Home,
  RefreshCcw,
  Save,
  PartyPopper,
  ThumbsUp,
  BookOpen,
  Trophy,
  NotebookPen,
  CheckCircle2,
  XCircle,
  Circle,
  ClipboardList,
  Check,
  Star,
  Copy,
  Share2,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Card, CardContent } from "../ui/card";
import { useAuthStore } from "../../store/authStore";
import { useLeaderboardStore } from "../../store/leader";

function ScoreScreen() {
  const { score, shuffledQuestions, userAnswers, resetQuiz } = useQuizStore();
  const { currentUser } = useAuthStore(); //login users
  const navigate = useNavigate();

  const totalQuestions = shuffledQuestions.length;
  const wrongAnswers = userAnswers.filter((a) => a.status === "wrong").length;
  const skippedQuestions = userAnswers.filter(
    (a) => a.status === "skipped"
  ).length;
  const percentage = Math.round((score / totalQuestions) * 100);

  // Additional statistics
  const correctPercentage = Math.round((score / totalQuestions) * 100);
  const wrongPercentage = Math.round((wrongAnswers / totalQuestions) * 100);
  const skippedPercentage = Math.round(
    (skippedQuestions / totalQuestions) * 100
  );

  // Performance level
  const getPerformanceLevel = () => {
    if (percentage >= 90)
      return { level: "Excellent", icon: Star, color: "text-yellow-400" };
    if (percentage >= 80)
      return { level: "Great", icon: Trophy, color: "text-emerald-400" };
    if (percentage >= 70)
      return { level: "Good", icon: ThumbsUp, color: "text-blue-400" };
    if (percentage >= 60)
      return { level: "Fair", icon: Target, color: "text-orange-400" };
    return { level: "Needs Practice", icon: BookOpen, color: "text-red-400" };
  };

  const performance = getPerformanceLevel();
  const PerformanceIcon = performance.icon;

  // Motivation message
  const getMessage = () => {
    if (percentage >= 80) return "🚀 Excellent job!";
    if (percentage >= 50) return "👍 Good effort!";
    return (
      <span className="inline-flex items-center gap-1">
        <NotebookPen className="w-5 h-5 text-orange-400 mt-1" />
        Keep practicing!
      </span>
    );
  };

  // Pick an icon for the heading based on performance
  const HeadingIcon = () => {
    if (percentage >= 80)
      return <PartyPopper className="w-7 h-7 text-emerald-600" />;
    if (percentage >= 50)
      return <ThumbsUp className="w-7 h-7 text-yellow-600" />;
    return <BookOpen className="w-7 h-7 text-muted-foreground" />;
  };

  // Save results (LocalStorage and Leaderboard)
  const handleSaveResults = () => {
    if (!currentUser) {
      toast.error("⚠️ Please login to save your results!");
      return;
    }

    try {
      // Save to quiz history
      const storageKey = `quizHistory_${currentUser.email}`;
      const history = JSON.parse(localStorage.getItem(storageKey) || "[]");

      const newResult = {
        date: new Date().toLocaleString(),
        score,
        totalQuestions,
        wrongAnswers,
        skippedQuestions,
        percentage,
        performanceLevel: performance.level,
      };

      localStorage.setItem(storageKey, JSON.stringify([...history, newResult]));

      // Add to leaderboard with validation
      const addScore = useLeaderboardStore.getState().addScore;
      const displayName =
        (currentUser.name && currentUser.name.trim()) ||
        currentUser.email.split("@")[0] ||
        "Anonymous";

      const safeScore = Number.isFinite(score) && score >= 0 ? score : 0;
      const safePercentage =
        Number.isFinite(percentage) && percentage >= 0 && percentage <= 100
          ? percentage
          : 0;

      addScore(displayName, safeScore, safePercentage);

      toast.success(
        "Your results have been saved and added to leaderboard!"
      );
    } catch (error) {
      console.error("Error saving results:", error);
      toast.error("❌ Failed to save results. Please try again.");
    }
  };

  // Copy results to clipboard
  const handleCopyResults = () => {
    const resultText = `🎯 Quiz Results
Score: ${score}/${totalQuestions} (${percentage}%)
Performance: ${performance.level}
Correct: ${score} (${correctPercentage}%)
Wrong: ${wrongAnswers} (${wrongPercentage}%)
Skipped: ${skippedQuestions} (${skippedPercentage}%)

#QuickMindQuiz #QuizResults`;

    navigator.clipboard
      .writeText(resultText)
      .then(() => {
        toast.success("📋 Results copied to clipboard!");
      })
      .catch(() => {
        toast.error("❌ Failed to copy results");
      });
  };

  // Share results
  const handleShareResults = () => {
    const shareText = `I just scored ${score}/${totalQuestions} (${percentage}%) on QuickMind Quiz! 🎯 #QuickMindQuiz`;

    if (navigator.share) {
      navigator
        .share({
          title: "QuickMind Quiz Results",
          text: shareText,
          url: window.location.origin,
        })
        .catch(() => {
          handleCopyResults();
        });
    } else {
      handleCopyResults();
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6 sm:p-8 space-y-6 text-center mx-auto animate-fadeIn">
      {/* Heading */}
      <div className="flex items-center justify-center gap-3">
        <HeadingIcon />
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
          Quiz Finished!
        </h2>
      </div>

      {/* Summary & Circular Progress */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {/* Circular progress (SVG) */}
        <div className="relative">
          {(() => {
            const size = 140;
            const stroke = 10;
            const radius = (size - stroke) / 2;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference * (1 - percentage / 100);
            return (
              <svg width={size} height={size} className="-rotate-90">
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth={stroke}
                  fill="transparent"
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={
                    percentage >= 80
                      ? "#10b981"
                      : percentage >= 50
                      ? "#f59e0b"
                      : "#9ca3af"
                  }
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
            );
          })()}
          <div className="absolute inset-0 flex flex-col items-center justify-center ">
            <span className="text-3xl font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
              {percentage}%
            </span>
            <span className="text-xs text-white/70">Accuracy</span>
          </div>
        </div>

        {/* Score summary */}
        <div className="text-left space-y-3">
          <p className="text-lg sm:text-xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            You scored <span className="text-cyan-300 font-bold">{score}</span>{" "}
            /<span className="font-bold text-white"> {totalQuestions}</span>
          </p>

          {/* Performance Level */}
          <div className="flex items-center gap-2">
            <PerformanceIcon className={`w-5 h-5 ${performance.color}`} />
            <span className={`text-sm font-semibold ${performance.color}`}>
              {performance.level}
            </span>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-green-500/20 rounded-lg p-2 text-center">
              <div className="text-green-300 font-bold">
                {correctPercentage}%
              </div>
              <div className="text-green-200">Correct</div>
            </div>
            <div className="bg-red-500/20 rounded-lg p-2 text-center">
              <div className="text-red-300 font-bold">{wrongPercentage}%</div>
              <div className="text-red-200">Wrong</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-white/80 font-bold">
                {skippedPercentage}%
              </div>
              <div className="text-white/60">Skipped</div>
            </div>
          </div>

          <div className="mt-3 text-sm text-white/80 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" /> Keep pushing your
            limits!
          </div>
        </div>
      </div>

      {/* Motivation alert */}
      <div
        className={`p-4 rounded-xl border text-sm sm:text-base font-semibold mx-auto max-w-xl backdrop-blur-sm ${
          percentage >= 80
            ? "bg-green-500/20 border-green-400/30 text-green-200"
            : percentage >= 50
            ? "bg-yellow-500/20 border-yellow-400/30 text-yellow-200"
            : "bg-white/10 border-white/20 text-white/80"
        }`}
      >
        {getMessage()}
      </div>

      {/* Correct / Wrong / Skipped stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-green-500/20 border-green-400/30 p-5 text-center backdrop-blur-sm">
          <div className="flex justify-center mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-300" />
          </div>
          <p className="text-sm text-green-200">Correct</p>
          <p className="text-3xl font-extrabold text-green-200">{score}</p>
        </div>
        <div className="rounded-xl border bg-red-500/20 border-red-400/30 p-5 text-center backdrop-blur-sm">
          <div className="flex justify-center mb-2">
            <XCircle className="w-6 h-6 text-red-300" />
          </div>
          <p className="text-sm text-red-200">Wrong</p>
          <p className="text-3xl font-extrabold text-red-200">{wrongAnswers}</p>
        </div>
        <div className="rounded-xl border bg-white/10 border-white/20 p-5 text-center backdrop-blur-sm">
          <div className="flex justify-center mb-2">
            <Circle className="w-6 h-6 text-white/60" />
          </div>
          <p className="text-sm text-white/80">Skipped</p>
          <p className="text-3xl font-extrabold text-white/80">
            {skippedQuestions}
          </p>
        </div>
      </div>

      {/* Wrong / Skipped Answers List in Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="mt-3 bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            📜 Show Wrong & Skipped Answers
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto bg-white/10 backdrop-blur-md border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-center gap-2">
                <ClipboardList className="w-6 h-6 text-white/80" />
                <span>Wrong & Skipped Questions</span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {userAnswers
              .filter((a) => a.status !== "correct")
              .map((a) => (
                <Card
                  key={a.questionIndex}
                  className={`${
                    a.status === "wrong"
                      ? "border-red-400/30 bg-red-500/10"
                      : "border-white/20 bg-white/10"
                  } shadow-sm rounded-xl p-4 backdrop-blur-sm`}
                >
                  <CardContent className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      {a.status === "wrong" ? (
                        <>
                          <XCircle className="w-5 h-5 text-red-300" />
                          <span className="text-sm font-medium text-red-200">
                            Wrong
                          </span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-5 h-5 text-white/60" />
                          <span className="text-sm font-medium text-white/80">
                            Skipped
                          </span>
                        </>
                      )}
                    </div>

                    <p className="font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                      {a.question}
                    </p>

                    {a.status === "wrong" && (
                      <div className="mt-1 flex items-center justify-center gap-2 text-red-300 italic">
                        <XCircle className="w-4 h-4" />
                        <span>Your Answer: {a.selectedAnswer}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-2 text-green-300">
                      <Check className="w-4 h-4" />
                      <span>Correct Answer: {a.correctAnswer}</span>
                    </div>

                    {a.status === "skipped" && (
                      <div className="text-white/60 italic mt-2 flex items-center justify-center gap-2">
                        <Circle className="w-4 h-4" />
                        <span>You skipped this question.</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Buttons */}
      <div className="space-y-4">
        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button
            onClick={handleSaveResults}
            className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20 hover:from-blue-500/30 hover:to-cyan-400/30 text-white border border-blue-400/30 hover:border-blue-400/50 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            <Save className="w-4 h-4 mr-2" /> Save Results
          </Button>
          <Button
            onClick={resetQuiz}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            <RefreshCcw className="w-4 h-4 mr-2" /> New Quiz
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30 hover:border-red-400/50 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            <Home className="w-4 h-4 mr-2" /> Home
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button
            onClick={handleCopyResults}
            variant="outline"
            className="bg-white/5 hover:bg-white/10 text-white border-white/20 hover:border-white/30 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            <Copy className="w-4 h-4 mr-2" /> Copy Results
          </Button>
          <Button
            onClick={handleShareResults}
            variant="outline"
            className="bg-white/5 hover:bg-white/10 text-white border-white/20 hover:border-white/30 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            <Share2 className="w-4 h-4 mr-2" /> Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ScoreScreen;
