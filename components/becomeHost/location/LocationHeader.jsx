// components/becomeHost/LocationHeader.jsx
import React from "react";
import { View, Text } from "react-native";
import styles from "../../../styles/stepStyles";

export default function LocationHeader() {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerBtn}>Save & exit</Text>
      <Text style={styles.headerBtn}>Questions?</Text>
    </View>
  );
}
