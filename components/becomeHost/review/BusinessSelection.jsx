import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import stepStyles from "../../../styles/stepStyles";

export default function BusinessSelection({ business, setBusiness }) {
  return (
    <>
      <Text style={stepStyles.sectionTitle}>Are you hosting as a business?</Text>
      <Text style={stepStyles.smallText}>
        Your business is likely registered with your state or government.
      </Text>

      <View style={stepStyles.choiceRow}>
        <TouchableOpacity
          style={[stepStyles.choiceBtn, business === "yes" && stepStyles.choiceActive]}
          onPress={() => setBusiness("yes")}
        >
          <Text style={stepStyles.choiceText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[stepStyles.choiceBtn, business === "no" && stepStyles.choiceActive]}
          onPress={() => setBusiness("no")}
        >
          <Text style={stepStyles.choiceText}>No</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
