import { useListEntryAnimation } from "@/animations/hooks/useListEntryAnimation";
import { useSwipeToDelete } from "@/animations/hooks/useSwipeToDelete";
import { colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { FormattedMatch } from "../../useHistory.viewModel";
import MatchHistoryCard from "../MatchHistoryCard";
interface AnimatedHistoryCardParams {
  math: FormattedMatch;
  index: number;
  onDelete: () => void;
}

const AnimatedHistoryCard: React.FC<AnimatedHistoryCardParams> = ({
  math,
  index,
  onDelete,
}) => {
  const { animatedStyle } = useListEntryAnimation({ index });
  const {
    containerAnimatedStyle,
    deleteItemStyle,
    cardAnimatedStyle,
    panGesture,
  } = useSwipeToDelete({ onDelete });
  return (
    <Animated.View style={[animatedStyle, containerAnimatedStyle]}>
      <Animated.View style={[deleteItemStyle, styles.deleteBackgroud]}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          color={colors.semantic.error}
          size={24}
        />
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={cardAnimatedStyle} collapsable={false}>
          <MatchHistoryCard math={math} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  deleteBackgroud: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 24,
  },
});

export default AnimatedHistoryCard;
