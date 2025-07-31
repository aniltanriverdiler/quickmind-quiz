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
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Quiz finished control
  if (currentQuestion >= shuffledQuestions.length) {
    return <ScoreScreen />;
  }

  // User selects an answer
  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    if (option === question.correctAnswer) {
      setFeedback("correct");
      answerQuestion(true);
    } else {
      setFeedback("wrong");
      answerQuestion(false);
    }

    // Auto-advance to the next question after 1 second
    setTimeout(() => {
      handleNext();
    }, 1000);
  };

  //Go to next question
  const handleNext = () => {
    setSelectedAnswer(null);
    setFeedback(null);
    setTimeLeft(60);
    nextQuestion();
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
    <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 space-y-6">
      {/* Header with Progress Bar & Timer */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Question {currentQuestion + 1} / {shuffledQuestions.length}
        </h2>
        <span className="text-red-500 font-bold">{timeLeft}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full transition-all duration-300"
          style={{
            width: `${
              ((currentQuestion + 1) / shuffledQuestions.length) * 100
            }%`,
          }}
        />
      </div>

      {/* Question */}
      <p className="text-lg font-medium">{question.question}</p>

      {/* Options */}
      <div className="grid gap-3">
        {question.options.map((option) => (
          <Button
            key={option}
            variant="outline"
            className={`justify-start w-full
        ${
          selectedAnswer === option && feedback === "correct"
            ? "bg-green-500 text-white"
            : ""
        }
        ${
          selectedAnswer === option && feedback === "wrong"
            ? "bg-red-500 text-white"
            : ""
        } 
        `}
            onClick={() => handleAnswer(option)}
            disabled={!!selectedAnswer} // Lock the buttons once the user makes a selection
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        {/* Reset Quiz */}
        <Button variant="destructive" onClick={handleReset}>
          <RefreshCw className="w-4 h-4" /> Reset Quiz
        </Button>

        {/* Skip Question */}
        <Button
          variant="secondary"
          onClick={handleNext}
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
