import { useQuizStore } from "../store/quizStore";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Home, RefreshCcw, Save } from "lucide-react";
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

function ScoreScreen() {
  const { score, shuffledQuestions, userAnswers, resetQuiz } = useQuizStore();
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
    return "📚 Keep practicing!";
  };

  // Save results (LocalStorage)
  const handleSaveResults = () => {
    const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    const newResult = {
      date: new Date().toLocaleString(),
      score,
      totalQuestions,
      wrongAnswers,
      skippedQuestions,
    };
    localStorage.setItem(
      "quizHistory",
      JSON.stringify([...history, newResult])
    );
    toast.success("✅ Results saved successfully!");
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 space-y-6 text-center">
      <h2 className="text-3xl font-bold">Quiz Finished! 🎉</h2>

      <p className="text-xl">
        You scored <span className="text-blue-600 font-bold">{score}</span> /
        <span className="font-bold"> {totalQuestions}</span>
      </p>

      {/* Success Message */}
      <p className="text-lg font-semibold">{getMessage()}</p>

      {/* Detailed score summary */}
      <div className="bg-gray-100 rounded-lg p-4 text-left space-y-2">
        <p>✅ Correct Answers: {score}</p>
        <p>❌ Wrong Answers: {wrongAnswers}</p>
        <p>⚪ Skipped: {skippedQuestions}</p>
      </div>

      {/* Wrong / Skipped Answers List in Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-3">
            📜 Show Wrong & Skipped Answers
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Wrong & Skipped Questions
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {userAnswers
              .filter((a) => a.status !== "correct")
              .map((a) => (
                <Card
                  key={a.questionId}
                  className="border shadow-sm rounded-lg p-3"
                >
                  <CardContent>
                    <p className="font-semibold">{a.question}</p>

                    {a.status === "wrong" && (
                      <p className="text-red-600 mt-2">
                        ❌ Your Answer: {a.selectedAnswer}
                      </p>
                    )}

                    <p className="text-green-600">
                      ✅ Correct Answer: {a.correctAnswer}
                    </p>

                    {a.status === "skipped" && (
                      <p className="text-gray-500 italic mt-2">
                        ⚪ You skipped this question.
                      </p>
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
      <div className="flex justify-between gap-3 mt-4">
        <Button variant="outline" onClick={() => navigate("/")}>
          <Home className="w-4 h-4" /> Home
        </Button>
        <Button variant="secondary" onClick={resetQuiz}>
          <RefreshCcw className="w-4 h-4" /> New Quiz
        </Button>
        <Button variant="default" onClick={handleSaveResults}>
          <Save className="w-4 h-4" /> Save Results
        </Button>
      </div>
    </div>
  );
}

export default ScoreScreen;
