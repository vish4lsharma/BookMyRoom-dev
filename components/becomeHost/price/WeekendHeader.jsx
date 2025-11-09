import React from "react";
import { View, Text } from "react-native";
import stepStyles from "../../../styles/stepStyles";

export default function WeekendHeader() {
  return (
    <>
      <View style={stepStyles.headerRow}>
        <Text style={stepStyles.headerBtn}>Save & exit</Text>
        <Text style={stepStyles.headerBtn}>Questions?</Text>
      </View>

      <Text style={stepStyles.sectionTitle}>Choose Your{"\n"}Weekend Rate</Text>
      <Text style={stepStyles.smallText}>
        Add a special price for Friday and Saturday stays.
      </Text>
    </>
  );
}
