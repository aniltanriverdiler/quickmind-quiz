import { useQuizStore } from "../store/quizStore";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Home, RefreshCcw, Save, PartyPopper, ThumbsUp, BookOpen, Trophy, NotebookPen, CheckCircle2, XCircle, Circle, ClipboardList, Check } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Card, CardContent } from "./ui/card";
import { useAuthStore } from "../store/authStore";

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
    if (percentage >= 80) return <PartyPopper className="w-7 h-7 text-emerald-600" />;
    if (percentage >= 50) return <ThumbsUp className="w-7 h-7 text-yellow-600" />;
    return <BookOpen className="w-7 h-7 text-muted-foreground" />;
  };

  // Save results (LocalStorage)
  const handleSaveResults = () => {
    if (!currentUser) {
      toast.error("⚠️ Please login to save your results!");
      return;
    }

    const storageKey = `quizHistory_${currentUser.email}`;
    const history = JSON.parse(localStorage.getItem(storageKey) || "[]");
   
    const newResult = {
      date: new Date().toLocaleString(),
      score,
      totalQuestions,
      wrongAnswers,
      skippedQuestions,
      percentage,
    };

    localStorage.setItem(storageKey, JSON.stringify([...history, newResult]));
    toast.success("✅ Your results have been saved!");
  };

  return (
    <div className="w-full max-w-3xl bg-card shadow-md rounded-xl p-4 sm:p-6 space-y-6 text-center mx-auto animate-fadeIn">
      {/* Heading */}
      <div className="flex items-center justify-center gap-3">
        <HeadingIcon />
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
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
                  stroke={percentage >= 80 ? "#10b981" : percentage >= 50 ? "#f59e0b" : "#9ca3af"}
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
            <span className="text-3xl font-extrabold">{percentage}%</span>
            <span className="text-xs text-muted-foreground">Accuracy</span>
          </div>
        </div>

        {/* Score summary */}
        <div className="text-left">
          <p className="text-lg sm:text-xl">
            You scored <span className="text-primary font-bold">{score}</span> /
            <span className="font-bold"> {totalQuestions}</span>
          </p>
          <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
            <Trophy className="w-4 h-4 text-orange-400" /> Keep pushing your limits!
          </div>
        </div>
      </div>

      {/* Motivation alert */}
      <div className={`p-3 rounded-lg border text-sm sm:text-base font-semibold mx-auto max-w-xl ${percentage >= 80 ? "bg-emerald-50 border-emerald-200 text-emerald-700" : percentage >= 50 ? "bg-yellow-50 border-yellow-200 text-yellow-700" : "bg-gray-50 border-gray-200 text-gray-700"}`}>
        {getMessage()}
      </div>

      {/* Correct / Wrong / Skipped stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-emerald-50 border-emerald-200 p-5 text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm text-emerald-700">Correct</p>
          <p className="text-3xl font-extrabold text-emerald-700">{score}</p>
        </div>
        <div className="rounded-lg border bg-red-50 border-red-200 p-5 text-center">
          <div className="flex justify-center mb-2">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-sm text-red-700">Wrong</p>
          <p className="text-3xl font-extrabold text-red-700">{wrongAnswers}</p>
        </div>
        <div className="rounded-lg border bg-gray-50 border-gray-200 p-5 text-center">
          <div className="flex justify-center mb-2">
            <Circle className="w-6 h-6 text-gray-500" />
          </div>
          <p className="text-sm text-gray-700">Skipped</p>
          <p className="text-3xl font-extrabold text-gray-700">{skippedQuestions}</p>
        </div>
      </div>

      {/* Wrong / Skipped Answers List in Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-3">📜 Show Wrong & Skipped Answers</Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold">
              <div className="flex items-center justify-center gap-2">
                <ClipboardList className="w-6 h-6 text-muted-foreground" />
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
                  className={`${a.status === "wrong" ? "border-red-300" : "border-gray-300"} shadow-sm rounded-lg p-3 bg-muted/60`}
                >
                  <CardContent className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      {a.status === "wrong" ? (
                        <>
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="text-sm font-medium text-red-700">Wrong</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-5 h-5 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Skipped</span>
                        </>
                      )}
                    </div>

                    <p className="font-semibold">{a.question}</p>

                    {a.status === "wrong" && (
                      <div className="mt-1 flex items-center justify-center gap-2 text-destructive italic">
                        <XCircle className="w-4 h-4" />
                        <span>Your Answer: {a.selectedAnswer}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-2 text-green-700">
                      <Check className="w-4 h-4" />
                      <span>Correct Answer: {a.correctAnswer}</span>
                    </div>

                    {a.status === "skipped" && (
                      <div className="text-muted-foreground italic mt-2 flex items-center justify-center gap-2">
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
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
        <Button variant="default" onClick={handleSaveResults}> <Save className="w-4 h-4" /> Save Results </Button>
        <Button variant="secondary" onClick={resetQuiz}> <RefreshCcw className="w-4 h-4" /> New Quiz </Button>
        <Button variant="outline" onClick={() => navigate("/")}> <Home className="w-4 h-4" /> Home </Button>
      </div>
    </div>
  );
}

export default ScoreScreen;
