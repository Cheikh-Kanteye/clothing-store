import React, { useEffect } from "react";
import { colors } from "@/utils";
import { StyleSheet, Text, View } from "react-native";
import { useCountDown } from "@/hooks";
import { Timer } from "@/navigation/type";

const num2Digit = (n: number) => (n <= 9 ? "0" + n : n);

interface CountDownTimerProps {
  targetDate: string;
  onFinish?: () => void;
}

const CountdownTimer: React.FC<CountDownTimerProps> = ({
  targetDate,
  onFinish,
}) => {
  const { days, hours, minutes, seconds } = useCountDown(targetDate);

  const renderTime = (time: number) => (
    <Text style={[styles.label, styles.timer]}>{num2Digit(time)}</Text>
  );

  const shouldHideSeconds =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0;
  const shouldHideMinutes = days === 0 && hours === 0 && minutes === 0;
  const shouldHideHours = days === 0 && hours === 0;

  useEffect(() => {
    if (
      days === 0 &&
      hours === 0 &&
      minutes === 0 &&
      seconds === 0 &&
      onFinish
    ) {
      onFinish();
    }
  }, [days, hours, minutes, seconds, onFinish]);

  return (
    <View style={styles.row}>
      {days > 0 && renderTime(days)}
      {!shouldHideHours && renderTime(hours)}
      {!shouldHideMinutes && renderTime(minutes)}
      {!shouldHideSeconds && renderTime(seconds)}
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
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
