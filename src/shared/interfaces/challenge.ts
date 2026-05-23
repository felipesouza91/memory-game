export interface Card {
  name: string;
  image?: ReturnType<typeof require>;
}

export interface ChallengeTheme {
  id: string;
  title: string;
  cards: Card[];
  gradient: [string, string];
  arrowColor: string;
}
