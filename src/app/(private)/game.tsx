import GameView from "@/screens/game/Game.view";
import { useGame } from "@/screens/game/useGame.viewModel";
import React from "react";

const Game: React.FC = () => {
  const viewModel = useGame();
  return <GameView {...viewModel} />;
};

export default Game;
