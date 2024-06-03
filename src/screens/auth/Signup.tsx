import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, SocialLink } from "@/components";
import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/type";
import { images } from "@/assets";
import { colors, hp } from "@/utils";

type SignupProps = NativeStackScreenProps<AuthStackParamList, "Signup">;

const Signup: React.FC<SignupProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string>();
  const passworrdMatched = confirmPassword === password;

  const goSignin = () => {
    navigation.navigate("Signin");
  };
  const handleLogin = () => {
    try {
      if (email !== "" && passworrdMatched) {
        navigation.navigate("CompleteProfile", { email, password });
      } else {
        setError("All fields are require !");
      }
    } catch (error) {
      setError("Something went wrong !");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ gap: 6 }}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.description}>
            Fit your information below or register with your social account.
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={{ width: "100%", gap: 5 }}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address..."
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <View style={{ width: "100%", gap: 6 }}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create password..."
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            autoCapitalize="none"
          />
        </View>
        <View style={{ width: "100%", gap: 6 }}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password..."
            value={confirmPassword}
            secureTextEntry
            onChangeText={setConfirmPassword}
            autoCapitalize="none"
          />
        </View>
        <Pressable
          style={styles.agreementChecker}
          onPress={() => setAgree(!agree)}
        >
          <View
            style={{
              ...styles.checkBox,
              backgroundColor: agree ? colors.primary : "transparent",
            }}
          >
            {agree && <Feather name="check" color={colors.white} />}
          </View>
          <Text style={styles.label}>
            Agree with{" "}
            <Text
              style={styles.link}
              onPress={() => console.log("Terms & Conditon ...")}
            >
              Terms & Condition
            </Text>
          </Text>
        </Pressable>
      </View>
      <Button label="Sign Up" onPress={handleLogin} />
      <View style={styles.or}>
        <View style={styles.line} />
        <Text style={styles.description}>Or sign up with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.footer}>
        <View style={styles.socialAuth}>
          <SocialLink icon={images.apple} />
          <SocialLink icon={images.google} />
          <SocialLink icon={images.facebook} />
        </View>
        <Text
          style={styles.description}
          onPress={goSignin}
          onLongPress={goSignin}
        >
          Already have an account? <Text style={styles.link}>Sign In</Text>
        </Text>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp(5),
    padding: 16,
    gap: 24,
  },
  contentContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  input: {
    width: "100%",
    height: 45,
    borderRadius: 23,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: colors.lightgrey,
  },
  checkBox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  link: {
    color: colors.primary,
    textDecorationLine: "underline",
    fontFamily: "Montserrat-SemiBold",
  },
  label: {
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
    color: colors.grey,
  },
  agreementChecker: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat-SemiBold",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    lineHeight: 20,
    textAlign: "center",
    color: colors.grey,
  },
  or: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.grey,
    opacity: 0.6,
  },
  socialAuth: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  error: {
    fontSize: 12,
    color: "tomato",
  },
});
