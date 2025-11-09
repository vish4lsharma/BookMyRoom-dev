import React from "react";
import { View, Text } from "react-native";

export default function SignupCard({ children, styles }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Signup</Text>
      {children}
    </View>
  );
}
