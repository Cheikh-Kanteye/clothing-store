import { AuthStackNavigator } from "@/navigation";
import { GetStarted } from "@/screens";
import { NavigationContainer } from "@react-navigation/native";
import * as Navbar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { fonts } from "@/assets";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/AuthContext";

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
      <StatusBar style="dark" />
      <AuthProvider>
        <NavigationContainer>
          <AuthStackNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
