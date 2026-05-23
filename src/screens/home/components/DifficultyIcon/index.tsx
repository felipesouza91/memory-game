import { Difficulty } from "@/shared/interfaces/difficulty";
import React from "react";
import DifficultyIconView from "./DifficultyIcon.view";
import { useDifficultyIcon } from "./useDifficultyIcon.viewModel";

interface DifficultyIconProps {
  difficulty: Difficulty;
  color: string;
  isSelect: boolean;
  inactiveColor: string;
}

const DifficultyIcon: React.FC<DifficultyIconProps> = (props) => {
  const viewModel = useDifficultyIcon(props);

  return <DifficultyIconView {...viewModel} />;
};

export default DifficultyIcon;
