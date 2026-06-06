import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  ANIMATION_EASINGS,
  ANIMATION_TIMES,
  ENTRY_ANIMATION_START_POSSITION,
  SPRING_CONFIG,
} from "../config/animation.config";
import { useAnimationStore } from "../store/animationStore";

interface UseCardEntryAnimtaionParams {
  cardIndex: number;
}

export const useCardEntryAnimtaion = ({
  cardIndex,
}: UseCardEntryAnimtaionParams) => {
  const { shouldAnimate, entryAnimationType } = useAnimationStore();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1.2);
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotateZ: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (!shouldAnimate) {
      translateX.value = 0;
      translateY.value = 0;
      opacity.value = 0;
      scale.value = 1.2;
      rotation.value = 0;
      return;
    }
    if (shouldAnimate) {
      const config = ANIMATION_TIMES.entry[entryAnimationType];
      const delay = cardIndex * config.delayBetweenCard;

      if (entryAnimationType === "throw") {
        translateX.value = ENTRY_ANIMATION_START_POSSITION.throw.x;
        translateY.value = ENTRY_ANIMATION_START_POSSITION.throw.y;
        rotation.value = -30;
        translateX.value = withDelay(
          delay,
          withSpring(0, SPRING_CONFIG.entryThrow),
        );
        translateY.value = withDelay(
          delay,
          withSpring(0, SPRING_CONFIG.entryDeck),
        );

        rotation.value = withDelay(
          delay,
          withSpring(0, SPRING_CONFIG.entryDeck),
        );
      }
      if (entryAnimationType === "deck") {
        translateX.value = ENTRY_ANIMATION_START_POSSITION.deck.x;
        translateY.value = ENTRY_ANIMATION_START_POSSITION.deck.y;

        translateX.value = withDelay(
          delay,
          withTiming(0, {
            duration: config.duration,
            easing: ANIMATION_EASINGS.entry,
          }),
        );
        translateY.value = withDelay(
          delay,
          withTiming(0, {
            duration: config.duration,
            easing: ANIMATION_EASINGS.entry,
          }),
        );
      }
      opacity.value = withTiming(1, { duration: 150 });
      scale.value = withDelay(delay, withSpring(1, SPRING_CONFIG.entryScale));
    }
  }, [
    cardIndex,
    entryAnimationType,
    opacity,
    rotation,
    scale,
    shouldAnimate,
    translateX,
    translateY,
  ]);

  return { animatedStyle };
};
