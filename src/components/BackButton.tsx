import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { colors } from "@/utils";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.lightgrey,
      }}
      onPress={navigation.goBack}
    >
      <Ionicons name="arrow-back" size={22} />
    </TouchableOpacity>
  );
};

export default BackButton;
