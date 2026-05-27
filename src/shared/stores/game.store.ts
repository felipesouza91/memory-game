import { create } from "zustand";
import {
  Challange,
  GameResult,
  GameState,
  GameStatus,
} from "../interfaces/game";
import { GameService } from "../services/game.service";

interface GameStore extends GameState {
  _timeId: number | null;

  initGame: (challange: Challange) => void;
  startGame: () => void;
  selectCard: (id: string) => void;
  resetMissMatchedCards: () => void;
  finishGame: () => GameResult | null;
  tick: () => void;
  startTimer: () => void;
  stopTimer: () => void;

  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  clearGame: () => void;

  previewAllCards: () => void;
  hideAllCards: () => void;
}

const INITIAL_DATA = {
  status: "idle" as GameStatus,
  challange: null,
  cards: [],
  selectedCards: [],
  timeElapsed: 0,
  startedAt: null,
  timeRemaing: 0,
  _timeId: null,
};

export const useGameStore = create<GameStore>()((set, get) => ({
  ...INITIAL_DATA,

  initGame: (challange: Challange) => {
    const gameState = GameService.initializeGame(challange);
    set(gameState);
  },
  finishGame: () => {
    const currentState = get();
    const result = GameService.finishGame(currentState);
    return result;
  },
  resetMissMatchedCards: () => {
    const currentState = get();
    const newState = GameService.resetMissmatchedCards(currentState);
    set(newState);
  },
  selectCard: (cardId: string) => {},
  startGame: () => {
    const currentState = get();
    const newState = GameService.startGame(currentState);
    set(newState);
  },

  tick: () => {
    const currentState = get();
    const newState = GameService.tick(currentState);

    set(newState);

    if (newState.status === "timeout") {
      get().stopTimer();
    }
  },
  startTimer: () => {
    const currentState = get();
    if (currentState._timeId) {
      clearInterval(currentState._timeId);
    }

    const timerId = setInterval(() => {
      get().tick();
    }, 1000);

    set({ _timeId: timerId });
  },
  stopTimer: () => {
    const currentState = get();
    if (currentState._timeId) {
      clearInterval(currentState._timeId);
      set({ _timeId: null });
    }
  },

  pauseGame: () => {
    const currentState = get();
    const newState = GameService.pauseGame(currentState);
    set(newState);
    get().stopTimer();
  },
  resumeGame: () => {
    const currentState = get();
    const newState = GameService.resumeGame(currentState);
    set(newState);
    get().startTimer();
  },
  resetGame: () => {
    const currentState = get();
    if (!currentState.challange) {
      return;
    }
    const newState = GameService.resetGame(currentState.challange);
    set(newState);
    get().stopTimer();
  },
  clearGame: () => {
    get().stopTimer();
    set(INITIAL_DATA);
  },

  previewAllCards: () => {
    const currentState = get();
    const flippedCards = GameService.previewAllCards(currentState.cards);
    set({ cards: flippedCards });
  },
  hideAllCards: () => {
    const currentState = get();
    const flippedCards = GameService.hideAllCards(currentState.cards);
    set({ cards: flippedCards });
  },
}));
