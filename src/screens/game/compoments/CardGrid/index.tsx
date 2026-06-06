import { useGameStore } from "@/shared/stores/game.store";
import React from "react";
import { StyleSheet, View } from "react-native";
import Card from "../Card";

const CardGrid: React.FC = () => {
  const { cards } = useGameStore();
  return (
    <View style={styles.grid}>
      {cards.map((card, index) => (
        <Card card={card} key={card.id} index={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default CardGrid;
