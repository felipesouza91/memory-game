import { create } from "zustand";
import { CardEntryAnimationType } from "../config/animation.config";

interface AnimationStore {
  entryAnimationType: CardEntryAnimationType;
  isAnimating: boolean;
  shouldAnimate: boolean;
  setEntryAnimationType: (type: CardEntryAnimationType) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setShouldAnimate: (value: boolean) => void;
}

export const useAnimationStore = create<AnimationStore>((set) => ({
  entryAnimationType: "throw",
  isAnimating: false,
  shouldAnimate: false,
  setEntryAnimationType: (type: CardEntryAnimationType) => {
    set({ entryAnimationType: type });
  },
  setIsAnimating: (isAnimating: boolean) => {
    set({ isAnimating });
  },
  setShouldAnimate: (value: boolean) => set({ shouldAnimate: value }),
}));
