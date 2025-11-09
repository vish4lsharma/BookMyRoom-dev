import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HIGHLIGHTS = [
  { key: "tranquil", icon: "happy-outline", label: "Tranquil" },
  { key: "modern", icon: "cube-outline", label: "Modern" },
  { key: "pet", icon: "paw-outline", label: "Pet-friendly" },
  { key: "cozy", icon: "home-outline", label: "Cozy" },
  { key: "secure", icon: "lock-closed-outline", label: "Secure" },
  { key: "scenic", icon: "image-outline", label: "Scenic" },
  { key: "eco", icon: "leaf-outline", label: "Eco-friendly" },
];

export default function HighlightSelector({ selected, onSelect }) {

  const toggle = (key) => {
    if (selected.includes(key)) {
      onSelect(selected.filter((i) => i !== key));
    } else if (selected.length < 2) {
      onSelect([...selected, key]);
    }
  };

  return (
    <View style={styles.wrap}>
      {HIGHLIGHTS.map((h) => (
        <TouchableOpacity
          key={h.key}
          style={[styles.item, selected.includes(h.key) && styles.active]}
          onPress={() => toggle(h.key)}
        >
          <Ionicons name={h.icon} size={18} color="#111" />
          <Text style={styles.text}>{h.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 8 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
  },
  active: { borderColor: "#111", backgroundColor: "#f6f6f6" },
  text: { fontSize: 14, marginLeft: 6 },
});
