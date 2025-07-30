import { create } from "zustand";

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthStore = {
  users: User[];
  register: (user: User) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  users: [],
  register: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
}));
