import AppText from "@/shared/components/AppText";
import { challengeTheme } from "@/shared/utils/challange";
import React from "react";
import { FlatList, View } from "react-native";

const ChallangesList: React.FC = () => {
  return (
    <View>
      <AppText>Desafios disponiveis</AppText>
      <FlatList
        data={challengeTheme}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AppText>{item.title}</AppText>}
      />
    </View>
  );
};

export default ChallangesList;
