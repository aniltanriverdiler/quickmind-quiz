import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Play } from "lucide-react";

function History() {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const storageKey = `quizHistory_${currentUser.email}`;
    const history = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setResults(history);
  }, [currentUser, navigate]);

  return (
    <div className="max-w-4xl mx-auto mt-8 sm:mt-10 bg-card p-4 sm:p-6 rounded-xl shadow-md animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">📜 Quiz History</h2>
        <Button onClick={() => navigate("/quiz")}> <Play className="w-4 h-4" /> Start New Quiz </Button>
      </div>

      <Table>
        <TableCaption className="text-muted-foreground">Your past quiz results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] sm:w-[180px]">Date</TableHead>
            <TableHead>✅ Correct</TableHead>
            <TableHead>❌ Wrong</TableHead>
            <TableHead>⚪ Skipped</TableHead>
            <TableHead>📊 Score %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                No quiz history found.
              </TableCell>
            </TableRow>
          ) : (
            results.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.date}</TableCell>
                <TableCell className="text-green-700 font-semibold">{result.score}</TableCell>
                <TableCell className="text-destructive font-semibold">{result.wrongAnswers}</TableCell>
                <TableCell className="text-muted-foreground">{result.skippedQuestions}</TableCell>
                <TableCell className="font-bold">{result.percentage}%</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default History;
