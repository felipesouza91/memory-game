import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import { ChallengeTheme } from "@/shared/interfaces/challenge";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
interface ChallangeCardParams {
  data: ChallengeTheme;
}

const ChallangeCard: React.FC<ChallangeCardParams> = ({ data }) => {
  const pressAnimation = usePressAnimation();
  return (
    <LinearGradient
      colors={data.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.challangeCard}
    >
      <Animated.View style={pressAnimation.animatedStyle}>
        <Pressable
          onPressIn={pressAnimation.onPressIn}
          onPressOut={pressAnimation.onPressOut}
          style={styles.challangeContent}
        >
          <AppText style={styles.challangeTitle}>{data.title}</AppText>
          <View
            style={[styles.arrowButton, { backgroundColor: data.arrowColor }]}
          >
            <MaterialCommunityIcons name="arrow-right" size={24} />
          </View>
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  challangeCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  challangeContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  challangeTitle: {
    fontSize: 18,
    color: colors.grayscale.gray100,
    fontFamily: "Baloo2_800ExtraBold",
    maxWidth: "50%",
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
  },
});

export default ChallangeCard;
