import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import stepStyles from "../../../styles/stepStyles";

export default function BookingOptionCard({ title, subtitle, icon, active, onPress, highlighted }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[stepStyles.selectCard, active && stepStyles.activeCard]}
    >
      <View style={stepStyles.rowBetween}>
        <Text style={stepStyles.cardTitle}>{title}</Text>
        <Ionicons name={icon} size={22} color="#111" />
      </View>

      {highlighted && <Text style={stepStyles.recommendedLabel}>Recommended</Text>}

      <Text style={stepStyles.cardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}
