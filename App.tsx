import { AppNavigation } from "@/navigation";
import * as Navbar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { fonts } from "@/assets";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "@/utils";
import { GestureHandlerRootView } from "react-native-gesture-handler";

Navbar.setBackgroundColorAsync("#fff");
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="dark" backgroundColor={colors.white} />
        <AppNavigation />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
