import React from "react";
import { View, Text } from "react-native";

export default function LoginCard({ children, styles }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Login</Text>
      {children}
    </View>
  );
}

