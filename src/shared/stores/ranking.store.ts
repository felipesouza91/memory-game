import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Difficulty } from "../interfaces/difficulty";

export interface GameScore {
  id: string;
  category: string;
  difficulty: Difficulty;
  date: Date;
  time: number;
}

type CreateGameScore = Omit<GameScore, "id" | "date">;

interface RankingScore {
  scores: GameScore[];
  addScore: (score: CreateGameScore) => void;
  deleteScore: (id: string) => void;
}

const difficultyWeight: Record<Difficulty, number> = {
  Difícil: 3,
  Médio: 2,
  Fácil: 1,
};

export const useRankingStore = create<RankingScore>()(
  persist(
    (set) => ({
      scores: [] as GameScore[],
      addScore: (data: CreateGameScore) => {
        const score = { ...data, id: Date.now().toString(), date: new Date() };
        set((prev) => ({
          scores: [...prev.scores, score].sort((a, b) => {
            const diffA = difficultyWeight[a.difficulty];
            const diffB = difficultyWeight[b.difficulty];
            if (diffB !== diffA) return diffB - diffA;
            return a.time - b.time;
          }),
        }));
      },
      deleteScore: (id: string) => {
        set((prev) => ({
          scores: prev.scores.filter((data) => data.id !== id),
        }));
      },
    }),
    {
      name: "@memory-game:scores",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
