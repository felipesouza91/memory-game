import { colors } from "@/constants/colors";
import AppText from "@/shared/components/AppText";
import { useRankingStore } from "@/shared/stores/ranking.store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedHistoryCard from "./components/AnimatedHistoryCard";
import ListHeader from "./components/ListHeader";
import { useHistory } from "./useHistory.viewModel";
const HistoryView: React.FC<ReturnType<typeof useHistory>> = ({
  matchs,
  evaregeTime,
  totalGame,
}) => {
  const { deleteScore } = useRankingStore();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => router.push("/(private)/home")}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.grayscale.gray100}
          />
        </Pressable>
        <AppText style={styles.title}>Histórico de Partidas</AppText>
      </View>
      <View style={styles.contextContainer}>
        <FlatList
          data={matchs}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <AnimatedHistoryCard
              math={item}
              index={index}
              onDelete={() => deleteScore(item.id)}
            />
          )}
          style={{ width: "100%" }}
          contentContainerStyle={{
            gap: 8,
            paddingHorizontal: 24,
          }}
          ListHeaderComponent={() => (
            <ListHeader
              evaregeTime={evaregeTime}
              totalGame={totalGame.toString()}
            />
          )}
          ListHeaderComponentStyle={{ marginBottom: 14 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale.gray700,
  },
  contextContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
  },
  title: {
    fontSize: 20,
    fontFamily: "Baloo2_700Bold",
    color: colors.grayscale.gray100,
    flex: 1,
    textAlign: "center",
  },
});

export default HistoryView;
