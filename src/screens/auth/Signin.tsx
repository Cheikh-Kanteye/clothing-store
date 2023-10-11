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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/type";
import { images } from "@/assets";
import { colors, hp } from "@/utils";

type SigninProps = NativeStackScreenProps<AuthStackParamList, "Signin">;

const Signin: React.FC<SigninProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const goSignup = () => {
    navigation.navigate("Signup");
  };
  const handleLogin = async () => {
    try {
      if (email !== "" && password != "") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        Alert.alert("All fields are require");
      }
    } catch (error) {
      Alert.alert(error as string);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ gap: 6 }}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.description}>
            Hi! Welcome back, you have been missed.
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
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
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
        <Pressable
          style={styles.forgotPassword}
          onPress={() => setAgree(!agree)}
        >
          <Text
            style={styles.link}
            onPress={() => console.log("Terms & Conditon ...")}
          >
            Forgot Password?
          </Text>
        </Pressable>
      </View>
      <Button label="Sign In" onPress={handleLogin} />
      <View style={styles.or}>
        <View style={styles.line} />
        <Text style={styles.description}>Or sign in with</Text>
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
          onPress={goSignup}
          onLongPress={goSignup}
        >
          Don't have an account? <Text style={styles.link}>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
};

export default Signin;

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
  },
  forgotPassword: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
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
});
