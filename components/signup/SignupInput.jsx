import React from "react";
import { TextInput } from "react-native";

export default function SignupInput({ value, onChangeText, placeholder, keyboardType, styles }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
    />
  );
}
