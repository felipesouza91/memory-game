import {
  ANIMATION_TIMES,
  CardEntryAnimationType,
} from "../config/animation.config";

interface GetEntryAnimationDurationParam {
  cardCount: number;
  animationType: CardEntryAnimationType;
}

export const getEntryAnimationDuration = ({
  animationType,
  cardCount,
}: GetEntryAnimationDurationParam) => {
  const config = ANIMATION_TIMES.entry[animationType];
  const lastCardDelay = (cardCount - 1) * config.delayBetweenCard;
  const springSettaleTime = animationType === "throw" ? 800 : config.duration;
  return lastCardDelay + springSettaleTime + 400;
};

export const getFallAnimationDuration = (): number => {
  const config = ANIMATION_TIMES.fall;
  return (
    config.maxRandomDelay +
    config.duration +
    config.opacityDuration +
    config.opacityDelay +
    200
  );
};
