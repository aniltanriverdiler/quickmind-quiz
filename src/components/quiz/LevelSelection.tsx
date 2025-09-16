import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../../store/quizStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Brain, Book, Trophy, Lightbulb, Clock, Target, Star } from "lucide-react";

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
      questions: 10,
      timePerQuestion: 60,
      difficulty: "Medium",
      color: "from-blue-500 to-cyan-400",
    },
    {
      key: "history" as const,
      name: "History",
      description: "World events, empires, wars and historical figures.",
      Icon: Book,
      questions: 10,
      timePerQuestion: 60,
      difficulty: "Hard",
      color: "from-amber-500 to-orange-400",
    },
    {
      key: "sports" as const,
      name: "Sports",
      description: "Football, tennis, F1, basketball and more competitive fun.",
      Icon: Trophy,
      questions: 10,
      timePerQuestion: 60,
      difficulty: "Easy",
      color: "from-green-500 to-emerald-400",
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
    <>
      {/* Level Page Header Section */}
      <div className="max-w-6xl mx-auto p-6 space-y-8 animate-fadeIn">
        <div className="text-center space-y-4">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold 
             bg-gradient-to-r from-blue-500 via-green-400 to-indigo-400 
             inline-block text-transparent bg-clip-text 
             drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] 
             shadow-[0_0_20px_rgba(59,130,246,0.3)] pb-2"
          >
            Select Your Challenge
          </h1>
          <p className="text-xl font-bold sm:text-xl text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] max-w-xl mx-auto">
            Choose your category and difficulty to start the quiz.
          </p>
        </div>

        {/* Category Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({ key, name, description, Icon, questions, timePerQuestion, difficulty, color }) => (
            <Card
              key={key}
              className="bg-white/10 dark:bg-black/20 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:bg-white/15 flex flex-col h-full"
            >
              <CardHeader className="text-center pb-4">
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} flex items-center justify-center shadow-lg mx-auto mb-3`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Title */}
                <CardTitle className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] text-xl font-bold">
                  {name}
                </CardTitle>
                
                {/* Description */}
                <CardDescription className="text-white/80 text-sm leading-relaxed">
                  {description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 flex-1 flex flex-col">
                {/* Quiz Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-white/90">
                      <Target className="w-4 h-4" />
                      <span>Questions</span>
                    </div>
                    <span className="text-white font-semibold">{questions}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-white/90">
                      <Clock className="w-4 h-4" />
                      <span>Time per question</span>
                    </div>
                    <span className="text-white font-semibold">{timePerQuestion}s</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-white/90">
                      <Star className="w-4 h-4" />
                      <span>Default difficulty</span>
                    </div>
                    <span className="text-white font-semibold">{difficulty}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/20"></div>

                {/* Difficulty Selection */}
                <div className="space-y-3 flex-1 flex flex-col justify-end">
                  <div className="text-sm text-white/90 font-semibold text-center">
                    Select difficulty:
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {(Object.keys(difficultyConfigs) as DifficultyKey[]).map(
                      (diff) => (
                        <Button
                          key={diff}
                          onClick={() => handleSelect(key, diff)}
                          className={`${difficultyConfigs[diff].color} text-white hover:brightness-110 shadow-sm border border-white/20 hover:border-white/40 transition-all duration-200 text-xs px-3 py-1.5`}
                        >
                          {difficultyConfigs[diff].label}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="justify-center text-xs text-white/80 pt-2">
                Pick a level and jump right in!
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Tip Section */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 mx-auto max-w-2xl rounded-2xl shadow-lg">
          <p className="text-center font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            <Lightbulb className="w-5 h-5 inline-block mr-1 mb-1" /> Tip: Each
            level contains 10 questions. You have 60 seconds per question!
          </p>
        </div>
      </div>
    </>
  );
}

export default LevelSelection;
