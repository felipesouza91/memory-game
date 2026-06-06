import { colors } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardGrid from "./compoments/CardGrid";
import CountdownOverlay from "./compoments/CountdownOverlay";
import DefeatModal from "./compoments/DefeatModal";
import ExitConfirmationModal from "./compoments/ExitConfirmationModal";
import Header from "./compoments/Header";
import VictoryModal from "./compoments/VictoryModal";
import { useGame } from "./useGame.viewModel";

const GameView: React.FC<ReturnType<typeof useGame>> = ({
  challange,
  showVictoryModal,
  visibleCountdown,
  isTimeoutModalVisible,
  showExitModal,
  handleCountdownComplete,
  handleGoHistory,
  handleGoHome,
  handleTryAgain,
  handleCancelExit,
  handleConfirmationExit,
  handleOpenExitModal,
}) => {
  if (!challange) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.grayscale.gray100} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header handleGoBack={handleOpenExitModal} />
      <View style={styles.gameInfo}>
        <AppText style={styles.title}>{challange.title}</AppText>
        <AppText style={styles.subtitle}>
          Encontre todos os pares dentro do tempo
        </AppText>
      </View>
      <CardGrid />
      <CountdownOverlay
        visible={visibleCountdown}
        handleCountdownComplete={handleCountdownComplete}
      />

      <DefeatModal
        visible={isTimeoutModalVisible}
        onGoHome={handleGoHome}
        onTryAgain={handleTryAgain}
      />

      <ExitConfirmationModal
        visible={showExitModal}
        onCancel={handleCancelExit}
        onConfirm={handleConfirmationExit}
      />

      <VictoryModal
        visible={showVictoryModal}
        onGoHistory={handleGoHistory}
        onPlayAgain={handleTryAgain}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale.gray700,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gameInfo: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    color: colors.grayscale.gray100,
    fontFamily: "Baloo2_700Bold",
  },
  subtitle: {
    fontSize: 14,
    color: colors.grayscale.gray200,
  },
});

export default GameView;
