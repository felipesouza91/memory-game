import { useInputFocusAnimation } from "@/animations/hooks/useInputFocusAnimation";
import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors, gradients } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./useAuth.viewModel";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const AuthView: React.FC<ReturnType<typeof useAuth>> = ({
  setUserName,
  userName,
  handleLogin,
}) => {
  const handleSubmitPressAnimtaion = usePressAnimation({ scaleActive: 0.7 });
  const textInputAnimation = useInputFocusAnimation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/Logo.png")}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>
            <View style={styles.titleContainer}>
              <AppText style={styles.title}>memory game</AppText>
              <AppText style={styles.subtitle}>
                Teste sua memoria enquanto aprende!
              </AppText>
            </View>
            <View style={styles.formContainer}>
              <AnimatedTextInput
                style={[styles.input, textInputAnimation.animatedStyle]}
                placeholder="Digite seu nome"
                autoCapitalize="words"
                placeholderTextColor={colors.grayscale.gray300}
                returnKeyType="done"
                value={userName}
                onChangeText={setUserName}
                onFocus={textInputAnimation.onFocus}
                onBlur={textInputAnimation.onBlur}
                textAlign="center"
              />
              <View style={styles.buttonGlow}>
                <Animated.View style={handleSubmitPressAnimtaion.animatedStyle}>
                  <LinearGradient
                    colors={gradients.colorful}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 2 }}
                    style={styles.buttonGradient}
                  >
                    <TouchableOpacity
                      style={styles.button}
                      onPressIn={handleSubmitPressAnimtaion.onPressIn}
                      onPressOut={handleSubmitPressAnimtaion.onPressOut}
                      onPress={handleLogin}
                    >
                      <AppText style={styles.buttonText}>Entrar</AppText>
                    </TouchableOpacity>
                  </LinearGradient>
                </Animated.View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale.gray700,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logo: {
    width: 71,
    height: 71,
  },
  logoContainer: {
    marginBottom: 32,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    color: colors.grayscale.gray100,
    marginBottom: 8,
    fontFamily: "Baloo2_800ExtraBold",
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
    fontFamily: "Baloo2_400Regular",
  },
  formContainer: {
    width: "100%",
    gap: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.grayscale.white,
  },
  buttonGradient: {
    borderRadius: 50,
  },
  button: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGlow: {
    shadowColor: colors.accent.purple,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },
  input: {
    width: "100%",
    backgroundColor: colors.grayscale.gray500,
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.grayscale.white,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
  },
});

export default AuthView;
