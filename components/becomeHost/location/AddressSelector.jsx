// components/becomeHost/location/AddressSelector.jsx
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import stepStyles from "../../../styles/stepStyles";

export default function AddressSelector({ selectedAddress, onPress }) {
  return (
    <TouchableOpacity style={stepStyles.searchContainer} onPress={onPress}>
      <Ionicons name="location-outline" size={20} color="#555" />
      <Text style={[stepStyles.searchInput, { flex: 1 }]}>
        {selectedAddress?.trim() !== "" ? selectedAddress : "Enter your address"}
      </Text>
    </TouchableOpacity>
  );
}
