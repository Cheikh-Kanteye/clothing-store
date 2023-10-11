import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParamList } from "./type";
import { ChatList, Home, Orders, Profile, WishList } from "@/screens";

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="WishList" component={WishList} />
      <Tab.Screen name="ChatList" component={ChatList} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
