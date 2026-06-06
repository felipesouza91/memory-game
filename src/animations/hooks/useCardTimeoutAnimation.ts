import { ANIMATION_TIMES } from "@/animations/config/animation.config";
import { useCallback } from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
export const useCardTimeoutAnimation = () => {
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const fall = useCallback(
    (delay: number) => {
      const config = ANIMATION_TIMES.fall;
      const randonRotation = (Math.random() - 0.5) * 60;
      translateY.value = withDelay(
        delay,
        withTiming(800, {
          duration: config.duration,
          easing: Easing.in(Easing.cubic),
        }),
      );

      rotation.value = withDelay(
        delay,
        withTiming(randonRotation, {
          duration: config.rotation,
          easing: Easing.out(Easing.ease),
        }),
      );

      opacity.value = withDelay(
        delay + config.opacityDelay,
        withTiming(0, { duration: config.opacityDuration }),
      );
    },
    [opacity, rotation, translateY],
  );

  const reset = () => {
    translateY.value = 0;
    rotation.value = 0;
    opacity.value = 1;
  };

  return { animatedStyle, fall, reset };
};
