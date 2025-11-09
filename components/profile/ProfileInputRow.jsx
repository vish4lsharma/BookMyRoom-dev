import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileInputRow({ icon, placeholder }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={20} color="#111" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#666"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    height: 55,
  },
  input: { marginLeft: 14, flex: 1, fontSize: 15, color: "#111" },
});
