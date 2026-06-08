import { useEffect } from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface UseListEntryAnimationParams {
  index: number;
  delayPerItem?: number;
}

export const useListEntryAnimation = ({
  delayPerItem = 150,
  index,
}: UseListEntryAnimationParams) => {
  const translateX = useSharedValue(index % 2 === 0 ? -60 : 60);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const delay = delayPerItem * index;
    translateX.value = withDelay(
      delay,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) }),
    );
    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
  }, [index, delayPerItem, translateX, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return { animatedStyle };
};
