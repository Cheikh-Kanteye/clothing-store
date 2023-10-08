import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { images } from "@/assets";
import { Button } from "@/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/type";
import { hp, wp } from "@/utils";

type GetStartedScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "GetStarted"
>;

const GetStarted: React.FC<GetStartedScreenProps> = ({ navigation }) => {
  const goSignin = () => {
    navigation.navigate("Signin");
  };

  const getStart = () => {
    AsyncStorage.getItem("onboarded").then((onboarded) => {
      if (onboarded) navigation.navigate("Signup");
      else navigation.navigate("Onboarding");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.column}>
          <View style={styles.largeImg}>
            <Image
              source={images.largeImg}
              style={StyleSheet.absoluteFillObject}
              contentFit="cover"
            />
          </View>
          <Text style={styles.character}>✱</Text>
        </View>
        <View style={styles.column}>
          <View style={styles.ovalImg}>
            <Image
              source={images.ovalImg}
              style={StyleSheet.absoluteFillObject}
              contentFit="cover"
            />
          </View>
          <View style={styles.circleImg}>
            <Image
              source={images.circleImg}
              style={StyleSheet.absoluteFillObject}
              contentFit="cover"
            />
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={{ gap: 8 }}>
          <Text style={styles.slogan}>
            The <Text style={styles.highlighted}>Fashion App</Text> That Makes
            Your Look The Best
          </Text>
          <Text style={styles.descriptif}>
            Start your style journey with ease using our app. Explore, shop, and
            love fashion today!
          </Text>
        </View>
        <Button
          label="Let's Get Started"
          onPress={getStart}
          activeOpacity={0.8}
        />
        <Text
          style={styles.descriptif}
          onPress={goSignin}
          onLongPress={goSignin}
        >
          Already have an account? <Text style={styles.link}>Sign In</Text>
        </Text>
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  imagesContainer: {
    height: hp(60),
    width: wp(100),
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  circle1: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#797979",
    position: "absolute",
    top: -80,
    left: -60,
  },
  circle2: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#797979",
    position: "absolute",
    bottom: 50,
    right: -100,
    zIndex: 10,
  },
  largeImg: {
    width: "100%",
    height: "100%",
    backgroundColor: "lightgrey",
    borderRadius: 100,
    overflow: "hidden",
  },
  column: {
    height: "95%",
    width: "48%",
    justifyContent: "space-between",
  },
  ovalImg: {
    width: "100%",
    height: "60%",
    backgroundColor: "lightgrey",
    borderRadius: 100,
    overflow: "hidden",
  },
  circleImg: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "lightgrey",
    borderRadius: 100,
    overflow: "hidden",
  },
  detailsContainer: {
    height: "100%",
    width: wp(100),
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    gap: 20,
  },
  slogan: {
    fontSize: 22,
    textAlign: "center",
    color: "#282932",
    fontFamily: "Montserrat-Bold",
    lineHeight: 28,
  },
  highlighted: {
    color: "#704F38",
  },
  descriptif: {
    fontSize: 14,
    color: "#797979",
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
  },
  link: {
    color: "#704F38",
    textDecorationLine: "underline",
    fontFamily: "Montserrat-SemiBold",
  },
  character: {
    position: "absolute",
    bottom: 0,
    left: 0,
    fontSize: 48,
  },
});
