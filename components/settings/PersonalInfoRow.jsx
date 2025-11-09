import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PersonalInfoRow({ label, value, actionText, onPress, description }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        {value ? (
          <Text style={styles.value}>{value}</Text>
        ) : (
          <Text style={styles.placeholder}>Not provided</Text>
        )}

        {description && <Text style={styles.description}>{description}</Text>}
      </View>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.action}>{actionText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: { fontSize: 15, fontWeight: "600", color: "#111" },
  value: { marginTop: 2, fontSize: 14, color: "#444" },
  placeholder: { marginTop: 2, fontSize: 14, color: "#999" },
  action: { fontSize: 14, color: "#007AFF", fontWeight: "600", marginLeft: 10 },
  description: { marginTop: 6, color: "#666", fontSize: 13, lineHeight: 18, maxWidth: "95%" }
});
