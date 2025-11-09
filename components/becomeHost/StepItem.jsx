// components/becomeHost/StepItem.jsx
import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../../styles/becomeHostStyles";

export default function StepItem({ step }) {
  return (
    <View style={styles.stepRow}>
      <Text style={styles.stepNumber}>{step.id}</Text>

      <View style={styles.stepTextBox}>
        <Text style={styles.stepTitle}>{step.title}</Text>
        <Text style={styles.stepDesc}>{step.desc}</Text>
      </View>

      <Image source={{ uri: step.image }} style={styles.stepImage} />
    </View>
  );
}
