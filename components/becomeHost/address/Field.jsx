import React from "react";
import { View, Text } from "react-native";
import styles from "../../../styles/addressStyles";

export default function Field({ label, children }) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}
