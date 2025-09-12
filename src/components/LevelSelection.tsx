import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Brain, Book, Trophy } from "lucide-react";

function LevelSelection() {
  const navigate = useNavigate();
  const { resetQuiz, setCategory, setDifficulty, initializeQuiz } =
    useQuizStore();

  const categories = [
    {
      key: "technology" as const,
      name: "Technology",
      description: "Coding, web, networking and modern tech topics.",
      Icon: Brain,
    },
    {
      key: "history" as const,
      name: "History",
      description: "World events, empires and historical figures.",
      Icon: Book,
    },
    {
      key: "sports" as const,
      name: "Sports",
      description: "Football, tennis, F1 and more competitive fun.",
      Icon: Trophy,
    },
  ];

  type DifficultyKey = "easy" | "medium" | "hard";
  const difficultyConfigs: Record<
    DifficultyKey,
    { label: string; color: string }
  > = {
    easy: { label: "Easy", color: "bg-green-400" },
    medium: { label: "Medium", color: "bg-yellow-400" },
    hard: { label: "Hard", color: "bg-red-400" },
  };

  const handleSelect = (
    categoryKey: "technology" | "history" | "sports",
    difficultyKey: DifficultyKey
  ) => {
    // Reset current quiz state, store the new selection, initialize and navigate
    resetQuiz();
    setCategory(categoryKey);
    setDifficulty(difficultyKey);
    initializeQuiz(categoryKey, difficultyKey);
    navigate(`/quiz?category=${categoryKey}&difficulty=${difficultyKey}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Select Your Challenge
        </h1>
        <p className="text-muted-foreground">
          Choose your category and difficulty to start the quiz.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(({ key, name, description, Icon }) => (
          <Card
            key={key}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-sm">
                <Icon className="w-7 h-7" />
              </div>
              <CardTitle className="mt-2">{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-sm text-muted-foreground mb-3">
                Select difficulty:
              </div>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(difficultyConfigs) as DifficultyKey[]).map(
                  (diff) => (
                    <Button
                      key={diff}
                      onClick={() => handleSelect(key, diff)}
                      className={`${difficultyConfigs[diff].color} text-white hover:brightness-110 shadow-sm`}
                    >
                      {difficultyConfigs[diff].label}
                    </Button>
                  )
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-center text-xs text-muted-foreground">
              Pick a level and jump right in!
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Tip Section */}
      <div className="bg-gray-200 p-3 mx-48 rounded-lg">
        <p className="text-center font-semibold">
          💡 Tip: Each level contains 10 questions. You have 60 seconds per
          question!
        </p>
      </div>
    </div>
  );
}

export default LevelSelection;
