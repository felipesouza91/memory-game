import { Difficulty } from "@/shared/interfaces/difficulty";

interface UseDifficultyIconParams {
  difficulty: Difficulty;
  color: string;
  isSelect: boolean;
  inactiveColor: string;
}

export const useDifficultyIcon = ({
  color,
  difficulty,
  inactiveColor,
  isSelect,
}: UseDifficultyIconParams) => {
  const barHeiht = [6, 10, 14];
  const barCount = difficulty === "Fácil" ? 1 : difficulty === "Médio" ? 2 : 3;

  const getBarStyle = (index: number) => {
    return {
      height: barHeiht[index - 1],
      backgroundColor: index <= barCount && isSelect ? color : inactiveColor,
    };
  };
  return { getBarStyle };
};
