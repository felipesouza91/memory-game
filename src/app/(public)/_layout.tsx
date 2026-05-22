import { Stack } from "expo-router";
import React from "react";

const PublicLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default PublicLayout;
