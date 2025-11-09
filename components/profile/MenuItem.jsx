import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MenuItem({ icon, text, onPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#333" />
      <Text style={styles.rowText}>{text}</Text>
      <Ionicons name="chevron-forward" size={18} color="#777" style={{ marginLeft: "auto" }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  rowText: { fontSize: 15, marginLeft: 14, fontWeight: "500" },
});
