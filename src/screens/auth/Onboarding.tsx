import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { blurhash, hp, wp } from "@/utils";
import { images } from "@/assets";
import { Image } from "expo-image";

const DATA = [
  {
    id: "001",
    image: images.slide1,
    title: "Seanmless Shopping Experience",
    subtitle:
      "Experience hassle-free online shopping. Explore our products, add to your cart, and enjoy a smooth checkout. Your convenience is our priority. Shop now!",
  },
  {
    id: "002",
    image: images.slide2,
    title: "Whislist: Where Fashion Dreams Begin",
    subtitle:
      "Wishlist is your fashion haven. Explore the latest trends, create your dream wardrobe, and turn your fashion fantasies into reality. Start building your style journey with us today!",
  },
  {
    id: "003",
    image: images.slide3,
    title: "Swift and Reliable Delivery",
    subtitle:
      "Swift and reliable deliveries—your satisfaction, our guarantee. Shop confidently with us!",
  },
];

const wordsToColor = ["Seamless", "Fashion", "Dreams", "Swift", "Reliable"];

const Description: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  const colorWordsInText = (text: string) => {
    const words = text.split(" ");
    return words.map((word, index) => {
      if (wordsToColor.includes(word)) {
        return (
          <Text key={index} style={{ color: "brown" }}>
            {word}{" "}
          </Text>
        );
      } else {
        return <Text key={index}>{word} </Text>;
      }
    });
  };

  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.title}>{colorWordsInText(title)}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        snapToInterval={wp(100)}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {DATA.map((slide, i) => {
          return (
            <View key={slide.id} style={styles.slideImgContainer}>
              <Image
                source={slide.image}
                placeholder={blurhash}
                style={styles.slideImg}
                transition={500}
                contentFit="contain"
              />
            </View>
          );
        })}
      </ScrollView>
      <View pointerEvents="none" style={styles.slideFooter}>
        <View style={styles.textContainer}>
          {DATA.map((slide, i) => {
            return (
              <Description
                title={slide.title}
                subtitle={slide.subtitle}
                key={slide.id}
              />
            );
          })}
        </View>
        <View style={styles.paginationContainer}></View>
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
    height: "30%",
    borderWidth: 1,
  },
  descriptionContainer: {
    position: "absolute",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 12,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    color: "#282932",
    fontFamily: "Montserrat-Bold",
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 14,
    color: "#797979",
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
  },
});
