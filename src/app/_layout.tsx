import { colors } from "@/constants/colors";
import {
  Baloo2_400Regular,
  Baloo2_500Medium,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
} from "@expo-google-fonts/baloo-2";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Baloo2_400Regular,
    Baloo2_700Bold,
    Baloo2_500Medium,
    Baloo2_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.grayscale.gray700 },
        }}
      >
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(private)" />
      </Stack>
    </GestureHandlerRootView>
  );
}
