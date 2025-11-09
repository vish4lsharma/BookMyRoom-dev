import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import stepStyles from "../../../styles/stepStyles";

export default function StepFooter({ onBack, onNext, nextLabel = "Next", disabled = false }) {
  return (
    <View style={stepStyles.footer}>
      {onBack && (
        <TouchableOpacity onPress={onBack}>
          <Text style={stepStyles.backText}>Back</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[stepStyles.nextButton, disabled && { backgroundColor: "#ccc" }]}
        onPress={onNext}
        disabled={disabled}
      >
        <Text style={stepStyles.nextText}>{nextLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
