import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../store/authStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Clock,
  SkipForward,
  XCircle,
  Save,
  CheckCircle2,
  Trophy,
  Play,
  Rocket,
  ChartColumnBig,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();

  return (
    <div className="text-center space-y-8 mt-8 sm:mt-10 px-2 animate-fadeIn">
      {/* Greeting Section */}
      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 inline-block text-transparent bg-clip-text">
        {currentUser
          ? `Welcome back, ${currentUser.name.split(" ")[0]}! 🎉`
          : "Welcome to QuickMind! 🧠"}
      </h1>

      {/* Short description */}
      <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto">
        Test your knowledge with fun questions and see how much you know! Answer
        quickly every second counts. ⏳
      </p>

      {/* Info Cards */}
      <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
        {/* How to Play */}
        <Card className="bg-card/90 border shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-start">
              <div className="flex flex-row gap-2">
                <Play className="w-7 h-7 font-bold text-emerald-600 mt-1.5" />
                <span className="">How to Play?</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <div className="flex items-start gap-3 text-foreground/90">
              <Clock className="w-5 h-5 text-emerald-600 mt-0.5" />
              <p>
                You have <span className="font-semibold">60 seconds</span> for
                each question.
              </p>
            </div>
            <div className="flex items-start gap-3 text-foreground/90">
              <SkipForward className="w-5 h-5 text-emerald-600 mt-0.5" />
              <p>Skip a question anytime it won’t affect your score.</p>
            </div>
            <div className="flex items-start gap-3 text-foreground/90">
              <XCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
              <p>Wrong answers don’t add points keep trying! 😅</p>
            </div>
            <div className="flex items-start gap-3 text-foreground/90">
              <Save className="w-5 h-5 text-emerald-600 mt-0.5" />
              <p>At the end, save your results to track your progress.</p>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-card/90 border shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-start">
              <div className="flex flex-row gap-2">
                <Trophy className="w-7 h-7 font-bold text-amber-600 mt-1" />
                <span className="">Results Section</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left text-foreground/90">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5" />
              <p>
                See a detailed breakdown of your correct, wrong and skipped
                answers.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Trophy className="w-5 h-5 text-amber-600 mt-0.5" />
              <p>
                Track your score and percentage to measure your performance.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Save className="w-5 h-5 text-amber-600 mt-0.5" />
              <p>
                Save your results when logged in and build your quiz history.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <SkipForward className="w-5 h-5 text-amber-600 mt-0.5" />
              <p>
                Retry anytime to improve your score and climb the leaderboard
                soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button
          className="px-6 py-3 text-lg"
          onClick={() => navigate("/level")}
        >
          {" "}
          <Rocket className="w-8 h-8" /> Start Quiz{" "}
        </Button>
        {currentUser && (
          <Button
            variant="outline"
            className="px-6 py-3 text-lg"
            onClick={() => navigate("/history")}
          >
            <ChartColumnBig className="w-8 h-8" /> View History
          </Button>
        )}
      </div>
    </div>
  );
}

export default Home;
