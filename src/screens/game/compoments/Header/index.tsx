import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { useHeader } from "./useHeader.viewModel";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface HeaderParams {
  handleGoBack: () => void;
}

const Header: React.FC<HeaderParams> = ({ handleGoBack }) => {
  const {
    timeString,
    isCriticalTime,
    animatedStyle: animatedTimer,
  } = useHeader();
  const pressAnimation = usePressAnimation({ scaleActive: 0.8, width: 48 });
  return (
    <View style={[styles.content]}>
      <AnimatedPressable
        onPress={handleGoBack}
        style={[pressAnimation.animatedStyle]}
        onPressIn={pressAnimation.onPressIn}
        onPressOut={pressAnimation.onPressOut}
      >
        <View style={[styles.arrowButton]}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.grayscale.gray100}
          />
        </View>
      </AnimatedPressable>
      <Animated.View style={[styles.timeIndicator, animatedTimer]}>
        <MaterialCommunityIcons
          name="clock-outline"
          color={isCriticalTime ? colors.feedback.danger : colors.feedback.info}
          size={16}
        />
        <AppText
          style={[styles.timerText, isCriticalTime && styles.timerTextCritical]}
        >
          {timeString}
        </AppText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grayscale.gray500,
  },
  timeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayscale.gray600,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.grayscale.gray500,
  },
  timerText: {
    fontSize: 16,
    fontFamily: "Baloo2_700Bold",
    color: colors.feedback.info,
  },

  timerTextCritical: {
    color: colors.feedback.danger,
  },
});

export default Header;
