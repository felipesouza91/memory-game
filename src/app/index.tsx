import { useAuthStore } from "@/shared/stores/auth.store";
import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";

SplashScreen.preventAutoHideAsync();

const Index: React.FC = () => {
  const { user } = useAuthStore();

  if (user) {
    return <Redirect href="/home" />;
  }
  return <Redirect href="/login" />;
};

export default Index;
