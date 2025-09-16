import React, { useState, useMemo, useCallback } from "react";
import {
  Medal,
  Trophy,
  UserCircle,
  Crown,
  Search,
  Copy,
  Share2,
  BarChart3,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLeaderboardStore } from "../../store/leader";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";

// A single row component for a leaderboard user
const LeaderboardItem = ({
  user,
  rank,
  isCurrentUser,
}: {
  user: { username: string; percentage: number; score: number };
  rank: number;
  isCurrentUser?: boolean;
}) => (
  <div
    className={`flex items-center justify-between p-4 rounded-xl mb-2 transition-all duration-300 ${
      isCurrentUser
        ? "bg-gradient-to-r from-blue-500/20 to-green-400/20 border-2 border-blue-400/50 shadow-lg shadow-blue-500/20 scale-105"
        : "bg-white/5 border border-white/10 hover:bg-white/10"
    }`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`w-8 font-bold text-lg ${
          isCurrentUser ? "text-blue-300" : "text-white/80"
        }`}
      >
        {rank}.
      </div>
      <div className="relative">
        <UserCircle
          className={`h-8 w-8 rounded-full ${
            isCurrentUser ? "text-blue-300" : "text-white/60"
          }`}
        />
        {isCurrentUser && (
          <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400" />
        )}
      </div>
      <div
        className={`font-semibold ${
          isCurrentUser ? "text-blue-200" : "text-white/90"
        }`}
      >
        {user.username}
        {isCurrentUser && (
          <span className="ml-2 text-xs bg-blue-500/30 px-2 py-1 rounded-full text-blue-200">
            You
          </span>
        )}
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div
        className={`font-bold text-lg ${
          isCurrentUser ? "text-blue-300" : "text-white/80"
        }`}
      >
        {user.percentage}%
      </div>
      <div
        className={`text-sm ${
          isCurrentUser ? "text-blue-400" : "text-white/60"
        }`}
      >
        {user.score} pts
      </div>
    </div>
  </div>
);

