import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsRow({ icon, text, onPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#333" />
      <Text style={styles.text}>{text}</Text>
      <Ionicons name="chevron-forward" size={18} color="#777" style={{ marginLeft: "auto" }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  text: { fontSize: 15, marginLeft: 14, fontWeight: "500", color: "#111" },
});
