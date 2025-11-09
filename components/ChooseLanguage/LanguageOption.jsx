import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RadioButton from "./RadioButton";

export default function LanguageOption({
  label,
  subLabel,
  symbol,
  isSelected,
  onPress,
  styles,
}) {
  return (
    <TouchableOpacity
      style={[styles.languageOption, isSelected && styles.selectedOption]}
      onPress={onPress}
    >
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.languageText}>{label}</Text>
          {subLabel && <Text style={styles.subText}>{subLabel}</Text>}
        </View>

        <View style={styles.rowCenter}>
          <Text style={[styles.languageSymbol, isSelected && styles.selectedSymbol]}>
            {symbol}
          </Text>
          <RadioButton selected={isSelected} styles={styles} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