function LeaderBoard() {
  const { leaderboard, initializeData } = useLeaderboardStore();
  const { currentUser } = useAuthStore();

  // Local state for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "top10" | "top50">(
    "all"
  );

  // Initialize data if empty
  React.useEffect(() => {
    initializeData();
  }, [initializeData]);

  // Filtered and searched leaderboard
  const filteredLeaderboard = useMemo(() => {
    let filtered = [...leaderboard];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply rank filter
    if (filterType === "top10") {
      filtered = filtered.slice(0, 10);
    } else if (filterType === "top50") {
      filtered = filtered.slice(0, 50);
    }

    return filtered;
  }, [leaderboard, searchTerm, filterType]);

  const topPlayers = filteredLeaderboard.slice(0, 3);
  const otherPlayers = filteredLeaderboard.slice(3);

  // Find current user in leaderboard
  const getCurrentUserRank = () => {
    if (!currentUser) return null;
    const userIndex = leaderboard.findIndex(
      (user) => user.username === currentUser.name
    );
    return userIndex !== -1 ? userIndex + 1 : null;
  };

  const currentUserRank = getCurrentUserRank();

  // Statistics calculations
  const stats = useMemo(() => {
    if (leaderboard.length === 0) return null;

    const totalPlayers = leaderboard.length;
    const averageScore = Math.round(
      leaderboard.reduce((sum, user) => sum + user.score, 0) / totalPlayers
    );
    const averagePercentage = Math.round(
      leaderboard.reduce((sum, user) => sum + user.percentage, 0) / totalPlayers
    );
    const topScore = leaderboard[0]?.score || 0;
    const topPercentage = leaderboard[0]?.percentage || 0;

    return {
      totalPlayers,
      averageScore,
      averagePercentage,
      topScore,
      topPercentage,
    };
  }, [leaderboard]);

  // Copy leaderboard data
  const handleCopyLeaderboard = useCallback(() => {
    const data = filteredLeaderboard
      .map(
        (user, index) =>
          `${index + 1}. ${user.username} - ${user.percentage}% (${
            user.score
          } pts)`
      )
      .join("\n");

    navigator.clipboard.writeText(`🏆 Global Leaderboard\n\n${data}`);
    toast.success("Leaderboard copied to clipboard!");
  }, [filteredLeaderboard]);

  // Share leaderboard
  const handleShareLeaderboard = useCallback(() => {
    const data = filteredLeaderboard
      .slice(0, 10)
      .map(
        (user, index) => `${index + 1}. ${user.username} - ${user.percentage}%`
      )
      .join("\n");

    const shareText = `🏆 QuickMind Quiz Leaderboard - Top 10\n\n${data}\n\nJoin the competition at QuickMind Quiz!`;

    if (navigator.share) {
      navigator.share({
        title: "QuickMind Quiz Leaderboard",
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success("Leaderboard data copied for sharing!");
    }
  }, [filteredLeaderboard]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle shortcuts when not typing in input
      if (event.target instanceof HTMLInputElement) return;

      switch (event.key.toLowerCase()) {
        case "s":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            setShowStats(!showStats);
          }
          break;
        case "c":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            handleCopyLeaderboard();
          }
          break;
        case "/":
          event.preventDefault();
          document
            .querySelector<HTMLInputElement>(
              'input[placeholder="Search players..."]'
            )
            ?.focus();
          break;
        case "escape":
          setSearchTerm("");
          document
            .querySelector<HTMLInputElement>(
              'input[placeholder="Search players..."]'
            )
            ?.blur();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showStats, handleCopyLeaderboard]);

  return (
    <div className="relative z-20 max-w-5xl mx-auto pt-8 sm:pt-10 pb-8 p-4 sm:p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-green-400 to-indigo-400 inline-block text-transparent bg-clip-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          🏆 Global Leaderboard
        </h1>
        <p className="text-xl text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
          Top performing players worldwide
        </p>
        {currentUser && currentUserRank && (
          <p className="text-lg text-blue-300 font-semibold">
            Your rank: #{currentUserRank}
          </p>
        )}

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            <Input
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/15 border-white/30 text-white placeholder:text-white/70 focus:border-blue-400/60 shadow-sm"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
              className={`shadow-sm ${
                filterType === "all"
                  ? "bg-blue-500/25 text-blue-200 border-blue-400/60"
                  : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
              }`}
            >
              All
            </Button>
            <Button
              variant={filterType === "top10" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("top10")}
              className={`shadow-sm ${
                filterType === "top10"
                  ? "bg-blue-500/25 text-blue-200 border-blue-400/60"
                  : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
              }`}
            >
              Top 10
            </Button>
            <Button
              variant={filterType === "top50" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("top50")}
              className={`shadow-sm ${
                filterType === "top50"
                  ? "bg-blue-500/25 text-blue-200 border-blue-400/60"
                  : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
              }`}
            >
              Top 50
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStats(!showStats)}
            className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25 shadow-sm"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            {showStats ? "Hide Stats" : "Show Stats"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLeaderboard}
            className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25 shadow-sm"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareLeaderboard}
            className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25 shadow-sm"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Results Counter & Keyboard Shortcuts */}
        <div className="space-y-2">
          <p className="text-sm text-white/70">
            Showing {filteredLeaderboard.length} of {leaderboard.length} players
            {searchTerm && (
              <span className="text-blue-300">
                {" "}
                • Filtered by "{searchTerm}"
              </span>
            )}
          </p>
          <div className="text-xs text-white/60 space-x-4">
            <span>
              Press{" "}
              <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-white/80">
                /{" "}
              </kbd>{" "}
              to search
            </span>
            <span>
              <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-white/80">
                Ctrl+S
              </kbd>{" "}
              for stats
            </span>
            <span>
              <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-white/80">
                Ctrl+C
              </kbd>{" "}
              to copy
            </span>
            <span>
              <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-white/80">
                Esc
              </kbd>{" "}
              to clear
            </span>
          </div>
        </div>
      </div>

      {/* Statistics Card */}
      {showStats && stats && (
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white/90">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              Leaderboard Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {stats.totalPlayers}
                </div>
                <div className="text-sm text-white/60">Total Players</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Target className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {stats.averagePercentage}%
                </div>
                <div className="text-sm text-white/60">Avg Score</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {stats.topPercentage}%
                </div>
                <div className="text-sm text-white/60">Top Score</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Trophy className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {stats.topScore}
                </div>
                <div className="text-sm text-white/60">Best Points</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-4 mb-8">
        {topPlayers.map((player, index) => {
          const isCurrentUser =
            currentUser && player.username === currentUser.name;
          const podiumHeight =
            index === 0 ? "h-32" : index === 1 ? "h-24" : "h-20";
          const medalColor =
            index === 0
              ? "text-yellow-400"
              : index === 1
              ? "text-gray-400"
              : "text-amber-700";
          const borderColor =
            index === 0
              ? "border-yellow-400"
              : index === 1
              ? "border-gray-400"
              : "border-amber-700";

          return (
            <div
              key={player.id}
              className={`relative flex flex-col items-center transition-all duration-300 ${
                isCurrentUser ? "scale-110" : ""
              }`}
            >
              {/* Medal */}
              <Medal
                className={`h-16 w-16 -mb-4 z-10 drop-shadow-md ${medalColor}`}
              />

              {/* Avatar */}
              <div
                className={`relative h-20 w-20 rounded-full flex items-center justify-center border-4 bg-white/20 backdrop-blur-sm shadow-xl ${borderColor} ${
                  isCurrentUser ? "ring-4 ring-blue-400/50" : ""
                }`}
              >
                <UserCircle className="h-14 w-14 text-white/80" />
                {isCurrentUser && (
                  <Crown className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-pulse" />
                )}
              </div>

              {/* Podium */}
              <div
                className={`w-20 ${podiumHeight} ${borderColor
                  .replace("border", "bg")
                  .replace("400", "500/20")
                  .replace(
                    "700",
                    "600/20"
                  )} mt-2 rounded-t-lg border-t-4 ${borderColor} flex flex-col justify-center items-center`}
              >
                <div className="text-center">
                  <p
                    className={`font-bold text-sm text-white ${
                      isCurrentUser ? "text-blue-200" : ""
                    }`}
                  >
                    {player.username}
                    {isCurrentUser && (
                      <span className="block text-xs text-blue-300">You</span>
                    )}
                  </p>
                  <p className="text-xs text-white/70">{player.percentage}%</p>
                  <p className="text-xs text-white/60">{player.score} pts</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Leaderboard Table */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white/90">
            <Trophy className="h-5 w-5 text-yellow-400" />
            All Players
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Show all players with rankings */}
            {leaderboard.map((player, index) => {
              const rank = index + 1;
              const isCurrentUser =
                currentUser && player.username === currentUser.name;

              // Skip top 3 if showing them in podium
              if (rank <= 3) return null;

              return (
                <LeaderboardItem
                  key={player.id}
                  user={player}
                  rank={rank}
                  isCurrentUser={isCurrentUser || false}
                />
              );
            })}

            {/* Show message if no other players */}
            {otherPlayers.length === 0 && leaderboard.length > 3 && (
              <div className="text-center py-8 text-white/60">
                <Trophy className="h-12 w-12 mx-auto mb-2 text-white/40" />
                <p>No other players in this view.</p>
              </div>
            )}

            {/* Show message if no search results */}
            {filteredLeaderboard.length === 0 && searchTerm && (
              <div className="text-center py-8 text-white/60">
                <Search className="h-12 w-12 mx-auto mb-2 text-white/40" />
                <p>No players found matching "{searchTerm}"</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="mt-3 bg-white/10 text-white/80 border-white/20 hover:bg-white/20"
                >
                  Clear search
                </Button>
              </div>
            )}

            {/* Show message if completely empty leaderboard */}
            {leaderboard.length === 0 && (
              <div className="text-center py-8 text-white/60">
                <Trophy className="h-12 w-12 mx-auto mb-2 text-white/40" />
                <p>No players yet. You can be the first!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current User Stats (if not in top rankings) */}
      {currentUser && currentUserRank && currentUserRank > 10 && (
        <Card className="bg-gradient-to-r from-blue-500/10 to-green-400/10 backdrop-blur-md border border-blue-400/30 shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="h-6 w-6 text-yellow-400" />
                <span className="text-white font-semibold">
                  Your Performance
                </span>
              </div>
              <div className="text-right">
                <div className="text-blue-300 font-bold">
                  #{currentUserRank}
                </div>
                <div className="text-white/60 text-sm">rank</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default LeaderBoard;
