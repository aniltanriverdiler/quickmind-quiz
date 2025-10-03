import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";

// Data structure for a single user's entry in the leaderboard
export type LeaderboardUser = {
  id: string;
  username: string;
  avatarUrl?: string;
  score: number;
  percentage: number;
};

// State and actions for the leaderboard store
type LeaderboardState = {
  leaderboard: LeaderboardUser[];
  addScore: (username: string, score: number, percentage: number) => void;
  initializeData: () => void;
  getUserRank: (username: string) => number | null;
  clearLeaderboard: () => void;
};

// Dummy data to populate the leaderboard initially (scores out of 10)
const DUMMY_USERS = [
  { username: "TechWizard", score: 10, percentage: 100 },
  { username: "CodeNinja", score: 9, percentage: 90 },
  { username: "TriviaKing", score: 9, percentage: 90 },
  { username: "Mastermind", score: 8, percentage: 80 },
  { username: "Genius", score: 8, percentage: 80 },
  { username: "ProCoder", score: 7, percentage: 70 },
  { username: "CodeGuru", score: 7, percentage: 70 },
  { username: "QuizQueen", score: 6, percentage: 60 },
];

export const useLeaderboardStore = create(
  persist<LeaderboardState>(
    (set, get) => ({
      leaderboard: [],

      // Adds a new score entry to the leaderboard
      addScore: (username, score, percentage) => {
        set((state) => {
          const existing = state.leaderboard.find(
            (u) => u.username === username
          );
          const newEntry: LeaderboardUser = {
            id: existing?.id ?? nanoid(),
            username,
            avatarUrl: existing?.avatarUrl ?? "",
            score: existing ? Math.max(existing.score, score) : score,
            percentage: existing
              ? Math.max(existing.percentage, percentage)
              : percentage,
          };
          // Remove existing entry if it exists
          const others = state.leaderboard.filter(
            (u) => u.username !== username
          );
          // Add new entry and sort by percentage first, then by score
          const updatedList = [...others, newEntry].sort(
            (a, b) => {
              // Primary sort: percentage (descending)
              if (b.percentage !== a.percentage) {
                return b.percentage - a.percentage;
              }
              // Secondary sort: score (descending)
              return b.score - a.score;
            }
          );
          return { leaderboard: updatedList };
        });
      },

      // Populates the leaderboard with dummy data if it's empty (development only)
      initializeData: () => {
        if (get().leaderboard.length === 0) {
          const initialData: LeaderboardUser[] = DUMMY_USERS.map((user) => ({
            ...user,
            id: nanoid(),
            avatarUrl: "",
          })).sort((a, b) => {
            // Primary sort: percentage (descending)
            if (b.percentage !== a.percentage) {
              return b.percentage - a.percentage;
            }
            // Secondary sort: score (descending)
            return b.score - a.score;
          });
          set({ leaderboard: initialData });
        }
      },

      // Gets the rank of a specific user by username
      getUserRank: (username) => {
        const index = get().leaderboard.findIndex(
          (user) => user.username === username
        );
        return index !== -1 ? index + 1 : null;
      },

      // Clears all leaderboard data
      clearLeaderboard: () => {
        set({ leaderboard: [] });
      },
    }),
    {
      name: "leaderboard-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
