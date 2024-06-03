import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { colors } from "@/utils";
import { TextInput } from "react-native-gesture-handler";
import { BannerSlide, CategoryTab, FlashSale } from "@/components";
import { bannerSlides } from "@/mocks";
import { Categories } from "@/mocks/Categories";

const Home = () => {
  const [location, setLocation] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saleClosed, setShaleClose] = useState(false);
  const [saleTargetDate, setSaleTargetDate] = useState(
    "Mon Jun 03 2024 22:35:47 GMT"
  );

  const onFlashShaleClosed = () => {
    setShaleClose(true);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let region = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocation(region[0]);
    })();
  }, []);

  if (errorMsg) {
    return <ActivityIndicator size={"large"} color={colors.primary} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text>Location</Text>
          <TouchableOpacity style={styles.locationBtn}>
            <Ionicons name="location-sharp" size={24} color={colors.primary} />
            <Text style={styles.locationText}>
              {location?.city}, {location?.country}{" "}
            </Text>
            <Ionicons name="chevron-down" size={18} color={colors.black} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications" size={22} color={colors.black} />
          <View style={styles.notif} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={[styles.inputContainer, styles.row]}>
          <Ionicons name="search" size={20} color={colors.grey} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.filter}>
          <Ionicons name="filter" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      <BannerSlide slides={bannerSlides} />

      <CategoryTab categories={Categories} />

      {!saleClosed && (
        <FlashSale targetDate={saleTargetDate} onFinish={onFlashShaleClosed} />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  locationText: {
    fontWeight: "600",
    fontSize: 16,
  },
  iconBtn: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightgrey,
    borderRadius: 18,
    position: "relative",
  },
  notif: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    position: "absolute",
    top: 6,
    right: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.white,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.lightgrey,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 6,
  },
  input: {
    flex: 1,
  },
  filter: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 6,
    elevation: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lightgrey,
  },
});
