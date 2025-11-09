import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const types = [
  { key: "country", label: "Transportation within country", icon: "airplane-outline" },
  { key: "city", label: "Transportation within city", icon: "car" },
  { key: "region", label: "Transportation within region", icon: "car" },
  { key: "state", label: "Transportation within state", icon: "car" },

];

export default function ServiceTypeSelector({ selected, onSelect }) {
  return (
    <View style={styles.grid}>
      {types.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[styles.card, selected === item.key && styles.activeCard]}
          onPress={() => onSelect(item.key)}
        >
          <Ionicons name={item.icon} size={26} color="#111" />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { borderWidth: 1, borderColor: "#ccc", borderRadius: 12, padding: 18, width: "47%", alignItems: "center" },
  activeCard: { borderColor: "#111", backgroundColor: "#f8f8f8" },
  label: { marginTop: 8, fontSize: 15, fontWeight: "600" },
});
