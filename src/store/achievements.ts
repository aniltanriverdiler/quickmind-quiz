import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Achievement = {
  id: string;
  title: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  progress?: number;
  target?: number;
  unlockedAt?: string;
  icon?: string;
};

type AchStore = {
  list: Record<string, Achievement>;
  evaluateAll: (ctx: EvalContext) => string[];
  reset: () => void;
};

type QuizResult = {
  date: string;
  score: number;
  totalQuestions: number;
  wrongAnswers: number;
  skippedQuestions: number;
  percentage: number;
  performanceLevel: string;
  category?: string | null;
  difficulty?: string | null;
};

type EvalContext = {
  results: QuizResult[];
  rank: number | null;
};

export const useAchievements = create(
  persist<AchStore>(
    (set, get) => ({
      list: {
        // Quick start
        first_quiz: {
          id: "first_quiz",
          title: "First Quiz",
          description: "Complete your first quiz",
          rarity: "common",
          unlocked: false,
          icon: "🎯",
        },
        first_win: {
          id: "first_win",
          title: "First Win",
          description: "Score ≥50% for the first time",
          rarity: "common",
          unlocked: false,
          icon: "🏆",
        },
        perfect: {
          id: "perfect",
          title: "Perfect Score",
          description: "Score 100% on any quiz",
          rarity: "epic",
          unlocked: false,
          icon: "💯",
        },
        comeback: {
          id: "comeback",
          title: "Comeback",
          description: "Improve by +30% from previous quiz",
          rarity: "rare",
          unlocked: false,
          icon: "📈",
        },

        // Performance-focused
        consistency: {
          id: "consistency",
          title: "Consistency",
          description: "Score ≥70% on 3 consecutive quizzes",
          rarity: "rare",
          unlocked: false,
          progress: 0,
          target: 3,
          icon: "🎯",
        },
        accuracy_80: {
          id: "accuracy_80",
          title: "Accuracy Master",
          description: "Reach ≥80% accuracy",
          rarity: "rare",
          unlocked: false,
          icon: "🎖️",
        },
        accuracy_90: {
          id: "accuracy_90",
          title: "Precision Expert",
          description: "Reach ≥90% accuracy",
          rarity: "epic",
          unlocked: false,
          icon: "⭐",
        },

        // Volume/progress
        rookie: {
          id: "rookie",
          title: "Rookie",
          description: "Complete 5 quizzes",
          rarity: "common",
          unlocked: false,
          progress: 0,
          target: 5,
          icon: "🌱",
        },
        regular: {
          id: "regular",
          title: "Regular",
          description: "Complete 20 quizzes",
          rarity: "rare",
          unlocked: false,
          progress: 0,
          target: 20,
          icon: "💪",
        },
        grinder: {
          id: "grinder",
          title: "Grinder",
          description: "Complete 50 quizzes",
          rarity: "epic",
          unlocked: false,
          progress: 0,
          target: 50,
          icon: "🔥",
        },
        thousand_club: {
          id: "thousand_club",
          title: "Thousand Club",
          description: "Answer 1000 questions correctly",
          rarity: "legendary",
          unlocked: false,
          progress: 0,
          target: 1000,
          icon: "👑",
        },

        // Category/difficulty
        difficulty_hard: {
          id: "difficulty_hard",
          title: "Difficulty Challenger",
          description: "Score ≥70% on 3 hard quizzes",
          rarity: "epic",
          unlocked: false,
          progress: 0,
          target: 3,
          icon: "⚔️",
        },

        // Behavior/streak
        no_skip: {
          id: "no_skip",
          title: "No Skip",
          description: "Complete a quiz without skipping",
          rarity: "rare",
          unlocked: false,
          icon: "✅",
        },
        streak_3: {
          id: "streak_3",
          title: "Daily Streak 3",
          description: "Complete quizzes on 3 consecutive days",
          rarity: "rare",
          unlocked: false,
          progress: 0,
          target: 3,
          icon: "🔥",
        },
        streak_7: {
          id: "streak_7",
          title: "Weekly Warrior",
          description: "Complete quizzes on 7 consecutive days",
          rarity: "epic",
          unlocked: false,
          progress: 0,
          target: 7,
          icon: "⚡",
        },
        streak_14: {
          id: "streak_14",
          title: "Two Week Champion",
          description: "Complete quizzes on 14 consecutive days",
          rarity: "legendary",
          unlocked: false,
          progress: 0,
          target: 14,
          icon: "🌟",
        },

        // Social/leaderboard
        top10: {
          id: "top10",
          title: "Top 10",
          description: "Enter Top 10 on the leaderboard",
          rarity: "rare",
          unlocked: false,
          icon: "🥉",
        },
        top3: {
          id: "top3",
          title: "Top 3",
          description: "Enter Top 3 on the leaderboard",
          rarity: "epic",
          unlocked: false,
          icon: "🥈",
        },
        champion: {
          id: "champion",
          title: "Champion",
          description: "Reach #1 on the leaderboard",
          rarity: "legendary",
          unlocked: false,
          icon: "🥇",
        },
      },
      evaluateAll: (ctx) => {
        const now = new Date().toISOString();
        const updated = { ...get().list };
        const unlocked: string[] = [];
        const total = ctx.results.length;

        const unlock = (id: string) => {
          if (!updated[id]?.unlocked) {
            updated[id] = {
              ...updated[id],
              unlocked: true,
              unlockedAt: now,
              progress: updated[id]?.target ? 1 : undefined,
            };
            unlocked.push(id);
          }
        };

        // Simple start
        if (total >= 1) unlock("first_quiz");
        if (ctx.results.some((r) => r.percentage >= 50)) unlock("first_win");
        if (ctx.results.some((r) => r.percentage === 100)) unlock("perfect");
        
        // Comeback: Compare last 2 quizzes
        if (total >= 2) {
          const sorted = [...ctx.results].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          const latest = sorted[0];
          const previous = sorted[1];
          if (latest.percentage - previous.percentage >= 30) {
            unlock("comeback");
          }
        }

        // Performance-focused
        // Consistency: Son 3 quiz ≥70%
        if (total >= 3) {
          const sorted = [...ctx.results].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          const lastThree = sorted.slice(0, 3);
          const consecutive = lastThree.every((r) => r.percentage >= 70);
          updated["consistency"].progress = consecutive ? 1 : lastThree.filter(r => r.percentage >= 70).length / 3;
          if (consecutive) unlock("consistency");
        }
        
        if (ctx.results.some((r) => r.percentage >= 80)) unlock("accuracy_80");
        if (ctx.results.some((r) => r.percentage >= 90)) unlock("accuracy_90");

        // Volume/progress
        updated["rookie"].progress = Math.min(total / 5, 1);
        if (total >= 5) unlock("rookie");
        
        updated["regular"].progress = Math.min(total / 20, 1);
        if (total >= 20) unlock("regular");
        
        updated["grinder"].progress = Math.min(total / 50, 1);
        if (total >= 50) unlock("grinder");
        
        const totalCorrect = ctx.results.reduce((sum, r) => sum + r.score, 0);
        updated["thousand_club"].progress = Math.min(totalCorrect / 1000, 1);
        if (totalCorrect >= 1000) unlock("thousand_club");

        // Category/difficulty
        const hardQuizzes = ctx.results.filter((r) => 
          r.difficulty === "hard" && r.percentage >= 70
        );
        updated["difficulty_hard"].progress = Math.min(hardQuizzes.length / 3, 1);
        if (hardQuizzes.length >= 3) unlock("difficulty_hard");

        // Behavior/streak
        if (ctx.results.some((r) => r.skippedQuestions === 0)) unlock("no_skip");
        
        // Streak calculation
        const days = new Set(
          ctx.results.map((r) => new Date(r.date).toDateString())
        );
        const calculateStreak = () => {
          const sorted = [...days]
            .map((d) => new Date(d).getTime())
            .sort((a, b) => a - b);
          let maxStreak = 1;
          let currentStreak = 1;
          for (let i = 1; i < sorted.length; i++) {
            const diff = (sorted[i] - sorted[i - 1]) / (1000 * 60 * 60 * 24);
            if (diff === 1) {
              currentStreak++;
              maxStreak = Math.max(maxStreak, currentStreak);
            } else if (diff > 1) {
              currentStreak = 1;
            }
          }
          return maxStreak;
        };
        
        const streak = calculateStreak();
        updated["streak_3"].progress = Math.min(streak / 3, 1);
        if (streak >= 3) unlock("streak_3");
        
        updated["streak_7"].progress = Math.min(streak / 7, 1);
        if (streak >= 7) unlock("streak_7");
        
        updated["streak_14"].progress = Math.min(streak / 14, 1);
        if (streak >= 14) unlock("streak_14");

        // Social/leaderboard
        if (ctx.rank !== null && ctx.rank <= 10) unlock("top10");
        if (ctx.rank !== null && ctx.rank <= 3) unlock("top3");
        if (ctx.rank === 1) unlock("champion");

        set({ list: updated });
        return unlocked;
      },
      
      reset: () => {
        const initialList = get().list;
        const resetList = Object.keys(initialList).reduce((acc, key) => {
          acc[key] = {
            ...initialList[key],
            unlocked: false,
            progress: initialList[key].target ? 0 : undefined,
            unlockedAt: undefined,
          };
          return acc;
        }, {} as Record<string, Achievement>);
        set({ list: resetList });
      },
    }),
    {
      name: "achievements-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
