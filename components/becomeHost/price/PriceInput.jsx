import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import stepStyles from "../../../styles/stepStyles";

export default function PriceInput({ price, onChange }) {
  return (
    <>
      <View style={stepStyles.priceWrapper}>
        <Text style={stepStyles.currency}>₹</Text>

        <TextInput
          style={stepStyles.priceInput}
          value={price}
          onChangeText={onChange}
          keyboardType="numeric"
        />

        <TouchableOpacity>
          <Ionicons name="pencil-outline" size={22} color="#111" />
        </TouchableOpacity>
      </View>

      <Text style={stepStyles.priceNote}>
        Guest price before taxes ₹
        {price ? (parseInt(price.replace(/,/g, "")) + 250).toLocaleString("en-IN") : "0"}
      </Text>
    </>
  );
}
