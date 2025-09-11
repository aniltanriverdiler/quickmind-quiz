import QuestionCard from "../components/QuestionCard";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { type Category, type Difficulty } from "../data/questions";
import { useQuizStore } from "../store/quizStore";

function Quiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { initializeQuiz, shuffledQuestions } = useQuizStore();

  const category = searchParams.get("category") as Category | null;
  const difficulty = searchParams.get("difficulty") as Difficulty | null;

  // Initialize the quiz when route params are present
  useEffect(() => {
    if (category && difficulty) {
      initializeQuiz(category, difficulty);
    } else {
      // If params are missing, go back to home
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, difficulty]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {shuffledQuestions.length > 0 ? (
        <QuestionCard />
      ) : (
        <p className="text-center text-muted-foreground">No questions found for this category and difficulty.</p>
      )}
    </div>
  );
}

export default Quiz;
