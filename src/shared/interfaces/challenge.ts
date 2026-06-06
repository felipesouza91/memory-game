import { ImageSourcePropType } from "react-native";

export interface Card {
  name: string;
  image: ImageSourcePropType;
}

export interface ChallengeTheme {
  id: string;
  title: string;
  cards: Card[];
  gradient: [string, string];
  arrowColor: string;
}
