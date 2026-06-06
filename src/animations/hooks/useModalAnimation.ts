import { useCallback, useEffect, useRef } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import { SPRING_CONFIG } from "../config/animation.config";

interface UseModalAnimationParams {
  visible: boolean;
}

export const useModalAnimation = ({ visible }: UseModalAnimationParams) => {
  const pendingCallbackRef = useRef<() => void | null>(null);
  const transtaleY = useSharedValue(100);
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: transtaleY.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (visible) {
      transtaleY.value = withSpring(0, SPRING_CONFIG.modal);
      opacity.value = withSpring(1, SPRING_CONFIG.modal);
    } else {
      transtaleY.value = -1000;
      opacity.value = 0;
    }
  }, [opacity, transtaleY, visible]);

  const executeCallback = useCallback(() => {
    if (pendingCallbackRef.current) {
      pendingCallbackRef.current();
      pendingCallbackRef.current = null;
    }
  }, []);

  const close = useCallback(
    (callback: () => void) => {
      pendingCallbackRef.current = callback;
      const exitDuration = 300;
      transtaleY.value = withSpring(1000, { duration: exitDuration });
      opacity.value = withTiming(0, { duration: exitDuration }, (finished) => {
        if (finished) {
          runOnJS(executeCallback)();
        }
      });
    },
    [executeCallback, opacity, transtaleY],
  );

  return { animatedStyle, close };
};
