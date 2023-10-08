import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { w } from "@/utils";

type scrollXType = Animated.SharedValue<number>;

interface PaginatorProps {
  dotLength: number;
  scrollX: scrollXType;
}

const Dot: React.FC<{ scrollX: scrollXType; i: number }> = ({ scrollX, i }) => {
  const dotStyle = useAnimatedStyle(() => {
    return {
      width: 8,
      height: 8,
      borderRadius: 4,
      transform: [
        {
          scale: withTiming(
            interpolate(
              scrollX.value,
              [(i - 1) * w, i * w, (i + 1) * w],
              [1, 1.5, 1],
              Extrapolate.CLAMP
            )
          ),
        },
      ],
      backgroundColor: interpolateColor(
        scrollX.value,
        [(i - 1) * w, i * w, (i + 1) * w],
        ["#E2DCD7", "#704F38", "#E2DCD7"]
      ),
    };
  });
  return <Animated.View style={dotStyle} />;
};

const Paginator: React.FC<PaginatorProps> = ({ dotLength, scrollX }) => {
  return (
    <View style={styles.container}>
      {new Array(dotLength).fill("").map((_, i) => {
        return <Dot key={i} {...{ scrollX, i }} />;
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
});
