import { colors } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import { challengeTheme } from "@/shared/utils/challange";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ChallangeCard from "./components/ChallangeCard";

const ChallangesList: React.FC = () => {
  return (
    <View>
      <AppText style={styles.sectionTitle}>Desafios disponiveis</AppText>
      <FlatList
        data={challengeTheme}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10, marginTop: 20 }}
        renderItem={({ item }) => <ChallangeCard data={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
  },
});

export default ChallangesList;
