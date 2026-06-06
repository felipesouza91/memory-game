import { useModalAnimation } from "@/animations/hooks/useModalAnimation";
import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors, gradients } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import ConfettiEffect from "@/shared/components/ConfettiEffect";
import { useGameStore } from "@/shared/stores/game.store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
interface VictoryModalParams {
  visible: boolean;
  onPlayAgain: () => void;
  onGoHistory: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const VictoryModal: React.FC<VictoryModalParams> = ({
  visible,
  onGoHistory,
  onPlayAgain,
}) => {
  const { timeElapsed } = useGameStore();
  const minuts = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  const timeString = `${String(minuts).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const { animatedStyle, close } = useModalAnimation({ visible });
  const {
    animatedStyle: buttonPressAnimationStyle,
    onPressIn,
    onPressOut,
  } = usePressAnimation();

  const {
    animatedStyle: historyButtonPressAnimationStyle,
    onPressIn: historyOnPressIn,
    onPressOut: historyOnPressOut,
  } = usePressAnimation();

  const handlePlayAgain = () => {
    close(onPlayAgain);
  };

  const handleGoHistory = () => {
    close(onGoHistory);
  };

  return (
    <Modal transparent visible={visible}>
      <BlurView intensity={10} style={styles.overlay}>
        <ConfettiEffect active={visible} />
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <MaterialCommunityIcons
            name="trophy-outline"
            color={colors.accent.lightPurple}
            size={64}
          />
          <AppText style={styles.title}>
            Você concluiu o desafio em {timeString}
          </AppText>
          <View style={styles.buttonGlow}>
            <Animated.View style={[buttonPressAnimationStyle]}>
              <LinearGradient
                colors={gradients.colorful}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Pressable
                  onPress={handlePlayAgain}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                >
                  <AppText style={styles.buttonText}>Jogar novamente</AppText>
                </Pressable>
              </LinearGradient>
            </Animated.View>
          </View>
          <AnimatedPressable
            style={[styles.secondaryButton, historyButtonPressAnimationStyle]}
            onPress={handleGoHistory}
            onPressIn={historyOnPressIn}
            onPressOut={historyOnPressOut}
          >
            <AppText style={styles.secondaryButtonText}>Ver Historico</AppText>
          </AnimatedPressable>
        </Animated.View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    borderRadius: 24,
    padding: 32,
    backgroundColor: colors.grayscale.gray450,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
  },
  title: {
    fontSize: 20,
    color: colors.grayscale.gray100,
    marginTop: 20,
    marginBottom: 12,
    textAlign: "center",
    fontFamily: "Baloo2_800ExtraBold",
  },

  buttonGradient: {
    borderRadius: 100,
    width: "100%",
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },

  buttonText: {
    fontSize: 16,
    color: colors.grayscale.white,
    fontFamily: "Baloo2_800ExtraBold",
  },

  secondaryButton: {
    padding: 12,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: "Baloo2_800ExtraBold",
    color: colors.accent.lightPurple,
  },
  buttonGlow: {
    width: "100%",
    shadowColor: colors.accent.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
});

export default VictoryModal;
