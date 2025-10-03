import { useMemo, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Trophy, Lock, Unlock, RotateCcw } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useAchievements } from "../store/achievements";
import { useLeaderboardStore } from "../store/leader";
import bgVideo from "../assets/color-smoke-14.mp4";
import { toast } from "sonner";

type Rarity = "common" | "rare" | "epic" | "legendary";
type FilterTab = "all" | "unlocked" | "locked";

function AchievementsPage() {
  const { currentUser } = useAuthStore();
  const { list, evaluateAll, reset } = useAchievements();
  const { getUserRank } = useLeaderboardStore();

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<FilterTab>("all");
  const [rarity, setRarity] = useState<Rarity | "all">("all");

  const items = useMemo(() => Object.values(list), [list]);

  const filtered = useMemo(() => {
    return items
      .filter((a) => (tab === "unlocked" ? a.unlocked : tab === "locked" ? !a.unlocked : true))
      .filter((a) => (rarity === "all" ? true : a.rarity === rarity))
      .filter((a) =>
        search ? (a.title + " " + a.description).toLowerCase().includes(search.toLowerCase()) : true
      );
  }, [items, tab, rarity, search]);

  const unlockedCount = items.filter((a) => a.unlocked).length;

  const handleEvaluate = () => {
    if (!currentUser) {
      toast.error("Please login to evaluate achievements!");
      return;
    }
    const key = `quizHistory_${currentUser.email}`;
    const results = JSON.parse(localStorage.getItem(key) || "[]");
    const name = currentUser.name?.trim() || currentUser.email.split("@")[0];
    const rank = getUserRank(name);
    const newly = evaluateAll({ results, rank });
    if (newly.length > 0) {
      toast.success(`Unlocked ${newly.length} new achievement(s)!`);
    } else {
      toast.info("No new achievements unlocked");
    }
  };

  const handleReset = () => {
    if (!currentUser) return;
    reset();
    toast.success("Achievements reset!");
  };

  const getRarityColor = (rarity: Rarity) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-500/20 to-orange-500/20 border-yellow-400/40";
      case "epic":
        return "from-purple-500/20 to-pink-500/20 border-purple-400/40";
      case "rare":
        return "from-blue-500/20 to-cyan-500/20 border-blue-400/40";
      default:
        return "from-white/5 to-white/10 border-white/20";
    }
  };

  const getRarityBadgeColor = (rarity: Rarity) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-yellow-200 border-yellow-400/50";
      case "epic":
        return "bg-gradient-to-r from-purple-400/30 to-pink-400/30 text-purple-200 border-purple-400/50";
      case "rare":
        return "bg-gradient-to-r from-blue-400/30 to-cyan-400/30 text-blue-200 border-blue-400/50";
      default:
        return "bg-white/20 text-white/80 border-white/30";
    }
  };

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
      <div className="relative z-20 max-w-6xl mx-auto pt-8 sm:pt-10 pb-8 p-4 sm:p-6 space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-green-400 to-indigo-400 inline-block text-transparent bg-clip-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            🏆 Achievements
          </h1>
          <p className="text-xl text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            {unlockedCount}/{items.length} achievements unlocked
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
          <CardContent className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              <Input
                placeholder="Search achievements..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white/15 border-white/30 text-white placeholder:text-white/70 focus:border-blue-400/60 shadow-sm"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={tab === "all" ? "default" : "outline"}
                onClick={() => setTab("all")}
                className={`shadow-sm ${
                  tab === "all"
                    ? "bg-blue-500/25 text-blue-200 border-blue-400/60"
                    : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                }`}
                size="sm"
              >
                All ({items.length})
              </Button>
              <Button
                variant={tab === "unlocked" ? "default" : "outline"}
                onClick={() => setTab("unlocked")}
                className={`shadow-sm ${
                  tab === "unlocked"
                    ? "bg-green-500/25 text-green-200 border-green-400/60"
                    : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                }`}
                size="sm"
              >
                <Unlock className="w-4 h-4 mr-1" />
                Unlocked ({unlockedCount})
              </Button>
              <Button
                variant={tab === "locked" ? "default" : "outline"}
                onClick={() => setTab("locked")}
                className={`shadow-sm ${
                  tab === "locked"
                    ? "bg-white/25 text-white border-white/50"
                    : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                }`}
                size="sm"
              >
                <Lock className="w-4 h-4 mr-1" />
                Locked ({items.length - unlockedCount})
              </Button>
            </div>

            {/* Rarity Filters */}
            <div className="flex flex-wrap gap-2">
              {(["all", "common", "rare", "epic", "legendary"] as const).map((r) => (
                <Button
                  key={r}
                  variant={rarity === r ? "default" : "outline"}
                  onClick={() => setRarity(r)}
                  className={`shadow-sm ${
                    rarity === r
                      ? "bg-purple-500/25 text-purple-200 border-purple-400/60"
                      : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                  }`}
                  size="sm"
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEvaluate}
                className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25 shadow-sm"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Evaluate Progress
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25 shadow-sm"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        {filtered.length === 0 ? (
          <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl">
            <CardContent className="p-12">
              <div className="text-center text-white/60">
                <Trophy className="h-16 w-16 mx-auto mb-4 text-white/40" />
                <p className="text-lg">No achievements found</p>
                <p className="text-sm mt-2">Try adjusting your filters</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((a) => (
              <Card
                key={a.id}
                className={`backdrop-blur-md shadow-lg rounded-2xl transition-all duration-300 ${
                  a.unlocked
                    ? `bg-gradient-to-br ${getRarityColor(a.rarity)} border-2`
                    : "bg-white/5 border border-white/15 opacity-80"
                } ${a.unlocked ? "hover:scale-105" : ""}`}
              >
                <CardContent className="p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{a.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">{a.title}</h3>
                      </div>
                    </div>
                    {a.unlocked ? (
                      <Unlock className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <Lock className="w-5 h-5 text-white/40 flex-shrink-0" />
                    )}
                  </div>

                  {/* Rarity Badge */}
                  <div className="flex justify-start">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold border ${getRarityBadgeColor(
                        a.rarity
                      )}`}
                    >
                      {a.rarity.toUpperCase()}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 text-sm leading-relaxed">{a.description}</p>

                  {/* Progress Bar */}
                  {typeof a.progress === "number" && a.target && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Progress</span>
                        <span>
                          {Math.round(a.progress * (a.target || 1))}/{a.target}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            a.unlocked
                              ? "bg-gradient-to-r from-green-400 to-emerald-500"
                              : "bg-gradient-to-r from-blue-400 to-cyan-500"
                          }`}
                          style={{ width: `${Math.round((a.progress || 0) * 100)}%` }}
                        />
                      </div>
                      <div className="text-right text-xs text-white/60">
                        {Math.round((a.progress || 0) * 100)}%
                      </div>
                    </div>
                  )}

                  {/* Unlock Status */}
                  {!a.progress && (
                    <div
                      className={`text-xs font-semibold ${
                        a.unlocked ? "text-green-300" : "text-white/50"
                      }`}
                    >
                      {a.unlocked ? "✓ Unlocked" : "○ Locked"}
                    </div>
                  )}

                  {/* Unlock Date */}
                  {a.unlocked && a.unlockedAt && (
                    <div className="text-xs text-white/50 pt-2 border-t border-white/10">
                      Unlocked: {new Date(a.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AchievementsPage;
