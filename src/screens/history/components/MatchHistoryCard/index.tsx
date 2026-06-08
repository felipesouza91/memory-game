import { colors } from "@/constants/colors";
import DifficultyIcon from "@/screens/home/components/DifficultyIcon";
import AppText from "@/shared/components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FormattedMatch } from "../../useHistory.viewModel";

interface MatchHistoryCardParam {
  math: FormattedMatch;
}

const possitionColor = [
  colors.ranking.gold,
  colors.ranking.silver,
  colors.ranking.bronze,
];

const MatchHistoryCard: React.FC<MatchHistoryCardParam> = ({ math }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.title}>{math.category}</AppText>
        <AppText
          style={[
            styles.position,
            {
              color:
                possitionColor[math.possition - 1] ?? colors.grayscale.gray300,
            },
          ]}
        >
          {math.possition}
        </AppText>
      </View>
      <View style={styles.footer}>
        <View style={styles.infoBadge}>
          <MaterialCommunityIcons
            name="calendar-outline"
            size={16}
            color={colors.grayscale.gray300}
          />
          <Text style={styles.infoText}>{math.date}</Text>
        </View>
        <View style={styles.infoBadge}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={16}
            color={colors.grayscale.gray300}
          />
          <Text style={styles.infoText}>{math.time}</Text>
        </View>
        <View style={styles.infoBadge}>
          <DifficultyIcon
            difficulty={math.difficulty}
            inactiveColor={colors.grayscale.gray200}
            color={colors.feedback.info}
            isSelect
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grayscale.gray450,
    borderRadius: 20,
    padding: 24,
    gap: 20,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "Baloo2_800ExtraBold",
    color: colors.grayscale.gray100,
    width: "60%",
  },
  position: {
    fontSize: 24,
    fontFamily: "Baloo2_800ExtraBold",
    color: colors.accent.cyan,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grayscale.gray400,
    height: 32,
    gap: 6,
  },
  infoText: {
    lineHeight: 20,
    fontFamily: "Baloo2_500Medium",
    color: colors.grayscale.gray200,
  },
});

export default MatchHistoryCard;
