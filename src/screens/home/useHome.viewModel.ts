import { Difficulty } from "@/shared/interfaces/difficulty";
import { router } from "expo-router";
import { useCallback, useState } from "react";

export const useHome = () => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("Fácil");

  const handleSelectedChalange = useCallback(
    (themeId: string) => {
      router.push({
        pathname: "/(private)/game",
        params: {
          themeId,
          difficulty: selectedDifficulty,
        },
      });
    },
    [selectedDifficulty],
  );
  return { selectedDifficulty, setSelectedDifficulty, handleSelectedChalange };
};
