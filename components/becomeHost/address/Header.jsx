import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/addressStyles";
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter();
  return (
    <View style={styles.headerWrap}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backHit}>
        <Ionicons name="arrow-back" size={22} color="#111" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Your Address</Text>
    </View>
  );
}
