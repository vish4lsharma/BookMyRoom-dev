// components/common/RoundedBackButton.jsx
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RoundedBackButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.backBtn} onPress={onPress}>
      <Ionicons name="arrow-back" size={22} color="#111" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backBtn: { width: 40, height: 40, justifyContent: "center" },
});
