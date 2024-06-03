import {
  View,
  Text,
  TouchableOpacityProps,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { categorie } from "@/navigation/type";
import { colors } from "@/utils";
import { Image } from "expo-image";

interface CategoryTabProps extends TouchableOpacityProps {
  categories: categorie[];
}

const CategoryTab: React.FC<CategoryTabProps> = ({ categories }, props) => {
  return (
    <View style={{ gap: 16 }}>
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <Text style={styles.largeText}>Category</Text>
        <Pressable>
          <Text style={[styles.label, { color: colors.primary }]}>See All</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        {categories.map((categorie) => (
          <View key={categorie.id} style={styles.tab}>
            <TouchableOpacity style={styles.iconContainer}>
              <Image source={categorie.icon} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.label}>{categorie.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CategoryTab;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    width: "100%",
  },
  largeText: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.black,
  },
  label: {
    fontSize: 16,
    color: colors.black,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryAlt,
  },
  icon: {
    width: 36,
    height: 36,
    objectFit: "contain",
  },
});
