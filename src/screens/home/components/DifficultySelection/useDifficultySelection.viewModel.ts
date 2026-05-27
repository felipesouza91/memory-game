import { useNumberAnimation } from "@/animations/hooks/useNumberAnimation";
import { Difficulty } from "@/shared/interfaces/difficulty";
import { difficultyConfigs } from "@/shared/utils/challange";
import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const difficulties: Difficulty[] = ["Fácil", "Médio", "Difícil"];
interface UseDifficultySelectionParams {
  selectedDifficulty: Difficulty;
  setSelectedDifficulty: (data: Difficulty) => void;
}
export const useDifficultySelection = ({
  selectedDifficulty,
  setSelectedDifficulty,
}: UseDifficultySelectionParams) => {
  const difficultConfig = difficultyConfigs[selectedDifficulty];
  const selectedIndex = difficulties.indexOf(selectedDifficulty);
  const { animatedStyle: timeAnimatedStyle } = useNumberAnimation(
    difficultConfig.estimedTime,
  );
  const translateX = useSharedValue(selectedIndex * 100);
  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: `${translateX.value}%`,
      },
    ],
  }));
  useEffect(() => {
    const newIndex = difficulties.indexOf(selectedDifficulty);
    translateX.value = withSpring(newIndex * 100, {
      damping: 30,
      stiffness: 120,
      overshootClamping: true,
    });
  }, [selectedDifficulty, difficulties, translateX]);

  return {
    difficulties,
    difficultConfig,
    timeAnimatedStyle,
    selectedDifficulty,
    animatedIndicatorStyle,
    setSelectedDifficulty,
  };
};
