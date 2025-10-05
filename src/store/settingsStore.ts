import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";
export type QuizDifficulty = "easy" | "medium" | "hard";

export type UserProfile = {
  displayName: string;
  avatar: string;
  visibility: "public" | "private" | "friends";
};

export type QuizSettings = {
  defaultQuestions: number;
  defaultDifficulty: QuizDifficulty;
  defaultCategory: string;
  showTimer: boolean;
  autoSave: boolean;
  soundEffects: boolean;
};

export type NotificationSettings = {
  enabled: boolean;
  quizReminders: boolean;
  achievementAlerts: boolean;
  leaderboardUpdates: boolean;
  dailyStreak: boolean;
};

type SettingsState = {
  // Theme
  theme: ThemeMode;
  colorPalette: string;

  // Quiz Settings
  quizSettings: QuizSettings;

  // Notifications
  notifications: NotificationSettings;

  // User Profile
  userProfile: UserProfile;

  // Actions
  setTheme: (theme: ThemeMode) => void;
  setColorPalette: (palette: string) => void;
  updateQuizSettings: (settings: Partial<QuizSettings>) => void;
  updateNotifications: (settings: Partial<NotificationSettings>) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Data Management
  exportData: () => string;
  importData: (data: string) => boolean;
  resetAllData: () => void;
  resetQuizHistory: () => void;
  resetAchievements: () => void;
  resetLeaderboard: () => void;

  // Notification Permissions
  requestNotificationPermission: () => Promise<boolean>;
  sendNotification: (title: string, body: string) => void;
};

const defaultQuizSettings: QuizSettings = {
  defaultQuestions: 10,
  defaultDifficulty: "medium",
  defaultCategory: "all",
  showTimer: true,
  autoSave: true,
  soundEffects: false,
};

const defaultNotifications: NotificationSettings = {
  enabled: false,
  quizReminders: true,
  achievementAlerts: true,
  leaderboardUpdates: true,
  dailyStreak: true,
};

const defaultUserProfile: UserProfile = {
  displayName: "",
  avatar: "",
  visibility: "public",
};

// Helper function to apply theme
const applyTheme = (theme: ThemeMode) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (theme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    // System preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};

export const useSettingsStore = create(
  persist<SettingsState>(
    (set, get) => ({
      // Initial State
      theme: "system",
      colorPalette: "default",
      quizSettings: defaultQuizSettings,
      notifications: defaultNotifications,
      userProfile: defaultUserProfile,

      // Theme Actions
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },

      setColorPalette: (palette) => set({ colorPalette: palette }),

      // Quiz Settings
      updateQuizSettings: (settings) =>
        set((state) => ({
          quizSettings: { ...state.quizSettings, ...settings },
        })),

      // Notifications
      updateNotifications: (settings) =>
        set((state) => ({
          notifications: { ...state.notifications, ...settings },
        })),

      // User Profile
      updateUserProfile: (profile) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...profile },
        })),

      // Data Management
      exportData: () => {
        const allData = {
          settings: {
            theme: get().theme,
            colorPalette: get().colorPalette,
            quizSettings: get().quizSettings,
            notifications: get().notifications,
            userProfile: get().userProfile,
          },
          quizHistory: Object.keys(localStorage)
            .filter((key) => key.startsWith("quizHistory_"))
            .reduce((acc, key) => {
              acc[key] = JSON.parse(localStorage.getItem(key) || "[]");
              return acc;
            }, {} as Record<string, unknown>),
          achievements: localStorage.getItem("achievements-storage"),
          leaderboard: localStorage.getItem("leaderboard-storage"),
        };
        return JSON.stringify(allData, null, 2);
      },

      importData: (data) => {
        try {
          const parsed = JSON.parse(data);

          // Import settings
          if (parsed.settings) {
            set({
              theme: parsed.settings.theme || get().theme,
              colorPalette: parsed.settings.colorPalette || get().colorPalette,
              quizSettings: parsed.settings.quizSettings || get().quizSettings,
              notifications:
                parsed.settings.notifications || get().notifications,
              userProfile: parsed.settings.userProfile || get().userProfile,
            });
          }

          // Import quiz history
          if (parsed.quizHistory) {
            Object.entries(parsed.quizHistory).forEach(([key, value]) => {
              localStorage.setItem(key, JSON.stringify(value));
            });
          }

          // Import achievements
          if (parsed.achievements) {
            localStorage.setItem("achievements-storage", parsed.achievements);
          }

          // Import leaderboard
          if (parsed.leaderboard) {
            localStorage.setItem("leaderboard-storage", parsed.leaderboard);
          }

          return true;
        } catch (error) {
          console.error("Import failed:", error);
          return false;
        }
      },

      resetAllData: () => {
        // Clear all localStorage
        localStorage.clear();

        // Reset to defaults
        set({
          theme: "system",
          colorPalette: "default",
          quizSettings: defaultQuizSettings,
          notifications: defaultNotifications,
          userProfile: defaultUserProfile,
        });
      },

      resetQuizHistory: () => {
        Object.keys(localStorage)
          .filter((key) => key.startsWith("quizHistory_"))
          .forEach((key) => localStorage.removeItem(key));
      },

      resetAchievements: () => {
        localStorage.removeItem("achievements-storage");
      },

      resetLeaderboard: () => {
        localStorage.removeItem("leaderboard-storage");
      },

      // Notification API
      requestNotificationPermission: async () => {
        if (!("Notification" in window)) {
          console.warn("This browser does not support notifications");
          return false;
        }

        const permission = await Notification.requestPermission();
        const enabled = permission === "granted";

        set((state) => ({
          notifications: { ...state.notifications, enabled },
        }));

        return enabled;
      },

      sendNotification: (title, body) => {
        if (!get().notifications.enabled) return;

        if (Notification.permission === "granted") {
          new Notification(title, {
            body,
            icon: "/brain.png",
            badge: "/brain.png",
          });
        }
      },
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Apply theme when store is rehydrated
        if (state) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

// Initialize theme on first load
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("settings-storage");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.state?.theme) {
        applyTheme(parsed.state.theme);
      }
    } catch (e) {
      console.error("Failed to parse settings:", e);
    }
  } else {
    applyTheme("system");
  }
}
