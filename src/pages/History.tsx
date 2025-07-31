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
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6">📜 Quiz History</h2>

      <Table>
        <TableCaption>Your past quiz results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Date</TableHead>
            <TableHead>✅ Correct</TableHead>
            <TableHead>❌ Wrong</TableHead>
            <TableHead>⚪ Skipped</TableHead>
            <TableHead>📊 Score %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-6">
                No quiz history found.
              </TableCell>
            </TableRow>
          ) : (
            results.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.date}</TableCell>
                <TableCell className="text-green-600">{result.score}</TableCell>
                <TableCell className="text-red-600">
                  {result.wrongAnswers}
                </TableCell>
                <TableCell className="text-gray-600">
                  {result.skippedQuestions}
                </TableCell>
                <TableCell className="font-bold">
                  {result.percentage}%
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default History;
