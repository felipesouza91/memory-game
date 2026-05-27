import { Card } from "./challenge";
import { Difficulty } from "./difficulty";

export type GameStatus =
  | "idle"
  | "countdown"
  | "playing"
  | "paused"
  | "finished"
  | "timeout";

export interface StoreCard extends Card {
  id: string;
  isFlippled: boolean;
  isMatched: boolean;
}

export interface Challange {
  id: string;
  title: string;
  difficult: Difficulty;
  estimedTime: string;
  timeLimit: number;
  cards: Card[];
  gradient?: [string, string];
}

export interface GameState {
  status: GameStatus;
  challange: Challange | null;
  selectedCards: StoreCard[];
  timeRemaing: number;
  timeElapsed: number;
  startedAt: Date | null;
  cards: StoreCard[];
}

export interface GameResult {
  completed: boolean;
  timeElapsed: number;
  challange: Challange;
}
