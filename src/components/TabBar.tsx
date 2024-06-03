import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors, wp } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/assets";

const Icon = ({ src }: { src: ImageSourcePropType }) => {
  return (
    <Image
      source={src}
      style={{ width: 22, height: 22, objectFit: "contain" }}
    />
  );
};

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tab}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        let src;

        switch (route.name) {
          case "Home":
            src = isFocused ? images.home : images.homeo;
            break;
          case "Orders":
            src = isFocused ? images.shop : images.shopo;
            break;
          case "WishList":
            src = isFocused ? images.heart : images.hearto;
            break;
          case "ChatList":
            src = isFocused ? images.chat : images.chato;
            break;
          case "Profile":
            src = isFocused ? images.profile : images.profileo;
            break;
          default:
            src = images.home;
            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabbtn,
              {
                backgroundColor: isFocused ? colors.white : "transparent",
              },
            ]}
            key={index}
          >
            <Icon src={src} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    width: wp(100) - 40,
    height: 80,
    backgroundColor: colors.black,
    borderRadius: 40,
    padding: 10,
    position: "absolute",
    left: 16,
    bottom: 8,
  },
  tabbtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
});
