import { ConfettiConfig, createConfettiPiece } from "@/shared/utils/confetti";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ConfettiPiece } from "../ConfettiPiece";

interface ConfettiEffectViewParams {
  active: boolean;
  burstCount?: number;
  continuousCount?: number;
  continuousInterval?: number;
}

const ConfettiEffectView: React.FC<ConfettiEffectViewParams> = ({
  active,
  burstCount = 40,
  continuousCount = 2,
  continuousInterval = 500,
}) => {
  const [pieces, setPieces] = useState<ConfettiConfig[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cleanupRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idCounterRef = useRef<number>(0);

  const cleanup = useCallback(() => {
    const now = Date.now();

    const maxLifeTime = 6000;

    setPieces((prev) =>
      prev.filter((data) => now - data.createdAt < maxLifeTime),
    );
  }, []);

  useEffect(() => {
    if (active) {
      idCounterRef.current = 0;

      const burstPieces: ConfettiConfig[] = Array.from(
        { length: burstCount },
        () => {
          idCounterRef.current += 1;
          return createConfettiPiece(idCounterRef.current, true);
        },
      );

      setPieces(burstPieces);

      intervalRef.current = setInterval(() => {
        const newPieces: ConfettiConfig[] = Array.from(
          {
            length: continuousCount,
          },
          () => {
            idCounterRef.current += 1;
            return createConfettiPiece(idCounterRef.current, false);
          },
        );
        setPieces((prev) => [...newPieces, ...prev]);
      }, continuousInterval);
      cleanupRef.current = setInterval(cleanup, 2000);
    } else {
      setPieces([]);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (cleanupRef.current) {
        clearInterval(cleanupRef.current);
        cleanupRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (cleanupRef.current) {
        clearInterval(cleanupRef.current);
      }
    };
  }, [active, burstCount, cleanup, continuousCount, continuousInterval]);

  if (!active && pieces.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      {pieces.map((confetti) => (
        <ConfettiPiece
          color={confetti.color}
          delay={confetti.delay}
          duration={confetti.duration}
          rotationSpeed={confetti.rotationSpeed}
          shape={confetti.shape}
          size={confetti.size}
          startX={confetti.startX}
          swingAmount={confetti.swingAmount}
          swingDirection={confetti.swingDirection}
          key={confetti.id}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    overflow: "hidden",
    zIndex: 1000,
  },
});

export default ConfettiEffectView;
