import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function YesNoSelector({ selected, onSelect }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => onSelect("yes")} style={[styles.option, selected === "yes" && styles.active]}>
        <Text>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("no")} style={[styles.option, selected === "no" && styles.active]}>
        <Text>No</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 18, marginVertical: 8 },
  option: { paddingVertical: 8, paddingHorizontal: 16, borderWidth: 1, borderRadius: 10, borderColor: "#ccc" },
  active: { borderColor: "#111", backgroundColor: "#f8f8f8" },
});
