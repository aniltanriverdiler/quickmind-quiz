import { useEffect, useMemo, useState, useCallback } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Search,
  Trophy,
  Lock,
  Unlock,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useAchievements } from "../store/achievements";
import { useLeaderboardStore } from "../store/leader";
import bgVideo from "../assets/color-smoke-14.mp4";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

type Rarity = "common" | "rare" | "epic" | "legendary";
type FilterTab = "all" | "unlocked" | "locked" | "inprogress";

function AchievementsPage() {
  const { currentUser } = useAuthStore();
  const { list, evaluateAll, reset } = useAchievements();
  const { getUserRank } = useLeaderboardStore();

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<FilterTab>("all");
  const [rarity, setRarity] = useState<Rarity | "all">("all");
  const [sortBy, setSortBy] = useState<
    "unlocked" | "title" | "rarity" | "date" | "progress"
  >("unlocked");

  // URL Search Params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setTab((params.get("tab") as FilterTab) || "all");
    setRarity((params.get("rarity") as Rarity | "all") || "all");
    setSortBy(
      (params.get("sort") as
        | "unlocked"
        | "title"
        | "rarity"
        | "date"
        | "progress") || "unlocked"
    );
    setSearch(params.get("q") || "");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("tab", tab);
    params.set("rarity", rarity);
    params.set("sort", sortBy);
    if (search) params.set("q", search);
    window.history.replaceState({}, "", `?${params.toString()}`);
  }, [tab, rarity, sortBy, search]);

  const items = useMemo(() => Object.values(list), [list]);

  // Calculate Counts
  const counts = useMemo(() => {
    return items.reduce(
      (acc, a) => {
        acc.all++;
        acc[a.rarity] = (acc[a.rarity] || 0) + 1;
        return acc;
      },
      { all: 0, common: 0, rare: 0, epic: 0, legendary: 0 } as Record<
        string,
        number
      >
    );
  }, [items]);

  const filtered = useMemo(() => {
    const data = items
      .filter((a) => {
        if (tab === "unlocked") return a.unlocked;
        if (tab === "locked") return !a.unlocked;
        if (tab === "inprogress")
          return (
            typeof a.progress === "number" && a.progress > 0 && a.progress < 1
          );
        return true;
      })
      .filter((a) => (rarity === "all" ? true : a.rarity === rarity))
      .filter((a) =>
        search
          ? (a.title + " " + a.description)
              .toLowerCase()
              .includes(search.toLowerCase())
          : true
      );

    return data.sort((a, b) => {
      if (sortBy === "unlocked")
        return (b.unlocked ? 1 : 0) - (a.unlocked ? 1 : 0);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "rarity")
        return (
          ["common", "rare", "epic", "legendary"].indexOf(a.rarity) -
          ["common", "rare", "epic", "legendary"].indexOf(b.rarity)
        );
      if (sortBy === "date")
        return (
          new Date(b.unlockedAt || 0).getTime() -
          new Date(a.unlockedAt || 0).getTime()
        );
      if (sortBy === "progress") return (b.progress || 0) - (a.progress || 0);
      return 0;
    });
  }, [items, tab, rarity, search, sortBy]);

  const unlockedCount = items.filter((a) => a.unlocked).length;

  const handleEvaluate = useCallback(() => {
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
  }, [currentUser, evaluateAll, getUserRank]);

  // Reset achievements
  const handleReset = useCallback(() => {
    if (!currentUser) return;
    reset();
    toast.success("Achievements reset!");
  }, [currentUser, reset]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: globalThis.KeyboardEvent) => {
      if ((event.target as HTMLElement)?.tagName === "INPUT") return;

      switch (event.key.toLowerCase()) {
        case "/":
          event.preventDefault();
          document
            .querySelector<HTMLInputElement>(
              'input[placeholder="Search achievements..."]'
            )
            ?.focus();
          break;
        case "e":
          handleEvaluate();
          break;
        case "r":
          handleReset();
          break;
        case "a":
          setTab("all");
          break;
        case "u":
          setTab("unlocked");
          break;
        case "l":
          setTab("locked");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleEvaluate, handleReset]);

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
              <Button
                variant={tab === "inprogress" ? "default" : "outline"}
                onClick={() => setTab("inprogress")}
                className={`shadow-sm ${
                  tab === "inprogress"
                    ? "bg-yellow-500/25 text-yellow-200 border-yellow-400/60"
                    : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                }`}
                size="sm"
              >
                In Progress (
                {
                  items.filter(
                    (a) =>
                      typeof a.progress === "number" &&
                      a.progress > 0 &&
                      a.progress < 1
                  ).length
                }
                )
              </Button>
            </div>

            {/* Rarity Filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-white/70 text-sm self-center mr-2">
                Rarity:
              </span>
              {(["all", "common", "rare", "epic", "legendary"] as const).map(
                (r) => (
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
                    {r.charAt(0).toUpperCase() + r.slice(1)} (
                    {r === "all" ? counts.all : counts[r]})
                  </Button>
                )
              )}
            </div>

            {/* Sort Options */}
            <div className="flex flex-wrap gap-2">
              <span className="text-white/70 text-sm self-center mr-2">
                Sort by:
              </span>
              {(
                ["unlocked", "title", "rarity", "date", "progress"] as const
              ).map((s) => (
                <Button
                  key={s}
                  variant={sortBy === s ? "default" : "outline"}
                  onClick={() => setSortBy(s)}
                  className={`shadow-sm ${
                    sortBy === s
                      ? "bg-blue-500/25 text-blue-200 border-blue-400/60"
                      : "bg-white/15 text-white/85 border-white/30 hover:bg-white/25"
                  }`}
                  size="sm"
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25 shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-white">
                      <AlertTriangle className="w-5 h-5 text-orange-400" />
                      Reset Achievements
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-white/80">
                      Are you sure you want to reset all achievements? This
                      action cannot be undone and will:
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Unlock all achievements</li>
                        <li>• Reset all progress to 0</li>
                        <li>• Clear unlock dates</li>
                      </ul>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white/15 text-white/85 border-white/30 hover:bg-white/25">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleReset}
                      className="bg-red-500/20 text-red-200 border-red-400/30 hover:bg-red-500/30 hover:border-red-400/50"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Keyboard Shortcuts Info */}
            <div className="text-xs text-white/50 space-x-4 pt-2 border-t border-white/10">
              <span>
                Press{" "}
                <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-white/70">
                  /
                </kbd>{" "}
                to search
              </span>
              <span>
                <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-white/70">
                  E
                </kbd>{" "}
                evaluate
              </span>
              <span>
                <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-white/70">
                  R
                </kbd>{" "}
                reset
              </span>
              <span>
                <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-white/70">
                  A
                </kbd>{" "}
                all
              </span>
              <span>
                <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-white/70">
                  U
                </kbd>{" "}
                unlocked
              </span>
              <span>
                <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-white/70">
                  L
                </kbd>{" "}
                locked
              </span>
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
                        <h3 className="text-white font-bold text-lg">
                          {a.title}
                        </h3>
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
                  <p className="text-white/80 text-sm leading-relaxed">
                    {a.description}
                  </p>

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
                          style={{
                            width: `${Math.round((a.progress || 0) * 100)}%`,
                          }}
                        />
                      </div>
                      <div className="text-right text-xs text-white/60">
                        {Math.round((a.progress || 0) * 100)}%
                      </div>
                    </div>
                  )}

                  {/* Next Milestone */}
                  {a.target &&
                    typeof a.progress === "number" &&
                    !a.unlocked && (
                      <div className="text-xs text-white/70 mt-1">
                        {Math.max(
                          0,
                          a.target - Math.round(a.progress * a.target)
                        )}{" "}
                        to go
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
