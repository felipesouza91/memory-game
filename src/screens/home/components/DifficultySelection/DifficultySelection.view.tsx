import { colors } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import { getDifficultyColors } from "@/shared/utils/difficulty";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import DifficultyTab from "../DifficultyTab/indext";
import { useDifficultySelection } from "./useDifficultySelection.viewModel";

const DifficultySelectionView: React.FC = () => {
  const {
    difficulties,
    selectedDifficulty,
    setSelectedDifficulty,
    animatedIndicatorStyle,
  } = useDifficultySelection();
  return (
    <View style={styles.difficultySection}>
      <View style={styles.difficultyHeader}>
        <AppText style={styles.difficultyLabel}>Dificuldade</AppText>
        <View style={styles.timeIndicator}>
          <MaterialCommunityIcons
            name="clock-outline"
            color={colors.feedback.info}
            size={16}
          />
          <AppText>5 min</AppText>
        </View>
      </View>
      <View style={styles.difficultyTabs}>
        <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
        {difficulties.map((difficulty) => (
          <DifficultyTab
            key={difficulty}
            difficulty={difficulty}
            isSelect={selectedDifficulty === difficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            getDifficultyColors={getDifficultyColors}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  difficultySection: {
    marginBottom: 24,
  },
  difficultyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  timeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayscale.gray500,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    gap: 6,
  },
  difficultyTabs: {
    flexDirection: "row",
    borderRadius: 100,
    padding: 4,
    position: "relative",
    borderColor: colors.grayscale.gray400,
    borderWidth: 1,
  },
  difficultyLabel: {
    fontSize: 16,
    fontWeight: 400,
    color: colors.grayscale.gray200,
  },
  indicator: {
    position: "absolute",
    width: "33.33%",
    top: 4,
    zIndex: 0,
    borderRadius: 100,
    left: 0,
    bottom: 4,
    backgroundColor: colors.grayscale.gray500,
    borderColor: colors.grayscale.gray400,
    borderWidth: 1,
    marginLeft: 4,
  },
});

export default DifficultySelectionView;
