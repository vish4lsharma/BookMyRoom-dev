import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AmenitiesSection({ items = [], totalCount = 0 }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Offerings of the Sanctuary</Text>
      <View style={{ marginTop: 12, gap: 14 }}>
        {items.map((it, i) => (
          <View key={i} style={styles.row}>
            <Ionicons name={it.icon} size={18} color="#111" />
            <Text style={styles.itemText}>{it.label}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Show all {totalCount} amenities</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 12 },
  heading: { fontWeight: "800", fontSize: 16, color: "#111" },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  itemText: { fontSize: 14, color: "#111" },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 12,
  },
  buttonText: { fontWeight: "700", color: "#111" },
});
