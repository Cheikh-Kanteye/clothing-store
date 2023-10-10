import { StyleSheet, Text, View, ImageSourcePropType } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { blurhash, hp, w, wp } from "@/utils";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface SlideImgProps {
  image: ImageSourcePropType;
  scrollX: Animated.SharedValue<number>;
  i: number;
}

const SlideImg: React.FC<SlideImgProps> = ({ image, scrollX, i }) => {
  const animStyle = useAnimatedStyle(() => {
    const inputRange = [(i - 1) * w, i * w, (i + 1) * w];
    const clamp = Extrapolate.CLAMP;
    return {
      transform: [
        { scale: interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], clamp) },
      ],
    };
  });
  return (
    <Animated.View style={[animStyle, styles.slideImgContainer]}>
      <Image
        source={image}
        placeholder={blurhash}
        placeholderContentFit="contain"
        style={styles.slideImg}
        transition={500}
        contentFit="contain"
      />
    </Animated.View>
  );
};

export default SlideImg;

const styles = StyleSheet.create({
  slideImgContainer: {
    width: wp(100),
    height: hp(100),
    paddingBottom: hp(20),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  slideImg: {
    width: wp(100) * 1.4,
    aspectRatio: 1,
  },
});
