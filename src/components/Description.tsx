import { w } from "@/utils";
import Animated, {
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";
import { Text, StyleSheet } from "react-native";

interface DescriptionProps {
  title: string;
  subtitle: string;
  scrollX: Animated.SharedValue<number>;
  i: number;
}
const wordsToColor = ["Seamless", "Fashion", "Dreams", "Swift", "Reliable"];

const Description: React.FC<DescriptionProps> = ({
  title,
  subtitle,
  scrollX,
  i,
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

  const animStyle = useAnimatedStyle(() => {
    const inputRange = [(i - 1) * w, i * w, (i + 1) * w];
    const clamp = Extrapolate.CLAMP;
    return {
      opacity: interpolate(scrollX.value, inputRange, [0, 1, 0], clamp),
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            inputRange,
            [-100, 0, 100],
            clamp
          ),
        },
        {
          scale: interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], clamp),
        },
      ],
    };
  });

  return (
    <Animated.View style={[animStyle, styles.descriptionContainer]}>
      <Text style={styles.title}>{colorWordsInText(title)}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Animated.View>
  );
};

export default Description;

const styles = StyleSheet.create({
  descriptionContainer: {
    position: "absolute",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
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
