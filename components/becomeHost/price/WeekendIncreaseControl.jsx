import React from "react";
import { View, Text } from "react-native";
import stepStyles from "../../../styles/stepStyles";

export default function WeekendIncreaseControl({ increasePercent }) {
  return (
    <>
      <View style={stepStyles.rowBetween}>
        <Text style={stepStyles.label}>Weekend Rate Increase</Text>

        <View style={stepStyles.valueBox}>
          <Text style={stepStyles.valueText}>{increasePercent}%</Text>
        </View>
      </View>

      <Text style={stepStyles.tip}>Tip: Try 1%</Text>
    </>
  );
}
