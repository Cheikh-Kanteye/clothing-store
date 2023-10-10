import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Button, SocialLink } from "@/components";
import { Feather } from "@expo/vector-icons";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/type";
import { images } from "@/assets";
import { colors, hp } from "@/utils";
import { useAuth } from "@/context/AuthContext";

type SignupProps = NativeStackScreenProps<AuthStackParamList, "Signup">;

const Signup: React.FC<SignupProps> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const passworrdMatched = confirmPassword === password;

  const goSignin = () => {
    navigation.navigate("Signin");
  };
  const signUp = () => {
    const { dispatch } = useAuth();

    if (email != "" && password != "" && passworrdMatched) {
      createUserWithEmailAndPassword(auth, email, password).then(
        (credentials) => {
          const userCredentials = credentials.user;
          if (userCredentials) {
            dispatch({ type: "LOGIN", payload: userCredentials });
          }
        }
      );
    } else {
      setError("Password or email are incorrect!");
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
        {error && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
      </View>
      <View style={styles.contentContainer}>
        <View style={{ width: "100%", gap: 5 }}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address..."
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={{ width: "100%", gap: 6 }}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create password..."
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={{ width: "100%", gap: 6 }}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password..."
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
      <Button label="Sign Up" onPress={signUp} />
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
});
