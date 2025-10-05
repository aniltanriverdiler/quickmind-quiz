import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  LineChart,
  CheckCircle2,
  XCircle,
  CircleDashed,
  Trophy,
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface Summary {
  totalQuizzes: number;
  totalCorrect: number;
  totalWrong: number;
  totalSkipped: number;
  averagePercentage: number;
  bestPercentage: number;
}

interface SummaryCardsProps {
  summary: Summary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {/* Total Quizzes Card */}
      <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-full -translate-y-8 translate-x-8"></div>
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-sm text-white/80 flex items-center gap-2">
            <LineChart className="h-4 w-4 text-cyan-400" /> Total Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-cyan-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
              {summary.totalQuizzes}
            </div>
            <div className="w-12 h-12">
              <CircularProgressbar
                value={Math.min((summary.totalQuizzes / 20) * 100, 100)}
                text=""
                styles={buildStyles({
                  pathColor:
                    summary.totalQuizzes >= 15
                      ? "#10b981"
                      : summary.totalQuizzes >= 8
                      ? "#f59e0b"
                      : "#ef4444",
                  trailColor: "rgba(255,255,255,0.2)",
                  textSize: "0px",
                })}
              />
            </div>
          </div>
          <div className="text-xs text-white/70 mt-1">
            {summary.totalQuizzes >= 15
              ? "High Activity"
              : summary.totalQuizzes >= 8
              ? "Medium Activity"
              : "Low Activity"}
          </div>
        </CardContent>
      </Card>

      {/* Total Correct Card */}
      <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full -translate-y-8 translate-x-8"></div>
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-sm text-white/80 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400" /> Total Correct
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-green-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
              {summary.totalCorrect}
            </div>
            <div className="w-12 h-12">
              <CircularProgressbar
                value={Math.min((summary.totalCorrect / 100) * 100, 100)}
                text=""
                styles={buildStyles({
                  pathColor:
                    summary.totalCorrect >= 75
                      ? "#10b981"
                      : summary.totalCorrect >= 40
                      ? "#f59e0b"
                      : "#ef4444",
                  trailColor: "rgba(255,255,255,0.2)",
                  textSize: "0px",
                })}
              />
            </div>
          </div>
          <div className="text-xs text-white/70 mt-1">
            {summary.totalCorrect >= 75
              ? "Excellent"
              : summary.totalCorrect >= 40
              ? "Good"
              : "Keep Going"}
          </div>
        </CardContent>
      </Card>

      {/* Total Wrong Card */}
      <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full -translate-y-8 translate-x-8"></div>
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-sm text-white/80 flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-400" /> Total Wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-red-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
              {summary.totalWrong}
            </div>
            <div className="w-12 h-12">
              <CircularProgressbar
                value={Math.min((summary.totalWrong / 50) * 100, 100)}
                text=""
                styles={buildStyles({
                  pathColor:
                    summary.totalWrong <= 10
                      ? "#10b981"
                      : summary.totalWrong <= 25
                      ? "#f59e0b"
                      : "#ef4444",
                  trailColor: "rgba(255,255,255,0.2)",
                  textSize: "0px",
                })}
              />
            </div>
          </div>
          <div className="text-xs text-white/70 mt-1">
            {summary.totalWrong <= 10
              ? "Very Low"
              : summary.totalWrong <= 25
              ? "Moderate"
              : "High"}
          </div>
        </CardContent>
      </Card>

      {/* Total Skipped Card */}
      <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-sm text-white/80 flex items-center gap-2">
            <CircleDashed className="h-4 w-4 text-white/60" /> Total Skipped
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
              {summary.totalSkipped}
            </div>
            <div className="w-12 h-12">
              <CircularProgressbar
                value={Math.min((summary.totalSkipped / 30) * 100, 100)}
                text=""
                styles={buildStyles({
                  pathColor:
                    summary.totalSkipped <= 5
                      ? "#10b981"
                      : summary.totalSkipped <= 15
                      ? "#f59e0b"
                      : "#ef4444",
                  trailColor: "rgba(255,255,255,0.2)",
                  textSize: "0px",
                })}
              />
            </div>
          </div>
          <div className="text-xs text-white/70 mt-1">
            {summary.totalSkipped <= 5
              ? "Very Low"
              : summary.totalSkipped <= 15
              ? "Moderate"
              : "High"}
          </div>
        </CardContent>
      </Card>

      {/* Average Score Card */}
      <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-full -translate-y-8 translate-x-8"></div>
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-sm text-white/80 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-400" /> Average Score
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 flex items-center justify-center">
          <div className="w-20 h-20 relative">
            <CircularProgressbar
              value={summary.averagePercentage}
              text=""
              styles={buildStyles({
                pathColor:
                  summary.averagePercentage >= 80
                    ? "#10b981"
                    : summary.averagePercentage >= 50
                    ? "#f59e0b"
                    : "#ef4444",
                textColor: "#ffffff",
                trailColor: "rgba(255,255,255,0.2)",
                textSize: "0px",
              })}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {summary.averagePercentage}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
