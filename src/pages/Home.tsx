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
    <div className="text-center space-y-8 mt-10">
      {/* Greeting Section */}
      <h1 className="text-4xl font-bold">
        {currentUser
          ? `Welcome back, ${currentUser.name}! 🎉`
          : "Welcome to QuickMind! 🧠"}
      </h1>

      {/* Short description */}
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
        Test your knowledge with fun questions and see how much you know! Answer
        quickly – every second counts. ⏳
      </p>

      {/* Rules / How to Play */}
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">📜 How to Play?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-left list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>You have 60 seconds for each question.</li>
            <li>Skip a question, no points.</li>
            <li>Wrong answers won’t count as correct. 😅</li>
            <li>At the end, save your results to track your progress.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button className="px-6 py-3 text-lg" onClick={() => navigate("/quiz")}>
          🚀 Start Quiz
        </Button>

        {/* Show History Button only if logged in */}
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
