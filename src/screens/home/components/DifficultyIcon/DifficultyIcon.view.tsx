import React from "react";
import { StyleSheet, View } from "react-native";
import { useDifficultyIcon } from "./useDifficultyIcon.viewModel";

const DifficultyIconView: React.FC<ReturnType<typeof useDifficultyIcon>> = ({
  getBarStyle,
}) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((index) => (
        <View key={index} style={[styles.bar, getBarStyle(index)]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    height: 16,
  },
  bar: {
    width: 3,
    borderRadius: 2,
  },
});

export default DifficultyIconView;
