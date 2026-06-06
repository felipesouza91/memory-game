import { useCardEntryAnimtaion } from "@/animations/hooks/useCardEntryAnimation";
import { useCardShakeAnimation } from "@/animations/hooks/useCardShakeAnimation";
import { useCardSuccessAnimation } from "@/animations/hooks/useCardSuccessAnimation";
import { useCardTimeoutAnimation } from "@/animations/hooks/useCardTimeoutAnimation";
import { StoreCard } from "@/shared/interfaces/game";
import { useGameStore } from "@/shared/stores/game.store";
import { useEffect, useRef } from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface UseCardParam {
  card: StoreCard;
  index: number;
}

export const useCard = ({ card, index }: UseCardParam) => {
  const rotation = useSharedValue(card.isFlippled ? 180 : 0);
  const { selectCard, status } = useGameStore();

  const {
    animatedStyle: cardSuccessAnimation,
    playSuccess,
    fedeOut,
    reset: cardSuccessReset,
  } = useCardSuccessAnimation();

  const {
    animatedStyle: timeoutAnimationStyle,
    fall,
    reset: cardTimeoutReset,
  } = useCardTimeoutAnimation();

  const { animatedStyle: entryAnimationStyle } = useCardEntryAnimtaion({
    cardIndex: index,
  });

  const { animatedStyle: shakeAnimationStyle, shake } = useCardShakeAnimation();

  const previusFlippedRef = useRef(card.isFlippled);

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` },
    ],
  }));
  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg` },
    ],
  }));

  useEffect(() => {
    rotation.value = withSpring(card.isFlippled ? 180 : 0, { duration: 300 });
  }, [card.isFlippled, rotation]);

  useEffect(() => {
    if (!card.isFlippled && previusFlippedRef.current) {
      shake();
    }
    previusFlippedRef.current = card.isFlippled;
  }, [card.isFlippled, shake]);

  useEffect(() => {
    if (card.isMatched) {
      playSuccess();

      setTimeout(() => {
        fedeOut();
      }, 600);
    }
  }, [card.isMatched, fedeOut, playSuccess]);

  useEffect(() => {
    if (status === "timeout" && !card.isMatched) {
      const randonDelay = Math.random() * 200;
      fall(randonDelay);
    }
    if (status === "countdown") {
      cardTimeoutReset();
      cardSuccessReset();
    }
  }, [card.isMatched, cardSuccessReset, cardTimeoutReset, fall, status]);

  return {
    card,
    frontAnimatedStyle,
    backAnimatedStyle,
    selectCard,
    entryAnimationStyle,
    shakeAnimationStyle,
    cardSuccessAnimation,
    timeoutAnimationStyle,
  };
};
