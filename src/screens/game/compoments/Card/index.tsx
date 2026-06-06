import { StoreCard } from "@/shared/interfaces/game";
import React from "react";
import CardView from "./Card.view";
import { useCard } from "./useCard.viewModel";

export interface CardParam {
  card: StoreCard;
  index: number;
}

const Card: React.FC<CardParam> = (props) => {
  const viewModel = useCard(props);
  return <CardView {...viewModel} />;
};
export default Card;
