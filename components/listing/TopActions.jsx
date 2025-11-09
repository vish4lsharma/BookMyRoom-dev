import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function TopActions({ liked = false, onHeartPress }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Heart (Wishlist) Button */}
      <TouchableOpacity style={styles.iconBtn} onPress={onHeartPress}>
        <AntDesign
          name="heart"
          size={22}
          color={liked ? "#ff4d5b" : "#fff"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 48,
    left: 16,
    right: 16,
    zIndex: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconBtn: {
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 10,
    borderRadius: 30,
  },
});
