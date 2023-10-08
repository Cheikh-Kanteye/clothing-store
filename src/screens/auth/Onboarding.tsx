import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ONBOARDING_DATA, blurhash, hp, w, wp } from "@/utils";
import { Image } from "expo-image";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Description, Paginator, SlideImg } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/type";

type OnboardingScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Onboarding"
>;

const Onboarding: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const scrollX = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      scrollX.value = x;
    },
  });
  const skip = () => {
    AsyncStorage.setItem("onboarded", "true");
    navigation.navigate("Signup");
  };
  const forward = () => {
    const slides = ONBOARDING_DATA.length;
    const activeSlide = interpolate(
      scrollX.value,
      [0, w, w * 1],
      [w, w * 2, w * slides - 3],
      Extrapolate.CLAMP
    );

    if (scrollRef.current) {
      const nextSlide = activeIndex + 1;
      if (nextSlide < slides) {
        scrollRef.current.scrollTo({ x: activeSlide });
        setActiveIndex(nextSlide);
      } else {
        skip();
        setActiveIndex(0);
      }
    }
    console.log(activeIndex, slides);
  };

  useEffect(() => {
    StatusBar.setBackgroundColor("#F8F8F8");
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={skip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        snapToInterval={w}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {ONBOARDING_DATA.map((slide, i) => {
          return (
            <SlideImg
              image={slide.image}
              scrollX={scrollX}
              i={i}
              key={slide.id}
            />
          );
        })}
      </Animated.ScrollView>
      <View pointerEvents="none" style={styles.slideFooter}>
        <View style={styles.textContainer}>
          {ONBOARDING_DATA.map((slide, i) => {
            return (
              <Description
                title={slide.title}
                subtitle={slide.subtitle}
                key={slide.id}
                {...{ scrollX, i }}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.paginationContainer}>
        <Paginator scrollX={scrollX} dotLength={ONBOARDING_DATA.length} />
        <TouchableOpacity onPress={forward}>
          <Ionicons name={"arrow-forward"} size={24} color={"#704F38"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  slideFooter: {
    width: wp(100),
    height: hp(45),
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopRightRadius: hp(45) * 0.1,
    borderTopLeftRadius: hp(45) * 0.1,
    overflow: "hidden",
  },
  textContainer: {
    width: wp(100),
    height: "70%",
    paddingHorizontal: 10,
  },
  paginationContainer: {
    width: wp(100),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  skipBtn: {
    position: "absolute",
    right: 20,
    top: StatusBar.currentHeight,
    zIndex: 10,
  },
  skipText: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: "#704F38",
  },
});
