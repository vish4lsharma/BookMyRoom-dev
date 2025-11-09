import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export default function HomeNameInput({ value, onChange }) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Your home name"
        value={value}
        onChangeText={onChange}
        multiline
      />
      <Text style={styles.counter}>{value.length} characters</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 14,
    padding: 14, height: 110, textAlignVertical: "top", fontSize: 15, marginTop: 12
  },
  counter: { fontSize: 12, color: "#777", marginTop: 6 },
});
