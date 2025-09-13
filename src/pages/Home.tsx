import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../store/authStore";
import bgVideo from "../assets/color-smoke-7.mp4";
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
      {/* Video Background container should already be in page layout; we ensure content spacing */}
      <div className="relative z-20 text-center space-y-8 mt-10 sm:mt-14 px-2 animate-fadeIn">
        {/* Greeting Section */}
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold 
               bg-gradient-to-r from-blue-500 via-green-400 to-indigo-400 
               inline-block text-transparent bg-clip-text 
               drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] 
               shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          {currentUser
            ? `Welcome back, ${currentUser.name.split(" ")[0]}! 🎉`
            : "Welcome to QuickMind! 🧠"}
        </h1>

        {/* Short description */}
        <p className="text-xl font-bold sm:text-xl text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] max-w-xl mx-auto">
          Test your knowledge with fun questions and see how much you know!
          Answer quickly every second counts.
        </p>

        {/* Info Cards */}
        <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto px-2">
          {/* How to Play */}
          <Card className="bg-white/10 dark:bg-black/20 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] sm:text-2xl text-start">
                <div className="flex flex-row gap-2">
                  <Play className="w-7 h-7 font-bold text-emerald-300 mt-1.5 drop-shadow" />
                  <span className="">How to Play?</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-left text-white/90">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-300 mt-0.5" />
                <p>
                  You have <span className="font-semibold">60 seconds</span> for
                  each question.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <SkipForward className="w-5 h-5 text-emerald-300 mt-0.5" />
                <p>Skip a question anytime it won’t affect your score.</p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-emerald-300 mt-0.5" />
                <p>Wrong answers don’t add points keep trying! 😅</p>
              </div>
              <div className="flex items-start gap-3">
                <Save className="w-5 h-5 text-emerald-300 mt-0.5" />
                <p>At the end, save your results to track your progress.</p>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-white/10 dark:bg-black/20 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] sm:text-2xl text-start">
                <div className="flex flex-row gap-2">
                  <Trophy className="w-7 h-7 font-bold text-amber-300 mt-1 drop-shadow" />
                  <span className="">Results Section</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-left text-white/90">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-300 mt-0.5" />
                <p>
                  See a detailed breakdown of your correct, wrong and skipped
                  answers.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Trophy className="w-5 h-5 text-amber-300 mt-0.5" />
                <p>
                  Track your score and percentage to measure your performance.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Save className="w-5 h-5 text-amber-300 mt-0.5" />
                <p>
                  Save your results when logged in and build your quiz history.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <SkipForward className="w-5 h-5 text-amber-300 mt-0.5" />
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
            className="px-6 py-3 text-lg bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20"
            onClick={() => navigate("/level")}
          >
            {" "}
            <Rocket className="w-8 h-8" /> Start Quiz{" "}
          </Button>
          {currentUser && (
            <Button
              variant="outline"
              className="px-6 py-3 text-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20"
              onClick={() => navigate("/history")}
            >
              <ChartColumnBig className="w-8 h-8" /> View History
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
