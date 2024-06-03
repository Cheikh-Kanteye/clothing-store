import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/type";
import { auth, db } from "@/config/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { BackButton, Button, ModalView } from "@/components";
import { colors, hp } from "@/utils";
import { images } from "@/assets";
import { CountryPicker } from "react-native-country-codes-picker";
import { doc, setDoc } from "firebase/firestore";

type CompleteProfileScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "CompleteProfile"
>;

const CompleteProfie: React.FC<CompleteProfileScreenProps> = ({ route }) => {
  const { email, password } = route.params;
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCode] = useState("+221");
  const [selectGender, setSelectGender] = useState(false);
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [pickCode, setPickCode] = useState(false);

  const completeSignup = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      const uid = user.uid;

      await setDoc(doc(db, "users", uid), {
        photoUrl: image,
        displayName: name,
        phoneNumber: `${countryCode}${phoneNumber}`,
        gender,
      });
      setSuccess("Inscription réussie !");
    } catch (error) {
      setError("Something wend wrong !");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (error) {
      const errorTimedOut = setTimeout(() => setError(undefined), 2000);
      return () => clearTimeout(errorTimedOut);
    }
    if (success) {
      const successTimedOut = setTimeout(() => setSuccess(undefined), 2000);
      return () => clearTimeout(successTimedOut);
    }
  }, [error, success]);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.contentContainer}>
        {error && <Text style={styles.error}>{error}</Text>}
        {success && <Text style={styles.success}>{success}</Text>}
        <View style={{ gap: 6 }}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.description}>
            Fit your information below or register with your social account.
          </Text>
        </View>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.pickImgBtn}>
            <Image
              source={image ? { uri: image } : images.imgPick}
              style={image ? styles.profile : styles.profileThumbnail}
              resizeMode={image ? "cover" : "contain"}
            />
          </View>
          <View style={styles.edit}>
            <Image
              source={images.edit}
              style={{ width: 18, height: 18, tintColor: colors.white }}
              resizeMode={"contain"}
            />
          </View>
        </TouchableOpacity>
        <View style={{ width: "100%", gap: 5 }}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name..."
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
        </View>

        {/* Phone number Input */}
        <View style={{ width: "100%", gap: 5 }}>
          <Text style={styles.label}>Phone number</Text>
          <View style={[styles.input, styles.inputRow]}>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setPickCode(true)}
            >
              <Text>{countryCode}</Text>
              <Ionicons name="chevron-down" size={18} color={colors.grey} />
            </TouchableOpacity>
            <View
              style={{
                width: 2,
                height: "40%",
                backgroundColor: colors.lightgrey,
              }}
            />
            <TextInput
              style={{ flex: 1, height: "100%" }}
              placeholder="Enter your phone number..."
              value={phoneNumber}
              autoComplete="tel"
              keyboardType="phone-pad"
              onChangeText={setPhoneNumber}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Selcect Gender Input */}
        <View style={{ width: "100%", gap: 5 }}>
          <Text style={styles.label}>Gender</Text>
          <View style={[styles.input, { flexDirection: "row-reverse" }]}>
            <TouchableOpacity
              style={[styles.picker, { paddingLeft: 16 }]}
              onPress={() => setSelectGender(true)}
            >
              <Ionicons name="chevron-down" size={18} color={colors.grey} />
            </TouchableOpacity>
            <TextInput style={{ flex: 1, height: "100%" }} value={gender} />
          </View>
        </View>
        <View style={{ height: 5 }} />
        <Button label="Complete Profile" onPress={completeSignup} />
      </View>

      <CountryPicker
        show={pickCode}
        pickerButtonOnPress={(item) => {
          setCode(item.dial_code);
          setPickCode(false);
        }}
        onBackdropPress={() => setPickCode(false)}
        style={{
          modal: {
            height: hp(50),
          },
        }}
        initialState="+221"
        inputPlaceholder="+221"
        lang="fr"
      />
      {selectGender && (
        <ModalView
          gender={gender}
          closeModal={() => {
            setSelectGender(false);
            setGender(gender === "MALE" ? "FEMALE" : "MALE");
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default CompleteProfie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  contentContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
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
  pickImgBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightgrey,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.lightgrey,
  },
  edit: {
    width: 35,
    height: 35,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 3,
    borderColor: colors.white,
    backgroundColor: colors.primary,
  },
  profileThumbnail: { width: 40, height: 40, tintColor: colors.grey },
  profile: {
    width: "100%",
    height: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
    color: colors.grey,
  },
  input: {
    width: "100%",
    height: 45,
    borderRadius: 23,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: colors.lightgrey,
  },
  inputRow: { flexDirection: "row", gap: 4, alignItems: "center" },
  picker: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  error: {
    fontSize: 12,
    color: "tomato",
  },
  success: {
    fontSize: 12,
    color: "lightgreen",
  },
});
