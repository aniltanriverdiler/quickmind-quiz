import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  BarChart3,
  Medal,
  CheckCircle2,
  XCircle,
  CircleDashed,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface ChartData {
  date: string;
  percentage: number;
  correct: number;
  wrong: number;
  skipped: number;
  index: number;
}

interface LastQuiz {
  date: string;
  score: number;
  wrongAnswers: number;
  skippedQuestions: number;
  percentage: number;
}

interface ChartSectionProps {
  chartData: ChartData[];
  lastQuiz: LastQuiz | null;
}

export function ChartSection({ chartData, lastQuiz }: ChartSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Line Chart */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            Score Progress Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.2)"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "rgba(255,255,255,0.8)" }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: "rgba(255,255,255,0.8)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value: number, name: string) => [
                    `${value}%`,
                    name === "percentage" ? "Score" : name,
                  ]}
                  labelFormatter={(label: string) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#06b6d4", strokeWidth: 2 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-white/60">
              No data available for chart
            </div>
          )}
        </CardContent>
      </Card>

      {/* Last Quiz Card */}
      <Card className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
        <CardHeader className="relative z-10 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
              <Medal className="h-5 w-5 text-yellow-400" />
              Last Quiz
            </CardTitle>
            <div className="text-xs text-white/70 font-medium">
              {lastQuiz?.date}
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          {lastQuiz ? (
            <div className="space-y-6">
              {/* Circular Progress Bar for Percentage */}
              <div className="flex justify-center">
                <div className="w-32 h-32 relative">
                  <CircularProgressbar
                    value={lastQuiz.percentage}
                    text=""
                    styles={buildStyles({
                      pathColor:
                        lastQuiz.percentage >= 80
                          ? "#10b981"
                          : lastQuiz.percentage >= 50
                          ? "#f59e0b"
                          : "#ef4444",
                      textColor: "#ffffff",
                      trailColor: "rgba(255,255,255,0.2)",
                      textSize: "0px",
                    })}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {lastQuiz.percentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats with Visual Progress Bars */}
              <div className="space-y-3">
                {/* Correct Answers */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-green-300">
                        Correct
                      </span>
                    </div>
                    <span className="font-bold text-green-300">
                      {lastQuiz.score}
                    </span>
                  </div>
                  <div className="w-full bg-green-500/20 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (lastQuiz.score /
                            (lastQuiz.score +
                              lastQuiz.wrongAnswers +
                              lastQuiz.skippedQuestions)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Wrong Answers */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-400" />
                      <span className="font-medium text-red-300">Wrong</span>
                    </div>
                    <span className="font-bold text-red-300">
                      {lastQuiz.wrongAnswers}
                    </span>
                  </div>
                  <div className="w-full bg-red-500/20 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (lastQuiz.wrongAnswers /
                            (lastQuiz.score +
                              lastQuiz.wrongAnswers +
                              lastQuiz.skippedQuestions)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Skipped Questions */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CircleDashed className="h-4 w-4 text-white/60" />
                      <span className="font-medium text-white/80">Skipped</span>
                    </div>
                    <span className="font-bold text-white/80">
                      {lastQuiz.skippedQuestions}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white/60 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (lastQuiz.skippedQuestions /
                            (lastQuiz.score +
                              lastQuiz.wrongAnswers +
                              lastQuiz.skippedQuestions)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-white/60">
              <div className="text-center space-y-2">
                <Medal className="h-12 w-12 mx-auto text-white/30" />
                <p className="text-sm">No quiz history available</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
