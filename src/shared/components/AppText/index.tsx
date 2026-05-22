import { colors } from "@/constants/colors";
import React from "react";
import { Text, TextProps } from "react-native";

const AppText: React.FC<TextProps> = (props) => {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "Baloo2_400Regular", color: colors.grayscale.gray100 },
        props.style,
      ]}
    />
  );
};

export default AppText;
