import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CounterGroup({ label, value, onChange }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => onChange(Math.max(0, value - 1))}>
          <Text style={styles.btn}>-</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity onPress={() => onChange(value + 1)}>
          <Text style={styles.btn}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 14 },
  label: { fontSize: 16, fontWeight: "600" },
  controls: { flexDirection: "row", alignItems: "center", gap: 16 },
  btn: { fontSize: 26, paddingHorizontal: 12 },
  value: { fontSize: 17, fontWeight: "700" },
});
