import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AMENITIES = [
  { key: "wifi", label: "Wifi", icon: "wifi-outline" },
  { key: "tv", label: "TV", icon: "tv-outline" },
  { key: "kitchen", label: "Kitchen", icon: "restaurant-outline" },
  { key: "washing", label: "Washing machine", icon: "shirt-outline" },
  { key: "freeParking", label: "Free parking on premises", icon: "car-outline" },
  { key: "paidParking", label: "Paid parking on premises", icon: "cash-outline" },
  { key: "ac", label: "Air conditioning", icon: "snow-outline" },
  { key: "workspace", label: "Dedicated workspace", icon: "briefcase-outline" },
];

export default function AmenitiesSelector({ selected, onSelect }) {

  const toggle = (key) => {
    if (selected.includes(key)) {
      onSelect(selected.filter((item) => item !== key));
    } else {
      onSelect([...selected, key]);
    }
  };

  return (
    <View style={styles.grid}>
      {AMENITIES.map((item) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => toggle(item.key)}
          style={[styles.box, selected.includes(item.key) && styles.activeBox]}
        >
          <Ionicons name={item.icon} size={24} color="#111" />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 12 },
  box: {
    width: "47%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    paddingHorizontal: 6,
  },
  activeBox: { borderColor: "#111", backgroundColor: "#f8f8f8" },
  label: { marginTop: 6, fontSize: 14, fontWeight: "500", textAlign: "center" },
});
