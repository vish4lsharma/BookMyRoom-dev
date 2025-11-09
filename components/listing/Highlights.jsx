import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Highlights({ items = [] }) {
  return (
    <View style={styles.card}>
      {items.map((it, idx) => (
        <View key={idx} style={styles.row}>
          <Ionicons name={it.icon} size={18} color="#111" style={{ marginTop: 2 }} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.title}>{it.title}</Text>
            <Text style={styles.desc}>{it.desc}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
    gap: 12,
  },
  row: { flexDirection: "row" },
  title: { fontWeight: "700", color: "#111" },
  desc: { color: "#666", marginTop: 2, lineHeight: 18 },
});
