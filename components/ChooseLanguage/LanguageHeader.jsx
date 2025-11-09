import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function LanguageHeader({ styles }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoText, { color: "#007AFF" }]}>BOOK</Text>
        <Text style={[styles.logoText, { color: "#FBBF24" }]}>MY ROOM</Text>
      </View>

      <TouchableOpacity onPress={() => router.push("/LoginScreen")}>
        <Text style={styles.skip}>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
}
