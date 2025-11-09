import React from "react";
import { View, Text } from "react-native";

export default function AppLogo({ styles }) {
  return (
    <View style={styles.logoContainer}>
      <Text style={[styles.logoText, { color: "#007AFF" }]}>BOOK</Text>
      <Text style={[styles.logoText, { color: "#FBBF24" }]}>MY ROOM</Text>
    </View>
  );
}
