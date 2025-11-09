import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function ContinueButton({ styles, onPress }) {
  return (
    <TouchableOpacity style={styles.continueBtn} onPress={onPress}>
      <Text style={styles.continueText}>Continue</Text>
    </TouchableOpacity>
  );
}
