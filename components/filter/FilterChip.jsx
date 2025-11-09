import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/filterStyles";

export default function FilterChip({ label, icon, isSelected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.chipSelected]}
      onPress={onPress}
    >
      {icon && <Ionicons name={icon} size={16} color={isSelected ? "#fff" : "#444"} style={{ marginRight: 6 }} />}
      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
