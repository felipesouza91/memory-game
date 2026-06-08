import { colors } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import React from "react";
import { StyleSheet, View } from "react-native";

interface StatCardParam {
  icon: React.ReactNode;
  value: string | null;
  label: string;
  variant?: "purple" | "cyan";
}

const StatCard: React.FC<StatCardParam> = ({
  icon,
  label,
  value,
  variant = "purple",
}) => {
  const valueColor =
    variant === "purple" ? colors.accent.lightPurple : colors.accent.cyan;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AppText style={[styles.valeu, { color: valueColor }]}>{value}</AppText>
        <View style={styles.iconContainer}>{icon}</View>
      </View>
      <AppText style={styles.label}>{label}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
    height: 94,
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 16,
  },
  valeu: {
    fontSize: 28,
    fontFamily: "Baloo2_800ExtraBold",
  },
  label: {
    fontSize: 14,
    color: colors.grayscale.gray200,
  },
});

export default StatCard;
