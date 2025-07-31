import { useQuizStore } from "../store/quizStore";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, RefreshCcw, Save } from "lucide-react";
import { toast } from "sonner";

function ScoreScreen() {
  const { score, shuffledQuestions, userAnswers, resetQuiz } = useQuizStore(); // ✅ userAnswers ekledik
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

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

      {/* Wrong / Skipped Answers List */}
      <div className="text-left">
        <Button
          variant="outline"
          onClick={() => setShowDetails(!showDetails)}
          className="mb-3"
        >
          {showDetails ? "Hide Details" : "Show Wrong & Skipped Answers"}
        </Button>

        {showDetails && (
          <div className="space-y-3">
            {userAnswers
              .filter((a) => a.status !== "correct")
              .map((a) => (
                <div
                  key={a.questionId}
                  className="border rounded-md p-3 bg-gray-50 shadow-sm"
                >
                  <p className="font-semibold">{a.question}</p>
                  {a.status === "wrong" && (
                    <p className="text-red-600">
                      ❌ Your Answer: {a.selectedAnswer}
                    </p>
                  )}
                  <p className="text-green-600">
                    ✅ Correct Answer: {a.correctAnswer}
                  </p>
                  {a.status === "skipped" && (
                    <p className="text-gray-500 italic">
                      ⚪ You skipped this question.
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
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
