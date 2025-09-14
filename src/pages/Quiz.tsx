import QuestionCard from "../components/QuestionCard";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { type Category, type Difficulty } from "../data/questions";
import { useQuizStore } from "../store/quizStore";
import bgVideo from "../assets/color-smoke-14.mp4";

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
    <div className="relative w-full min-h-screen">
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src={bgVideo}
      />
      {/* Overlay for readability */}
      <div className="fixed inset-0 z-10 bg-gradient-to-b from-black/20 via-black/35 to-black/60" />
      {/* Content */}
      <div className="relative z-20 flex justify-center items-center min-h-screen p-6">
        {shuffledQuestions.length > 0 ? (
          <QuestionCard />
        ) : (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center shadow-lg">
            <p className="text-white text-lg font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
              No questions found for this category and difficulty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
