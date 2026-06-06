import { useModalAnimation } from "@/animations/hooks/useModalAnimation";
import { colors } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

interface DefeatModalParams {
  visible: boolean;
  onTryAgain: () => void;
  onGoHome: () => void;
}

const DefeatModal: React.FC<DefeatModalParams> = ({
  onGoHome,
  onTryAgain,
  visible,
}) => {
  const { animatedStyle, close } = useModalAnimation({ visible });

  const handleTryAgain = () => {
    close(onTryAgain);
  };

  return (
    <Modal transparent visible={visible}>
      <BlurView intensity={10} tint="dark" style={styles.overlay}>
        <Animated.View style={[animatedStyle, styles.modalContainer]}>
          <Pressable style={styles.closeButton} onPress={onGoHome}>
            <MaterialCommunityIcons
              name="close"
              color={colors.grayscale.gray100}
              size={16}
            />
          </Pressable>
          <MaterialCommunityIcons
            name="clock-outline"
            color={colors.semantic.error}
            size={29}
          />
          <AppText style={styles.title}>Ops seu tempo acabou</AppText>
          <AppText style={styles.message}>
            O tempo para finalizar o desafio terminou. Que tal tentar denovo ?
          </AppText>

          <Pressable style={styles.button} onPress={handleTryAgain}>
            <AppText style={styles.buttonText}>Jogar novamente</AppText>
          </Pressable>
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
  message: {
    fontSize: 16,
    color: colors.grayscale.gray200,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 16,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.grayscale.gray400,
  },
  buttonText: {
    fontSize: 16,
    color: colors.grayscale.white,
    fontFamily: "Baloo2_800ExtraBold",
  },
  closeButton: {
    position: "absolute",
    right: 22,
    top: 22,
  },
});

export default DefeatModal;
