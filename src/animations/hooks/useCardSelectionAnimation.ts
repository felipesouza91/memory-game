import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SPRING_CONFIG } from "../config/animation.config";

export const useCardSelectAnimation = () => {
  const scale = useSharedValue(1);

  const onPressIn = () => {
    scale.value = withSpring(1.05, SPRING_CONFIG.selection);
  };

  const onPressOut = () => {
    scale.value = withSpring(1, SPRING_CONFIG.selection);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { animatedStyles, onPressIn, onPressOut };
};
