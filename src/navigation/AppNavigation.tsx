import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigator";
import PrivateRoute from "./PrivateRoute";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

const AppNavigation = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      {user ? <PrivateRoute /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigation;
