import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../store/authStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();

  return (
    <div className="text-center space-y-8 mt-8 sm:mt-10 px-2 animate-fadeIn">
      {/* Greeting Section */}
      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 inline-block text-transparent bg-clip-text">
        {currentUser
          ? `Welcome back, ${currentUser.name}! 🎉`
          : "Welcome to QuickMind! 🧠"}
      </h1>

      {/* Short description */}
      <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto">
        Test your knowledge with fun questions and see how much you know! Answer
        quickly – every second counts. ⏳
      </p>

      {/* Rules / How to Play */}
      <Card className="max-w-md mx-auto bg-card/90 border shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">📜 How to Play?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-left list-disc list-inside space-y-2 text-foreground/80">
            <li>You have 60 seconds for each question.</li>
            <li>Skip a question, no points.</li>
            <li>Wrong answers won’t count as correct. 😅</li>
            <li>At the end, save your results to track your progress.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button className="px-6 py-3 text-lg" onClick={() => navigate("/quiz")}>
          {" "}
          🚀 Start Quiz{" "}
        </Button>
        {currentUser && (
          <Button
            variant="outline"
            className="px-6 py-3 text-lg"
            onClick={() => navigate("/history")}
          >
            📊 View History
          </Button>
        )}
      </div>
    </div>
  );
}

export default Home;
