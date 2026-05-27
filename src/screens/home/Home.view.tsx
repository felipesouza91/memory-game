import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChallangesList from "./components/ChallangesList";
import DifficultySelectionView from "./components/DifficultySelection/DifficultySelection.view";
import HomeHeader from "./components/HomeHeader";
import { useHome } from "./useHome.viewModel";

const HomeView: React.FC<ReturnType<typeof useHome>> = () => {
  const { selectedDifficulty, setSelectedDifficulty, handleSelectedChalange } =
    useHome();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HomeHeader />
        <DifficultySelectionView
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
        />
        <ChallangesList handleSelectedChalange={handleSelectedChalange} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale.gray700,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});

export default HomeView;
