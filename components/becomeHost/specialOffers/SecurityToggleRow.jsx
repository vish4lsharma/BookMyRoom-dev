import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import stepStyles from "../../../styles/stepStyles";

export default function SecurityToggleRow({ label, value, toggle }) {
  return (
    <TouchableOpacity style={stepStyles.securityRow} onPress={toggle}>
      <Text style={stepStyles.securityText}>{label}</Text>
      <Ionicons
        name={value ? "checkbox" : "square-outline"}
        size={24}
        color="#111"
      />
    </TouchableOpacity>
  );
}
