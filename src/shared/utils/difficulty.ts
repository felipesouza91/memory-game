import { colors } from "@/constants/colors";
import { Difficulty } from "../interfaces/difficulty";

const difficultyColors: Record<Difficulty, string> = {
  Difícil: colors.semantic.error,
  Médio: colors.semantic.warning,
  Fácil: colors.feedback.info,
};

export const getDifficultyColors = (difficulty: Difficulty) =>
  difficultyColors[difficulty];
