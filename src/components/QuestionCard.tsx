import ScoreScreen from "./ScoreScreen";
import { useEffect, useState } from "react";
import { useQuizStore } from "../store/quizStore";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { RefreshCw, SkipForward } from "lucide-react";

function QuestionCard() {
  const {
    shuffledQuestions,
    currentQuestion,
    answerQuestion,
    nextQuestion,
    skipQuestion,
    resetQuiz,
  } = useQuizStore();

  const question = shuffledQuestions[currentQuestion];
  const navigate = useNavigate();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleSkip(); // Auto-skip when time expires
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Quiz finished control
  if (currentQuestion >= shuffledQuestions.length) {
    return <ScoreScreen />;
  }

  // If user submits an answer
  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    if (option === question.correctAnswer) {
      setFeedback("correct");
      answerQuestion(true, option);
    } else {
      setFeedback("wrong");
      answerQuestion(false, option);
    }

    // Auto-advance to the next question after 2 second
    setTimeout(() => {
      handleNext();
    }, 2000);
  };

  // Proceed after answering (not skip)
  const handleNext = () => {
    setSelectedAnswer(null);
    setFeedback(null);
    setTimeLeft(60);
    nextQuestion();
  };

  // Skip function
  const handleSkip = () => {
    setSelectedAnswer(null);
    setFeedback(null);
    setTimeLeft(60);
    skipQuestion();
  };

  // Reset quiz & navigate home
  const handleReset = () => {
    resetQuiz();
    navigate("/");
  };

  if (!question) {
    return <p className="text-center text-xl">Quiz finished!</p>;
  }

  return (
    <div className="w-full max-w-xl bg-card shadow-md rounded-xl p-4 sm:p-6 space-y-6 mx-auto animate-fadeIn">
      {/* Header with Progress Bar & Timer */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-semibold">
          Question {currentQuestion + 1} / {shuffledQuestions.length}
        </h2>
        <span className="text-primary dark:text-gray-200 font-bold text-lg px-3 py-1 rounded-lg bg-primary/10 dark:bg-primary border border-primary/20 shadow-sm">
          {timeLeft}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-muted rounded-full">
        <div
          className="h-2 bg-primary dark:bg-gray-200 rounded-full transition-all duration-300"
          style={{
            width: `${
              ((currentQuestion + 1) / shuffledQuestions.length) * 100
            }%`,
          }}
        />
      </div>

      {/* Question */}
      <p className="text-base sm:text-lg font-medium text-foreground/90">
        {question.question}
      </p>

      {/* Options */}
      <div className="grid gap-3">
        {question.options.map((option) => (
          <Button
            key={option}
            variant="outline"
            className={`justify-start w-full transition-all duration-200
              ${
                selectedAnswer === option && feedback === "correct"
                  ? "bg-green-600/90 text-white"
                  : ""
              }
              ${
                selectedAnswer === option && feedback === "wrong"
                  ? "bg-destructive text-white"
                  : ""
              }
            `}
            onClick={() => handleAnswer(option)}
            disabled={!!selectedAnswer}
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Feedback Message */}
      {selectedAnswer && (
        <div className="text-center mt-2">
          {feedback === "correct" && (
            <p className="text-green-600 font-semibold text-lg">✅ Correct!</p>
          )}
          {feedback === "wrong" && (
            <div>
              <p className="text-red-600 font-semibold text-lg">❌ Wrong!</p>
              <p className="text-gray-700 dark:text-gray-200 mt-1">
                ✅ Correct Answer:{" "}
                <span className="font-bold">{question.correctAnswer}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        {/* Reset Quiz */}
        <Button variant="destructive" onClick={handleReset}>
          <RefreshCw className="w-4 h-4" /> Reset Quiz
        </Button>

        {/* Skip Question */}
        <Button
          variant="secondary"
          onClick={handleSkip}
          disabled={!!selectedAnswer}
          className="ml-2"
        >
          <SkipForward className="w-4 h-4" /> Next Question
        </Button>
      </div>
    </div>
  );
}

export default QuestionCard;
