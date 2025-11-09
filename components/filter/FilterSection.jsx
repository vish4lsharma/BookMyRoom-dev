import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/filterStyles";

export default function FilterSection({ title, children }) {
  return (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.row}>{children}</View>
    </>
  );
}
