import { colors, hp, wp } from "@/utils";
import React, { SetStateAction, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface ModalViewProps {
  closeModal: () => void;
  gender: "MALE" | "FEMALE";
}

type RadioBtnProps = {
  closeModal: () => void;
  isActive: boolean;
  gender: string;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RadioBtn = ({ closeModal, isActive, gender }: RadioBtnProps) => {
  return (
    <TouchableOpacity onPress={closeModal} style={styles.pickGenderbtn}>
      <View style={styles.genderIndicator}>
        {isActive && (
          <View
            style={[
              styles.activeGender,
              {
                backgroundColor: colors.primary,
              },
            ]}
          />
        )}
      </View>
      <Text style={styles.gender}>{gender}</Text>
    </TouchableOpacity>
  );
};

const ModalView: React.FC<ModalViewProps> = ({ closeModal, gender }) => {
  const offset = useSharedValue(0);

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const panGesture = Gesture.Pan().onChange((event) => {
    const offsedDelta = event.changeY + offset.value;
    const clamp = Math.max(-20, offsedDelta);
    offset.value = offsedDelta > 0 ? offsedDelta : withSpring(clamp);
  });
  return (
    <>
      <AnimatedPressable
        entering={FadeIn}
        exiting={FadeOut}
        style={{
          backgroundColor: "rgba(0,0,0,0.45)",
          ...StyleSheet.absoluteFillObject,
        }}
        onPress={closeModal}
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[styles.modal, translateY]}
          entering={SlideInDown.springify().damping(20)}
          exiting={SlideOutDown}
        >
          <RadioBtn
            closeModal={closeModal}
            gender="MALE"
            isActive={gender == "MALE"}
          />
          <RadioBtn
            closeModal={closeModal}
            gender="FEMALE"
            isActive={gender == "FEMALE"}
          />
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  modal: {
    width: wp(100),
    height: hp(20),
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    left: 0,
    bottom: -hp(2),
    padding: 16,
  },
  pickGenderbtn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    gap: 6,
  },
  genderIndicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  activeGender: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  gender: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: colors.black,
    textTransform: "capitalize",
  },
});
