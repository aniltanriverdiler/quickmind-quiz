import { Card, CardContent } from "../ui/card";
import {
  Medal,
  CheckCircle2,
  XCircle,
  CircleDashed,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface QuizHistoryItem {
  date: string;
  score: number;
  wrongAnswers: number;
  skippedQuestions: number;
  percentage: number;
}

interface HistoryCardsProps {
  results: QuizHistoryItem[];
  bestPercentage: number;
}

export function HistoryCards({ results, bestPercentage }: HistoryCardsProps) {
  if (results.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <CardContent className="py-8 text-center text-white/60">
          No quiz history found.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {results.map((result, index) => {
        const isRecentBest = result.percentage === bestPercentage;
        const trend =
          index > 0 && results[index - 1]
            ? result.percentage - results[index - 1].percentage
            : 0;

        return (
          <Card
            key={index}
            className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Medal
                    className={`h-6 w-6 ${
                      isRecentBest ? "text-yellow-400" : "text-white/60"
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                        {result.percentage}% Score
                      </div>
                      {isRecentBest && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full border border-yellow-400/30">
                          Best
                        </span>
                      )}
                      {trend > 0 && (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      )}
                      {trend < 0 && (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <div className="text-xs text-white/70">{result.date}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-1 justify-end">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="font-semibold text-green-300">
                      {result.score}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <XCircle className="h-4 w-4 text-red-400" />
                    <span className="font-semibold text-red-300">
                      {result.wrongAnswers}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <CircleDashed className="h-4 w-4 text-white/60" />
                    <span className="font-semibold text-white/80">
                      {result.skippedQuestions}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
