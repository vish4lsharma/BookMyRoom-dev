import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const options = [
  { key: "me", label: "Me", icon: "person-outline" },
  { key: "family", label: "My family", icon: "home-outline" },
  { key: "other", label: "Other guests", icon: "people-outline" },
  { key: "roommates", label: "Flatmates/housemates", icon: "business-outline" },
];

export default function GuestMeetSelector() {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.grid}>
      {options.map((o) => (
        <TouchableOpacity
          key={o.key}
          style={[styles.card, selected === o.key && styles.activeCard]}
          onPress={() => setSelected(o.key)}
        >
          <Ionicons name={o.icon} size={26} color="#111" />
          <Text style={styles.text}>{o.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 12 },
  card: { borderWidth: 1, borderColor: "#ccc", padding: 14, borderRadius: 12, width: "47%", alignItems: "center" },
  activeCard: { borderColor: "#111", backgroundColor: "#f8f8f8" },
  text: { marginTop: 6, fontWeight: "600" },
});
