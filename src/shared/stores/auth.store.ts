import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface AuthStore {
  user: {
    id: string;
    name: string;
    createdAt: Date;
  } | null;
  setAuthenticated: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setAuthenticated: (name: string) => {
        set({
          user: { id: `user-${Date.now()}`, name, createdAt: new Date() },
        });
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "@memory-game:auth",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
