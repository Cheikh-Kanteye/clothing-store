import {
  TouchableOpacityProps,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import { colors, wp } from "@/utils";

interface SocialLinkProps extends TouchableOpacityProps {
  icon: ImageSourcePropType;
}

const SocialLink: React.FC<SocialLinkProps> = (props) => {
  return (
    <TouchableOpacity
      style={{
        width: wp(18),
        aspectRatio: 1,
        borderRadius: wp(18) / 2,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.lightgrey,
      }}
      {...props}
    >
      <Image
        source={props.icon}
        style={{ width: 24, height: 24 }}
        contentFit="contain"
      />
    </TouchableOpacity>
  );
};

export default SocialLink;
