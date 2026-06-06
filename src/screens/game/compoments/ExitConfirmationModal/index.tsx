import { useModalAnimation } from "@/animations/hooks/useModalAnimation";
import { colors } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
interface ExitConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitConfirmationModal: React.FC<ExitConfirmationModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const { animatedStyle, close } = useModalAnimation({ visible });

  const handleConfirmation = () => {
    close(onConfirm);
  };

  const handleCancel = () => {
    close(onCancel);
  };

  return (
    <Modal transparent visible={visible}>
      <BlurView style={styles.overlay} intensity={10}>
        <Animated.View style={[animatedStyle, styles.modalContainer]}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={64}
            color={colors.semantic.warning}
          />
          <AppText style={styles.title}>Sair do jogo</AppText>
          <AppText style={styles.message}>
            Seu progresso atual sera perdido
          </AppText>

          <Pressable style={styles.button} onPress={handleConfirmation}>
            <AppText style={styles.buttonText}>Sair do jogo</AppText>
          </Pressable>
          <Pressable style={styles.button} onPress={handleCancel}>
            <AppText style={styles.buttonText}>Continuar jogando</AppText>
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
});

export default ExitConfirmationModal;
