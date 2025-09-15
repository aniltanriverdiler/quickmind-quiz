import { useAuthStore } from "../store/authStore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/color-smoke-14.mp4";
// @ts-expect-error - file-saver doesn't have TypeScript declarations
import { saveAs } from "file-saver";

// Components
import { PlayerProfileCard } from "../components/history/PlayerProfileCard";
import { FilterControls } from "../components/history/FilterControls";
import { StatsToggle } from "../components/history/StatsToggle";
import { SummaryCards } from "../components/history/SummaryCards";
import { ChartSection } from "../components/history/ChartSection";
import { ExportControls } from "../components/history/ExportControls";
import { HistoryCards } from "../components/history/HistoryCards";

// Types
type SortKey = "date_desc" | "date_asc" | "percent_desc" | "percent_asc";
type DateFilter = "all" | "week" | "month" | "year";
type ScoreFilter = "all" | "excellent" | "good" | "fair" | "poor";

// Represents a single quiz history record stored in localStorage
type QuizHistoryItem = {
  date: string;
  score: number; // correct answers count
  wrongAnswers: number;
  skippedQuestions: number;
  percentage: number;
};

function History() {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  
  // State
  const [results, setResults] = useState<QuizHistoryItem[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("date_desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>("all");
  const [showStats, setShowStats] = useState(true);

  // Export functions
  const exportToCSV = () => {
    if (!currentUser) return;
    
    const headers = ["Date", "Correct", "Wrong", "Skipped", "Percentage"];
    const csvContent = [
      headers.join(","),
      ...results.map((result) =>
        [
        result.date,
        result.score,
        result.wrongAnswers,
        result.skippedQuestions,
          result.percentage,
        ].join(",")
      ),
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `quiz-history-${currentUser.email.split("@")[0]}.csv`);
  };

  const exportToJSON = () => {
    if (!currentUser) return;
    
    const jsonContent = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonContent], {
      type: "application/json;charset=utf-8;",
    });
    saveAs(blob, `quiz-history-${currentUser.email.split("@")[0]}.json`);
  };

  const resetHistory = () => {
    if (!currentUser) return;
    
    const storageKey = `quizHistory_${currentUser.email}`;
    localStorage.removeItem(storageKey);
    setResults([]);
  };

  // Copy quiz stats to clipboard
  const copyStats = () => {
    const statsText = `📊 My Quiz Statistics
🎯 Total Quizzes: ${summary.totalQuizzes}
✅ Correct Answers: ${summary.totalCorrect}
❌ Wrong Answers: ${summary.totalWrong}
⏭️ Skipped: ${summary.totalSkipped}
📈 Average Score: ${summary.averagePercentage}%
🏆 Best Score: ${summary.bestPercentage}%

#QuickMindQuiz #Statistics`;

    navigator.clipboard
      .writeText(statsText)
      .catch(() => {
        // noop - kullanıcıya UI içinde bilgi gösteriyoruz
      });
  };

  // Share quiz stats
  const shareStats = () => {
    const shareText = `Check out my QuickMind Quiz stats! 📊 ${summary.totalQuizzes} quizzes completed with ${summary.averagePercentage}% average score! 🎯`;

    if (navigator.share) {
      navigator
        .share({
          title: "My Quiz Statistics",
          text: shareText,
          url: window.location.origin,
        })
        .catch(() => {
          copyStats();
        });
    } else {
      copyStats();
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const storageKey = `quizHistory_${currentUser.email}`;
    const history = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setResults(history);
  }, [currentUser, navigate]);

  // Filtered and sorted results
  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...results];

    // Date filtering
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(
        (result) => new Date(result.date) >= filterDate
      );
    }

    // Score filtering
    if (scoreFilter !== "all") {
      filtered = filtered.filter((result) => {
        switch (scoreFilter) {
          case "excellent":
            return result.percentage >= 90;
          case "good":
            return result.percentage >= 70 && result.percentage < 90;
          case "fair":
            return result.percentage >= 50 && result.percentage < 70;
          case "poor":
            return result.percentage < 50;
          default:
            return true;
        }
      });
    }

    // Search filtering
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (result) =>
          result.date.toLowerCase().includes(searchLower) ||
          result.percentage.toString().includes(searchLower)
      );
    }

    // Sorting
    switch (sortKey) {
      case "date_asc":
        return filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "percent_desc":
        return filtered.sort((a, b) => b.percentage - a.percentage);
      case "percent_asc":
        return filtered.sort((a, b) => a.percentage - b.percentage);
      case "date_desc":
      default:
        return filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
  }, [results, sortKey, searchTerm, dateFilter, scoreFilter]);

  // Summary statistics displayed at the top of the dashboard
  const summary = useMemo(() => {
    const totalQuizzes = results.length;
    const totals = results.reduce(
      (acc, item) => {
        acc.correct += item.score;
        acc.wrong += item.wrongAnswers;
        acc.skipped += item.skippedQuestions;
        acc.percentageSum += item.percentage;
        return acc;
      },
      { correct: 0, wrong: 0, skipped: 0, percentageSum: 0 }
    );
    const averagePercentage =
      totalQuizzes > 0 ? Math.round(totals.percentageSum / totalQuizzes) : 0;
    const bestPercentage =
      totalQuizzes > 0 ? Math.max(...results.map((r) => r.percentage)) : 0;
    return {
      totalQuizzes,
      totalCorrect: totals.correct,
      totalWrong: totals.wrong,
      totalSkipped: totals.skipped,
      averagePercentage,
      bestPercentage,
    };
  }, [results]);

  // Player profile information derived from user and history
  const profile = useMemo(() => {
    const fullName =
      currentUser?.name || (currentUser?.email?.split("@")[0] ?? "Player");
    const username = fullName.split(" ")[0]; // Extract only first name
    const joined =
      results.length > 0
        ? new Date(
            results
              .map((r) => new Date(r.date).getTime())
              .reduce((min, t) => Math.min(min, t), Date.now())
          ).toLocaleDateString()
        : new Date().toLocaleDateString();
    const average = summary.averagePercentage;
    const level =
      average >= 80 ? "Expert" : average >= 50 ? "Intermediate" : "Beginner";
    const title = "Quiz Enthusiast"; // subtitle under the name
    return { username, joined, level, title };
  }, [currentUser, results, summary.averagePercentage]);

  // Chart data for line chart
  const chartData = useMemo(() => {
    return results
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((result, index) => ({
        date: new Date(result.date).toLocaleDateString(),
        percentage: result.percentage,
        correct: result.score,
        wrong: result.wrongAnswers,
        skipped: result.skippedQuestions,
        index: index + 1,
      }));
  }, [results]);

  // Last quiz data
  const lastQuiz = useMemo(() => {
    if (results.length === 0) return null;
    return results.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  }, [results]);

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

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto pt-8 sm:pt-10 pb-8 p-4 sm:p-6">
        {/* Player Profile Card */}
        <PlayerProfileCard profile={profile}>
          <FilterControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            scoreFilter={scoreFilter}
            setScoreFilter={setScoreFilter}
            sortKey={sortKey}
            setSortKey={setSortKey}
          />
        </PlayerProfileCard>

        {/* Stats Toggle and Share */}
        <StatsToggle
          showStats={showStats}
          setShowStats={setShowStats}
          filteredCount={filteredAndSortedResults.length}
          totalCount={results.length}
          onCopyStats={copyStats}
          onShareStats={shareStats}
        />

        {/* Summary Cards */}
        {showStats && <SummaryCards summary={summary} />}

        {/* Chart Section */}
        <ChartSection chartData={chartData} lastQuiz={lastQuiz} />

        {/* Export Controls */}
        <ExportControls
          onExportCSV={exportToCSV}
          onExportJSON={exportToJSON}
          onResetHistory={resetHistory}
        />

        {/* History Cards */}
        <HistoryCards
          results={filteredAndSortedResults}
          bestPercentage={summary.bestPercentage}
        />
      </div>
    </div>
  );
}

export default History;
