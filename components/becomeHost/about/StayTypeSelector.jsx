import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const options = [
  { key: "entire", title: "An entire place", desc: "Guests have the whole place.", icon: "home" },
  { key: "room", title: "A room", desc: "Guests have their own room.", icon: "bed" },
  { key: "shared", title: "A shared room", desc: "Guests share a sleeping space.", icon: "people" },
];

export default function StayTypeSelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {options.map((o) => (
        <TouchableOpacity
          key={o.key}
          style={[styles.row, selected === o.key && styles.active]}
          onPress={() => onSelect(o.key)}
        >
          <Ionicons name={o.icon} size={26} color="#111" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.title}>{o.title}</Text>
            <Text style={styles.desc}>{o.desc}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  row: { flexDirection: "row", borderWidth: 1, borderColor: "#ccc", borderRadius: 12, padding: 14, alignItems: "center" },
  active: { borderColor: "#111", backgroundColor: "#f8f8f8" },
  title: { fontSize: 16, fontWeight: "700" },
  desc: { fontSize: 12, color: "#555", marginTop: 3 },
});
