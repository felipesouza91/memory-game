import { Card } from "../interfaces/challenge";
import { Challange, StoreCard } from "../interfaces/game";

export class CardService {
  static createCardPair(
    cardItem: Card,
    startIndex: number,
  ): [StoreCard, StoreCard] {
    return [
      {
        id: `${cardItem.name}-1-${startIndex}`,
        ...cardItem,
        isFlippled: false,
        isMatched: false,
      },
      {
        id: `${cardItem.name}-2-${startIndex + 2}`,
        ...cardItem,
        isFlippled: false,
        isMatched: false,
      },
    ];
  }

  static generateCards(challange: Challange): StoreCard[] {
    const cards: StoreCard[] = [];

    challange.cards.forEach((data, index) => {
      const [card1, card2] = this.createCardPair(data, index);
      cards.push(card1, card2);
    });
    return this.shuffle(cards);
  }

  static shuffle(cards: StoreCard[]): StoreCard[] {
    const shuffled = [...cards];
    for (let index = shuffled.length - 1; index > 0; index--) {
      const secondItem = Math.floor(Math.random() * (index + 1));

      [shuffled[index], shuffled[secondItem]] = [
        shuffled[secondItem],
        shuffled[index],
      ];
    }
    return shuffled;
  }

  static flipCard(card: StoreCard, flipped: boolean): StoreCard {
    return { ...card, isFlippled: flipped };
  }

  static markAsMatched(card: StoreCard): StoreCard {
    return { ...card, isFlippled: true, isMatched: true };
  }
}
