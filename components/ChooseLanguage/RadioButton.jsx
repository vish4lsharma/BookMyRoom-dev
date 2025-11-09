import React from "react";
import { View } from "react-native";

export default function RadioButton({ selected, styles }) {
  return (
    <View style={[styles.radioOuter, { borderColor: selected ? "#007AFF" : "#bbb" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );
}
