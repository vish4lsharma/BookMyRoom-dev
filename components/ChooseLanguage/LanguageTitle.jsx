import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LanguageTitle({ styles }) {
  return (
    <View style={styles.textContainer}>
      <View style={styles.iconTitle}>
        <Ionicons name="language-outline" size={25} color="#fff" />
        <Text style={styles.welcome}> welcome</Text>
      </View>

      <Text style={styles.title}>Choose your language</Text>
    </View>
  );
}
