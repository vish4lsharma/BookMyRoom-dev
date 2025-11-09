import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function GoogleButton({ styles, iconSize }) {
  return (
    <TouchableOpacity style={styles.googleBtn}>
      <Ionicons name="logo-google" size={iconSize} color="black" />
    </TouchableOpacity>
  );
}
