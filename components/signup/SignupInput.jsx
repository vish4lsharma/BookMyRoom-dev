import React from "react";
import { TextInput } from "react-native";

export default function SignupInput({ value, onChangeText, placeholder, keyboardType, secureTextEntry, autoCapitalize, styles }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize || "sentences"}
    />
  );
}
