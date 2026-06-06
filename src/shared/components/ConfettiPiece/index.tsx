import { ConfettiShapeType } from "@/shared/utils/confetti";
import React, { memo, useEffect } from "react";
import { Dimensions, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface ConfettiPieceParams {
  color: string;
  startX: number;
  delay: number;
  duration: number;
  size: number;
  shape: ConfettiShapeType;
  swingDirection: number;
  swingAmount: number;
  rotationSpeed: number;
}

const confettiShapeStyle: (data: {
  size: number;
  shape: ConfettiShapeType;
}) => StyleProp<ViewStyle | undefined> = ({ shape, size }) => {
  const shapes = {
    circle: { borderRadius: size / 2 },
    rectangle: { width: size * 0.4, height: size },
    square: {
      width: size,
      height: size,
    },
  };

  return shapes[shape];
};
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ConfettiPieceView: React.FC<ConfettiPieceParams> = ({
  color,
  delay,
  duration,
  rotationSpeed,
  shape,
  size,
  startX,
  swingAmount,
  swingDirection,
}) => {
  const progress = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration, easing: Easing.linear }),
    );

    rotateZ.value = withDelay(
      delay,
      withTiming(360 * rotationSpeed * swingDirection, {
        duration,
        easing: Easing.linear,
      }),
    );
  }, [delay, duration, progress, rotateZ, rotationSpeed, swingDirection]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      progress.value,
      [0, 1],
      [-50, SCREEN_HEIGHT + 100],
    );
    const swingPhase = progress.value * Math.PI * 6;
    const translateX = Math.sin(swingPhase) * swingAmount * swingDirection;
    return {
      transform: [
        { translateX },
        { translateY },
        { rotateZ: `${rotateZ.value}deg` },
      ],
      opacity: interpolate(progress.value, [0, 0.05, 0.9, 1], [0, 1, 1, 0]),
    };
  });

  return (
    <Animated.View
      style={[
        styles.piece,
        animatedStyle,
        confettiShapeStyle({ size, shape }),
        { left: startX, backgroundColor: color, width: size, height: size },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  piece: {
    position: "absolute",
    top: 0,
  },
});

export const ConfettiPiece = memo(ConfettiPieceView);
