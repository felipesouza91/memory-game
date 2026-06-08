import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import { useAuthStore } from "@/shared/stores/auth.store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const HomeHeader: React.FC = () => {
  const pressAnimatedStyle = usePressAnimation({
    scaleActive: 0.8,
  });
  const { user } = useAuthStore();
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <View>
            <AppText style={styles.greeting}>Boas vindas, {user?.name}</AppText>
            <AppText style={styles.subtitle}>
              Comece a jogar selecionando os desafios abaixo
            </AppText>
          </View>
        </View>
        <View style={{ width: 40 }}>
          <AnimatedPressable
            style={[styles.trophyContainer, pressAnimatedStyle.animatedStyle]}
            onPressIn={pressAnimatedStyle.onPressIn}
            onPressOut={pressAnimatedStyle.onPressOut}
            onPress={() => router.push("/(private)/history")}
          >
            <MaterialCommunityIcons
              name="trophy-outline"
              size={18}
              color={colors.accent.purple}
            />
          </AnimatedPressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
    maxWidth: "60%",
  },
  greeting: {
    fontSize: 20,
    fontFamily: "Baloo2_400Bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
    lineHeight: 20,
  },
  trophyContainer: {
    width: 40,
    height: 40,
    borderColor: colors.grayscale.gray400,
    borderWidth: 1,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grayscale.gray450,
  },
});

export default HomeHeader;
