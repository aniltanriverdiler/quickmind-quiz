import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthStore = {
  users: User[];
  currentUser: User | null;
  register: (user: User) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,

      register: (user) => {
        set((state) => ({
          users: [...state.users, user],
          currentUser: user,
        }));
      },

      login: (email, password) => {
        const { users } = get();
        const userFound = users.find(
          (user) => user.email === email && user.password === password
        );

        if (userFound) {
          set({ currentUser: userFound });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ currentUser: null });
      },
    }),
    {
      name: "auth-storage", //localStorage key
    }
  )
);
