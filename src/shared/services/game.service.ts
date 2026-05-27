import {
  Challange,
  GameResult,
  GameState,
  StoreCard,
} from "../interfaces/game";
import { CardService } from "./card.service";

export class GameService {
  static initializeGame(challange: Challange): GameState {
    const cards = CardService.generateCards(challange);
    return {
      status: "countdown",
      challange: challange,
      selectedCards: [],
      cards,
      startedAt: null,
      timeElapsed: 0,
      timeRemaing: challange.timeLimit,
    };
  }

  static startGame(gameState: GameState): GameState {
    return {
      ...gameState,
      status: "playing",
      startedAt: new Date(),
    };
  }

  static selectCard(
    gameState: GameState,
    cardId: string,
  ): {
    newState: GameState;
    action: "flip" | "match" | "missmatch" | "invalid";
  } {
    const { cards, selectedCards, status } = gameState;
    if (status !== "playing") {
      return { newState: gameState, action: "invalid" };
    }
    const card = cards.find((item) => item.id === cardId);
    if (!card || card.isMatched || card.isFlippled) {
      return { newState: gameState, action: "invalid" };
    }

    if (selectedCards.length >= 2) {
      return { newState: gameState, action: "invalid" };
    }

    const updatedCards = cards.map((data) => {
      if (data.id === cardId) {
        return CardService.flipCard(data, true);
      }
      return data;
    });

    const newSelectedCards = [...selectedCards, card];

    if (newSelectedCards.length === 1) {
      return {
        newState: {
          ...gameState,
          cards: updatedCards,
          selectedCards: newSelectedCards,
        },
        action: "flip",
      };
    }

    const [firstCard, secondCard] = newSelectedCards;
    const isMatch = firstCard.name === secondCard.name;

    if (isMatch) {
      const finalCards = updatedCards.map((card) => {
        if (card.id === firstCard.id || card.id === secondCard.id) {
          return CardService.markAsMatched(card);
        }
        return card;
      });

      const isComplete = this.isGameComplete(finalCards);

      return {
        newState: {
          ...gameState,
          cards: finalCards,
          selectedCards: [],
          status: isComplete ? "finished" : "playing",
        },
        action: "match",
      };
    } else {
      return {
        newState: {
          ...gameState,
          cards: updatedCards,
          selectedCards: newSelectedCards,
        },
        action: "missmatch",
      };
    }
  }

  static resetMissmatchedCards(gameState: GameState): GameState {
    const { cards, selectedCards } = gameState;

    const updatedCardArray = cards.map((card) => {
      const isSelect = selectedCards.some((data) => data.id === card.id);
      if (isSelect && !card.isMatched) {
        return CardService.flipCard(card, false);
      }
      return card;
    });
    return {
      ...gameState,
      cards: updatedCardArray,
      selectedCards: [],
    };
  }

  static pauseGame(gameState: GameState): GameState {
    return {
      ...gameState,
      status: "paused",
    };
  }

  static resumeGame(gameState: GameState): GameState {
    return {
      ...gameState,
      status: "playing",
    };
  }

  static resetGame(challange: Challange): GameState {
    return this.initializeGame(challange);
  }

  static tick(gameState: GameState): GameState {
    if (gameState.status !== "playing") {
      return gameState;
    }
    const timeRemaing = Math.max(0, gameState.timeRemaing - 1);
    const timeElapsed = gameState.timeElapsed + 1;

    return {
      ...gameState,
      timeElapsed,
      timeRemaing,
      status: timeRemaing === 0 ? "timeout" : gameState.status,
    };
  }

  static finishGame(gameState: GameState): GameResult | null {
    if (!gameState.challange) {
      return null;
    }
    return {
      completed: gameState.status === "finished",
      timeElapsed: gameState.timeElapsed,
      challange: gameState.challange,
    };
  }

  static isGameComplete(cards: StoreCard[]): boolean {
    return cards.every((item) => item.isMatched);
  }

  static previewAllCards(cards: StoreCard[]): StoreCard[] {
    return cards.map((card) => CardService.flipCard(card, true));
  }

  static hideAllCards(cards: StoreCard[]): StoreCard[] {
    return cards.map((card) => CardService.flipCard(card, false));
  }
}
