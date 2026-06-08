import { colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import StatCard from "../StatCard";

interface ListHeaderParams {
  totalGame: string;
  evaregeTime: string;
}

const ListHeader: React.FC<ListHeaderParams> = ({ evaregeTime, totalGame }) => {
  return (
    <View style={styles.container}>
      <StatCard
        icon={
          <MaterialCommunityIcons
            name="gamepad-variant"
            size={28}
            color={colors.accent.lightPurple}
          />
        }
        label="Total de jogos"
        value={totalGame}
      />
      <StatCard
        icon={
          <MaterialCommunityIcons
            name="clock-outline"
            size={28}
            color={colors.accent.cyan}
          />
        }
        label="Media"
        value={evaregeTime}
        variant="cyan"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
  },
});

export default ListHeader;
