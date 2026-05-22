import { Stack } from "expo-router";
import React from "react";

const PrivateLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="game" />
      <Stack.Screen name="history" />
    </Stack>
  );
};

export default PrivateLayout;
