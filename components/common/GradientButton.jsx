import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientButton({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient colors={["#FF005A", "#FF4D5B"]} style={styles.btn}>
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: { width: "80%", marginTop: 40 },
  btn: {
    paddingVertical: 14,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
