import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function PrimaryButton({ text, onPress, styles }) {
  return (
    <TouchableOpacity style={styles.confirmBtn} onPress={onPress}>
      <Text style={styles.confirmText}>{text}</Text>
    </TouchableOpacity>
  );
}
