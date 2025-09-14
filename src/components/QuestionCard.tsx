import ScoreScreen from "./ScoreScreen";
import { useEffect, useState, useCallback } from "react";
import { useQuizStore } from "../store/quizStore";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  RefreshCw,
  SkipForward,
  CheckCircle,
  XCircle,
  Clock,
  Lightbulb,
  Trophy,
  Target,
  Heart,
} from "lucide-react";

function QuestionCard() {
  const {
    shuffledQuestions,
    currentQuestion,
    score,
    correctCount,
    wrongCount,
    skippedCount,
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

  // Proceed after answering (not skip)
  const handleNext = useCallback(() => {
    setSelectedAnswer(null);
    setFeedback(null);
    setTimeLeft(60);
    nextQuestion();
  }, [nextQuestion]);

  // If user submits an answer
  const handleAnswer = useCallback(
    (option: string) => {
      if (!question) return; // Guard clause

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
    },
    [question, answerQuestion, handleNext]
  );

  // Skip function
  const handleSkip = useCallback(() => {
    setSelectedAnswer(null);
    setFeedback(null);
    setTimeLeft(60);
    skipQuestion();
  }, [skipQuestion]);

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleSkip(); // Auto-skip when time expires
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, handleSkip]);

  // Keyboard support for answer selection
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (selectedAnswer || !question) return; // Don't allow selection if already answered or no question

      const key = event.key.toLowerCase();
      const optionIndex =
        key === "a"
          ? 0
          : key === "b"
          ? 1
          : key === "c"
          ? 2
          : key === "d"
          ? 3
          : -1;

      if (optionIndex >= 0 && optionIndex < question.options.length) {
        handleAnswer(question.options[optionIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedAnswer, question, handleAnswer]);

  // Quiz finished control
  if (currentQuestion >= shuffledQuestions.length) {
    return <ScoreScreen />;
  }

  // Reset quiz & navigate home
  const handleReset = () => {
    resetQuiz();
    navigate("/");
  };

  if (!question) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center shadow-lg">
        <p className="text-white text-2xl font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
          Quiz finished!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6 sm:p-8 space-y-6 mx-auto animate-fadeIn">
      {/* Header with Progress Bar & Timer */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            Question {currentQuestion + 1} / {shuffledQuestions.length}
          </h2>
          {/* Score badge */}
          <span className="text-sm px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 shadow-sm font-semibold">
            Score: {score}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Statistics */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-200 border border-green-400/30">
              <CheckCircle className="w-3 h-3" />
              {correctCount}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 text-red-200 border border-red-400/30">
              <XCircle className="w-3 h-3" />
              {wrongCount}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-200 border border-yellow-400/30">
              <Clock className="w-3 h-3" />
              {skippedCount}
            </span>
          </div>
          {/* Timer with warning */}
          <span
            className={`text-white font-bold text-xl px-4 py-2 rounded-xl border shadow-lg backdrop-blur-sm ${
              timeLeft <= 10
                ? "bg-gradient-to-r from-red-500/30 to-red-600/30 border-red-400/50"
                : "bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border-blue-400/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {timeLeft}s
            </div>
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-white/20 rounded-full shadow-inner">
        <div
          className="h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300 shadow-sm"
          style={{
            width: `${
              ((currentQuestion + 1) / shuffledQuestions.length) * 100
            }%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="space-y-2">
        <p className="text-lg sm:text-xl font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] leading-relaxed">
          {question.question}
        </p>
        {/* Keyboard Shortcut Hint */}
        <p className="text-sm text-white/60 italic flex items-center gap-1">
          <Lightbulb className="w-5 h-5" />
          Use A, B, C, D keys to select answers quickly
        </p>
      </div>

      {/* Options */}
      <div className="grid gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;
          const isWrong = isSelected && feedback === "wrong";
          const showCorrect = selectedAnswer && isCorrect;
          const letter = String.fromCharCode(65 + index); // A, B, C, D

          return (
            <Button
              key={option}
              variant="outline"
              className={`justify-start w-full transition-all duration-200 text-left h-auto py-4 px-6
                bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/50 text-white
                backdrop-blur-sm shadow-sm hover:shadow-md relative
                ${
                  isSelected && feedback === "correct"
                    ? "bg-green-500/80 text-white border-green-400 shadow-lg"
                    : ""
                }
                ${
                  isSelected && feedback === "wrong"
                    ? "bg-red-500/80 text-white border-red-400 shadow-lg"
                    : ""
                }
                ${
                  showCorrect && !isSelected
                    ? "bg-green-500/60 text-white border-green-400 shadow-lg"
                    : ""
                }
                ${isWrong ? "ring-2 ring-red-400/50" : ""}
                ${showCorrect && !isSelected ? "ring-2 ring-green-400/50" : ""}
              `}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
            >
              <div className="flex items-center gap-3 w-full">
                {/* Letter indicator */}
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold border border-white/30">
                  {letter}
                </span>
                <span className="font-medium text-base leading-relaxed flex-1">
                  {option}
                </span>
                {/* Status icons */}
                {isSelected && feedback === "correct" && (
                  <CheckCircle className="w-5 h-5 text-green-200 flex-shrink-0" />
                )}
                {isSelected && feedback === "wrong" && (
                  <XCircle className="w-5 h-5 text-red-200 flex-shrink-0" />
                )}
                {showCorrect && !isSelected && (
                  <CheckCircle className="w-5 h-5 text-green-200 flex-shrink-0" />
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {/* Feedback Message */}
      {selectedAnswer && (
        <div className="text-center mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm">
          {feedback === "correct" && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-300" />
                <p className="text-green-300 font-bold text-xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                  Correct!
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-200 text-sm">
                <Trophy className="w-4 h-4" />
                <span>Great job! You earned 1 point.</span>
              </div>
            </div>
          )}
          {feedback === "wrong" && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <XCircle className="w-6 h-6 text-red-300" />
                <p className="text-red-300 font-bold text-xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                  Wrong!
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90 text-lg">
                <Target className="w-5 h-5 text-green-300" />
                <span>Correct Answer:</span>
                <span className="font-bold text-white bg-green-500/20 px-2 py-1 rounded border border-green-400/30">
                  {question.correctAnswer}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-red-200 text-sm">
                <Heart className="w-4 h-4" />
                <span>Don't worry, you can try again next time!</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-6 gap-4">
        {/* Reset Quiz */}
        <Button
          onClick={handleReset}
          className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30 hover:border-red-400/50 
                     backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 px-6 py-3"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Reset Quiz
        </Button>

        {/* Skip Question */}
        <Button
          onClick={handleSkip}
          disabled={!!selectedAnswer}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 
                     backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 px-6 py-3
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SkipForward className="w-4 h-4 mr-2" />
          {selectedAnswer ? "Next Question" : "Skip Question"}
        </Button>
      </div>

      {/* Mobile Statistics */}
      <div className="sm:hidden flex justify-center items-center gap-4 text-xs mt-4">
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-200 border border-green-400/30">
          <CheckCircle className="w-3 h-3" />
          {correctCount}
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 text-red-200 border border-red-400/30">
          <XCircle className="w-3 h-3" />
          {wrongCount}
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-200 border border-yellow-400/30">
          <Clock className="w-3 h-3" />
          {skippedCount}
        </span>
      </div>
    </div>
  );
}

export default QuestionCard;
