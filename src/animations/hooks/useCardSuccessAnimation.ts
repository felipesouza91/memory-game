import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export const useCardSuccessAnimation = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const playSuccess = () => {
    scale.value = withSequence(
      withTiming(1.1, { duration: 300 }),
      withTiming(1, { duration: 500 }),
    );
  };

  const fedeOut = () => {
    opacity.value = withTiming(0, { duration: 300 });
    scale.value = withTiming(0.8, { duration: 300 });
  };

  const reset = () => {
    scale.value = 1;
    opacity.value = 1;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return { animatedStyle, playSuccess, fedeOut, reset };
};
