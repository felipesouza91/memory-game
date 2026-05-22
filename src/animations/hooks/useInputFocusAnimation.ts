import { colors } from "@/constants/colors";
import { useCallback } from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";
import { SPRING_CONFIG } from "../config/animation.config";

interface UsePressAnimationConfig {
  springConfig?: WithSpringConfig;
}

export const useInputFocusAnimation = ({
  springConfig = SPRING_CONFIG.press,
}: UsePressAnimationConfig = {}) => {
  const focus = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focus.value,
      [0, 1],
      [colors.grayscale.gray400, colors.accent.cyan],
    );
    return {
      borderColor,
      transform: [{ scale: 1 + focus.value * 0.02 }],
    };
  });

  const onFocus = useCallback(() => {
    focus.value = withSpring(1, springConfig);
  }, [focus, springConfig]);
  const onBlur = useCallback(() => {
    focus.value = withSpring(0, springConfig);
  }, [focus, springConfig]);
  return { animatedStyle, onFocus, onBlur };
};
