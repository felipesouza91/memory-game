import { Easing, WithSpringConfig } from "react-native-reanimated";

export type CardEntryAnimationType = "throw" | "deck";

export const SPRING_CONFIG = {
  press: {
    duping: 15,
    stiffness: 150,
  } as WithSpringConfig,

  entryThrow: {
    duping: 22,
    stiffness: 180,
  } as WithSpringConfig,

  entryDeck: {
    duping: 22,
    stiffness: 140,
  } as WithSpringConfig,

  entryScale: {
    duping: 22,
    stiffness: 180,
  } as WithSpringConfig,

  selection: {
    damping: 15,
    stiffness: 300,
  } as WithSpringConfig,

  modal: {
    damping: 25,
    stiffness: 120,
    mass: 1,
  } as WithSpringConfig,
};

export const ENTRY_ANIMATION_START_POSSITION = {
  throw: {
    x: 300,
    y: 600,
  },
  deck: {
    x: 0,
    y: 400,
  },
};

export const ANIMATION_TIMES = {
  entry: {
    throw: {
      duration: 400,
      delayBetweenCard: 50,
    },
    deck: {
      duration: 350,
      delayBetweenCard: 40,
    },
  },
  fall: {
    duration: 600,
    rotation: 300,
    opacityDuration: 200,
    opacityDelay: 400,
    maxRandomDelay: 200,
  },
};

export const ANIMATION_EASINGS = {
  entry: Easing.out(Easing.cubic),
};
