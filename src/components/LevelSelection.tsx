import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const categories = [
  { key: "technology", label: "Technology", emoji: "💻" },
  { key: "history", label: "History", emoji: "📜" },
  { key: "sports", label: "Sports", emoji: "🏆" },
];

const difficulties = [
  { key: "easy", label: "Easy", color: "bg-green-400" },
  { key: "medium", label: "Medium", color: "bg-yellow-400" },
  { key: "hard", label: "Hard", color: "bg-red-400" },
];

function LevelSelection() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  const handleStartQuiz = () => {
    if (selectedCategory && selectedDifficulty) {
      navigate(
        `/quiz?category=${selectedCategory}&difficulty=${selectedDifficulty}`
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 space-y-6 text-center">
      <h1 className="text-2xl font-bold">Choose Your Quiz</h1>

      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <Button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all ${
              selectedCategory === cat.key
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat.emoji} {cat.label}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {difficulties.map((diff) => (
          <Button
            key={diff.key}
            onClick={() => setSelectedDifficulty(diff.key)}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
              selectedDifficulty === diff.key
                ? diff.color + "ring-4 ring-offset-2 ring-gray-200"
                : diff.color + "hover:brightness-110"
            }`}
          ></Button>
        ))}
      </div>

      <Button
        onClick={handleStartQuiz}
        disabled={!selectedCategory || !selectedDifficulty}
        className="mt-4 px-8 py-3 bg-indigo-500 text-white font-bold disabled:opacity-50 hover:bg-indigo-600 transition-all"
      >
        Start Quiz
      </Button>
    </div>
  );
}

export default LevelSelection;
