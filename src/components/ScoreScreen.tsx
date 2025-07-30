import { useQuizStore } from "../store/quizStore";
import { Button } from "./ui/button";

function ScoreScreen() {
  const { score, shuffledQuestions, resetQuiz } = useQuizStore();

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6 text-center">
      <h2 className="text-3xl font-bold">Quiz Finished! 🎉</h2>
      <p className="text-xl">
        You scored <span className="text-blue-600 font-bold">{score}</span> out
        of <span className="font-bold">{shuffledQuestions.length}</span>
      </p>
      <Button className="px-6 py-3 text-lg" onClick={resetQuiz}>
        Try Again
      </Button>
    </div>
  );
}

export default ScoreScreen;
