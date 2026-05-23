import { colors } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import { Difficulty } from "@/shared/interfaces/difficulty";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import DifficultyIcon from "../DifficultyIcon";

interface DifficultyTabParams {
  setSelectedDifficulty: (difficulty: Difficulty) => void;
  isSelect: boolean;
  difficulty: Difficulty;
  getDifficultyColors: (difficulty: Difficulty) => string;
}

const DifficultyTab: React.FC<DifficultyTabParams> = ({
  difficulty,
  isSelect,
  getDifficultyColors,
  setSelectedDifficulty,
}) => {
  return (
    <Pressable
      style={styles.difficultyTab}
      onPress={() => setSelectedDifficulty(difficulty)}
    >
      <DifficultyIcon
        difficulty={difficulty}
        isSelect={isSelect}
        color={getDifficultyColors(difficulty)}
        inactiveColor={colors.grayscale.gray200}
      />
      <AppText
        style={{
          ...styles.difficultyLabel,
          fontFamily: isSelect ? "Baloo2_800ExtraBold" : "Baloo2_400Regular",
          color: isSelect ? colors.grayscale.white : colors.grayscale.gray100,
        }}
      >
        {difficulty}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  difficultyTab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    paddingVertical: 12,
    borderRadius: 100,
    gap: 12,
    zIndex: 1,
  },
  difficultyLabel: {
    fontSize: 16,
    fontWeight: 400,
    color: colors.grayscale.gray200,
  },
});

export default DifficultyTab;
