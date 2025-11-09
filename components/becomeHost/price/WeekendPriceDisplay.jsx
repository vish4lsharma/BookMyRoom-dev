import React from "react";
import { Text } from "react-native";
import stepStyles from "../../../styles/stepStyles";

export default function WeekendPriceDisplay({ weekendPrice }) {
  return (
    <>
      <Text style={stepStyles.bigNumber}>₹{weekendPrice.toLocaleString()}</Text>
      <Text style={stepStyles.smallText}>Guest price before taxes may vary</Text>
    </>
  );
}
