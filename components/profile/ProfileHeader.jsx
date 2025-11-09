import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileHeader() {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.header}>Profile</Text>

      <TouchableOpacity style={styles.notifBtn}>
        <Ionicons name="notifications-outline" size={22} color="#111" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  header: { fontSize: 28, fontWeight: "800", color: "#111" },
  notifBtn: {
    backgroundColor: "#F2F2F2",
    padding: 8,
    borderRadius: 20,
  },
});
