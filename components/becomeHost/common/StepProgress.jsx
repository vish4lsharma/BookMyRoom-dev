// components/becomeHost/StepProgress.jsx
import React from "react";
import { View } from "react-native";
import styles from "../../../styles/stepStyles";

export default function StepProgress({ active = 1, total = 12 }) {
  return (
    <View style={styles.progressBarContainer}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            index + 1 <= active && styles.barActive // ✅ highlight all passed steps
          ]}
        />
      ))}
    </View>
  );
}
