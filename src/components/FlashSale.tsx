import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/utils";
import { CountDownTimer } from ".";

interface FlashSaleProps {
  targetDate: string;
  onFinish: () => void;
}

const FlashSale: React.FC<FlashSaleProps> = ({ targetDate, onFinish }) => {
  return (
    <View>
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <Text style={styles.largeText}>Flash Sale</Text>
        <View style={styles.row}>
          <Text style={{ color: colors.grey, fontSize: 16 }}>Closing in: </Text>
          <CountDownTimer {...{ targetDate, onFinish }} />
        </View>
      </View>
    </View>
  );
};

export default FlashSale;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  largeText: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.black,
  },
  label: {
    fontSize: 14,
    color: colors.primary,
  },
  timer: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: colors.primaryAlt,
  },
});
