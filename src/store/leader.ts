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
};

// Dummy data to populate the leaderboard initially
const DUMMY_USERS = [
  { username: "TechWizard", score: 95, percentage: 95 },
  { username: "CodeNinja", score: 90, percentage: 90 },
  { username: "TriviaKing", score: 85, percentage: 85 },
  { username: "Mastermind", score: 80, percentage: 80 },
  { username: "Genius", score: 75, percentage: 75 },
  { username: "ProCoder", score: 70, percentage: 70 },
  { username: "CodeGuru", score: 65, percentage: 65 },
  { username: "QuizQueen", score: 60, percentage: 60 },
];

export const useLeaderboardStore = create(
  persist<LeaderboardState>(
    (set, get) => ({
      leaderboard: [],

      // Adds a new score entry to the leaderboard
      addScore: (username, score, percentage) => {
        set((state) => {
          const newEntry: LeaderboardUser = {
            id: nanoid(),
            username,
            avatarUrl: "",
            score,
            percentage,
          };
          // Create a new array with the new entry and sort it by score
          const updatedList = [...state.leaderboard, newEntry].sort(
            (a, b) => b.score - a.score
          );
          return { leaderboard: updatedList };
        });
      },

      // Populates the leaderboard with dummy data if it's empty
      initializeData: () => {
        if (get().leaderboard.length === 0) {
          const initialData: LeaderboardUser[] = DUMMY_USERS.map((user) => ({
            ...user,
            id: nanoid(),
          })).sort((a, b) => b.score - a.score);
          set({ leaderboard: initialData });
        }
      },
    }),
    {
      name: "leaderboard-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
