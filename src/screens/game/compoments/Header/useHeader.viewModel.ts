import { useGameStore } from "@/shared/stores/game.store";
import { useEffect } from "react";
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export const useHeader = () => {
  const { timeRemaing } = useGameStore();

  const scale = useSharedValue(1);

  const minuts = Math.floor(timeRemaing / 60);
  const seconds = timeRemaing % 60;
  const timeString = `${String(minuts).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isCriticalTime = timeRemaing <= 10;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (isCriticalTime) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 300 }),
          withTiming(1, { duration: 300 }),
        ),
        -1,
        true,
      );
    } else {
      cancelAnimation(scale);
    }
  }, [isCriticalTime, scale, timeRemaing]);

  return { timeString, isCriticalTime, animatedStyle };
};
