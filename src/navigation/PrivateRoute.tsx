import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PrivateStackParamList } from "./type";
import TabNavigation from "./TabNavigation";

const Stack = createNativeStackNavigator<PrivateStackParamList>();

const PrivateRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" component={TabNavigation} />
    </Stack.Navigator>
  );
};

export default PrivateRoute;
