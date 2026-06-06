import { useCardSelectAnimation } from "@/animations/hooks/useCardSelectionAnimation";
import { colors, gradients } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useCard } from "./useCard.viewModel";

const CardView: React.FC<ReturnType<typeof useCard>> = ({
  card,
  entryAnimationStyle,
  backAnimatedStyle,
  frontAnimatedStyle,
  shakeAnimationStyle,
  cardSuccessAnimation,
  timeoutAnimationStyle,
  selectCard,
}) => {
  const selectedAnimation = useCardSelectAnimation();
  return (
    <Animated.View
      style={[
        styles.containerWrapper,
        entryAnimationStyle,
        selectedAnimation.animatedStyles,
        shakeAnimationStyle,
        cardSuccessAnimation,
        timeoutAnimationStyle,
      ]}
    >
      <Pressable
        style={styles.container}
        onPress={() => selectCard(card.id)}
        onPressIn={selectedAnimation.onPressIn}
        onPressOut={selectedAnimation.onPressOut}
      >
        <Animated.View style={[styles.innerContainer]}>
          <Animated.View style={[styles.cardFace, frontAnimatedStyle]}>
            <LinearGradient
              colors={gradients.card}
              style={styles.cardGradiante}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Image
                style={styles.logoImage}
                source={require("@/assets/Logo-Transparent.png")}
              />
            </LinearGradient>
          </Animated.View>
          <Animated.View style={[styles.cardFace, backAnimatedStyle]}>
            <LinearGradient
              colors={gradients.card}
              style={styles.cardGradiante}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {card.image && (
                <Image source={card.image} style={styles.cardImage} />
              )}
              <AppText style={styles.cardText}>{card.name}</AppText>
            </LinearGradient>
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    width: "32%",
    height: 130,
    marginBottom: 8,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderColor: colors.grayscale.gray400,
    borderWidth: 1,
    borderRadius: 16,
  },
  cardGradiante: {
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  logoImage: {
    width: "50%",
    height: "50%",
  },
  cardImage: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  cardText: {
    color: colors.grayscale.gray100,
    fontSize: 16,
  },
});

export default CardView;
