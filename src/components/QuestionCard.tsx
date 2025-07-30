import ScoreScreen from "./ScoreScreen";
import { useEffect, useState } from "react";
import { useQuizStore } from "../store/quizStore";
import { Button } from "./ui/button";

function QuestionCard() {
  const { shuffledQuestions, currentQuestion, answerQuestion, nextQuestion } =
    useQuizStore();
  const question = shuffledQuestions[currentQuestion];

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);

  // Quiz finished control
  if (currentQuestion >= shuffledQuestions.length) {
    return <ScoreScreen />;
  }

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

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

  if (!question) {
    return <p className="text-center text-xl">Quiz finished!</p>;
  }

  return (
    <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Question {currentQuestion + 1}
        </h2>
        <span className="text-red-500 font-bold">{timeLeft}</span>
      </div>

      <p className="text-lg font-medium">{question.question}</p>

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
    </div>
  );
}

export default QuestionCard;
