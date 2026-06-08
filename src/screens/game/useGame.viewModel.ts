import { CardEntryAnimationType } from "@/animations/config/animation.config";
import { useAnimationStore } from "@/animations/store/animationStore";
import {
  getEntryAnimationDuration,
  getFallAnimationDuration,
} from "@/animations/utils/animation.utils";
import { Difficulty } from "@/shared/interfaces/difficulty";
import { useGameStore } from "@/shared/stores/game.store";
import { useRankingStore } from "@/shared/stores/ranking.store";
import { challengeTheme, difficultyConfigs } from "@/shared/utils/challange";
import { createSequence } from "@/shared/utils/sequence";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export const useGame = () => {
  const { difficulty, themeId } = useLocalSearchParams<{
    themeId: string;
    difficulty: Difficulty;
  }>();

  const [showExitModal, setShowExitModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  const [isTimeoutModalVisible, setIsTimeoutModalVisible] = useState(false);

  const {
    initGame,
    status,
    previewAllCards,
    hideAllCards,
    startGame,
    cards,
    resetGame,
    clearGame,
    pauseGame,
    resumeGame,
    timeElapsed,
    challange,
  } = useGameStore();

  const { entryAnimationType, setShouldAnimate, setEntryAnimationType } =
    useAnimationStore();

  const { addScore } = useRankingStore();

  const [visibleCountdown, setVisibleCountdown] = useState<boolean>(
    status === "countdown",
  );

  const selectedChallange = challengeTheme.find(
    (challange) => challange.id === themeId,
  );

  const handleCountdownComplete = useCallback(() => {
    setVisibleCountdown(false);
    setShouldAnimate(true);
    const totalAnimationTime = getEntryAnimationDuration({
      cardCount: cards.length,
      animationType: entryAnimationType,
    });
    createSequence()
      .wait(totalAnimationTime)
      .then(previewAllCards)
      .wait(2000)
      .then(hideAllCards)
      .wait(300)
      .then(startGame)
      .run();
  }, [
    cards.length,
    entryAnimationType,
    hideAllCards,
    previewAllCards,
    setShouldAnimate,
    startGame,
  ]);

  const handleTryAgain = useCallback(() => {
    setIsTimeoutModalVisible(false);
    setShouldAnimate(false);
    setShowVictoryModal(false);
    resetGame();

    createSequence()
      .wait(300)
      .then(() => setVisibleCountdown(true))
      .run();
  }, [resetGame, setShouldAnimate]);

  useEffect(() => {
    if (status === "finished") {
      setShowVictoryModal(true);
      if (challange) {
        addScore({
          category: challange.title,
          difficulty: challange.difficult,
          time: timeElapsed,
        });
      }
    }
    if (status === "timeout") {
      createSequence()
        .wait(getFallAnimationDuration())
        .then(() => setIsTimeoutModalVisible(true))
        .run();
    }
  }, [addScore, challange, status, timeElapsed]);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    clearGame();
    router.replace("/(private)/home");
  };

  useEffect(() => {
    const theme = challengeTheme.find(({ id }) => id === themeId);
    if (theme && difficulty) {
      setShouldAnimate(false);
      const animationType: CardEntryAnimationType[] = ["deck", "throw"];

      const randomEntryType =
        animationType[Math.floor(Math.random() * animationType.length)];

      setEntryAnimationType(randomEntryType);

      initGame({
        id: `${themeId}-${difficulty}`,
        cards: selectedChallange?.cards || [],
        difficult: difficulty,
        estimedTime: difficultyConfigs[difficulty].estimedTime,
        timeLimit: difficultyConfigs[difficulty].timeLimit,
        title: selectedChallange?.title || "",
      });
      createSequence()
        .wait(500)
        .then(() => setVisibleCountdown(true))
        .run();
    }
  }, [
    difficulty,
    setEntryAnimationType,
    initGame,
    setShouldAnimate,
    selectedChallange?.cards,
    selectedChallange?.title,
    themeId,
  ]);

  const handleOpenExitModal = useCallback(() => {
    if (status === "playing") {
      pauseGame();
      setShowExitModal(true);
    }
  }, [pauseGame, status]);

  const handleConfirmationExit = useCallback(() => {
    clearGame();

    setShowExitModal(false);
    router.replace("/(private)/home");
  }, []);

  const handleCancelExit = useCallback(() => {
    resumeGame();
    setShowExitModal(false);
  }, [resumeGame]);

  const handleGoHistory = useCallback(() => {
    clearGame();

    setShowVictoryModal(false);
    router.push("/(private)/history");
  }, []);

  return {
    showExitModal,
    challange: selectedChallange,
    visibleCountdown,
    showVictoryModal,
    isTimeoutModalVisible,
    handleCountdownComplete,
    handleGoBack,
    handleTryAgain,
    handleGoHome,
    handleOpenExitModal,
    handleConfirmationExit,
    handleCancelExit,
    handleGoHistory,
  };
};
