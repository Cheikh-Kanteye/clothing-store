import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GetStarted, Onboarding, Signin, Signup } from "@/screens";
import { AuthStackParamList } from "./type";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="GetStarted" component={GetStarted} />
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
      <AuthStack.Screen name="Signin" component={Signin} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
