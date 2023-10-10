import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { colors } from "@/utils";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  color?: ColorValue;
}

const Button = (props: ButtonProps) => {
  const { color, label } = props;
  return (
    <TouchableOpacity
      {...props}
      style={[styles.btn, { backgroundColor: color ? color : colors.primary }]}
    >
      {/*TODO Update color, make it Dynamic */}
      <Text style={{ fontSize: 18, fontWeight: "500", color: colors.white }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
