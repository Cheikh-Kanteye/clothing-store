import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { colors, wp } from "@/utils";
import Paginator from "./Paginator";
import { Image } from "expo-image";
import Button from "./Button";
import { slide } from "@/navigation/type";

interface BannerSlideProps extends TouchableOpacityProps {
  slides: slide[];
}

const BannerSlide: React.FC<BannerSlideProps> = ({ slides }, props) => {
  const scrollX = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      scrollX.value = x;
    },
  });

  return (
    <View style={{ gap: 12 }}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        onScroll={scrollHandler}
        contentContainerStyle={{ gap: 10 }}
        snapToInterval={wp(100) - 22}
        decelerationRate={"fast"}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {slides.map((item) => {
          return (
            <TouchableOpacity
              {...props}
              activeOpacity={0.8}
              key={item.id}
              style={[styles.promoCard, styles.row]}
            >
              <View style={styles.textContent}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.message}>{item.message}</Text>
                <Button style={styles.btn} label="Shop Now" />
              </View>
              <View style={{ flex: 1 }}>
                <Image source={item.img} style={styles.bannerImg} />
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
      <View style={[styles.row, { justifyContent: "center" }]}>
        <Paginator scrollX={scrollX} dotLength={slides.length} />
      </View>
    </View>
  );
};

export default BannerSlide;

const styles = StyleSheet.create({
  promoCard: {
    width: wp(100) - 32,
    height: 175,
    backgroundColor: colors.primaryAlt,
    borderRadius: 6,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  textContent: {
    paddingLeft: 20,
    gap: 8,
    flex: 8 / 9,
  },
  label: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    color: colors.grey,
    fontSize: 14,
  },
  btn: {
    marginTop: 10,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 10,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  bannerImg: {
    width: "auto",
    height: "100%",
    objectFit: "contain",
  },
});
