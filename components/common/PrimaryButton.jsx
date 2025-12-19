import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

export default function PrimaryButton({ text, onPress, styles, disabled }) {
  return (
    <TouchableOpacity 
      style={[styles.confirmBtn, disabled && { opacity: 0.6 }]} 
      onPress={onPress}
      disabled={disabled}
    >
      {disabled && text.includes("...") ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.confirmText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}
