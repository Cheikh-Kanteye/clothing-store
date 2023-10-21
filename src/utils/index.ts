import { images } from "@/assets";
import { Dimensions } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const w = Dimensions.get("window").width;

export { hp, wp, w };

export const blurhash = "LONc=[8{.myE?v-;%2jFkWNGMxaK";

export const ONBOARDING_DATA = [
  {
    id: "001",
    image: images.slide1,
    title: "Seamless Shopping Experience",
    subtitle:
      "Effortless online shopping, from browse to checkout. Your convenience, our priority.",
  },
  {
    id: "002",
    image: images.slide2,
    title: "Whislist: Where Fashion Dreams Begin",
    subtitle:
      "Discover fashion trends, curate your wardrobe, and make your style dreams come true!",
  },
  {
    id: "003",
    image: images.slide3,
    title: "Swift and Reliable Delivery",
    subtitle:
      "Swift and reliable deliveries—your satisfaction, our guarantee. Shop confidently with us!",
  },
];

export const colors = {
  primary: "#704F38",
  black: "#1F2029",
  grey: "#797979",
  lightgrey: "#E6E6E6",
  white: "#fff",
};
