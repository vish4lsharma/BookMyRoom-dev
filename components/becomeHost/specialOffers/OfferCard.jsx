import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import stepStyles from "../../../styles/stepStyles";

export default function OfferCard({ item, selectedOffer, setSelectedOffer }) {
  return (
    <TouchableOpacity
      style={[
        stepStyles.offerCard,
        selectedOffer === item.id && stepStyles.offerCardActive
      ]}
      onPress={() => setSelectedOffer(item.id)}
    >
      <View style={stepStyles.cardLeft}>
        <View style={stepStyles.percentBox}>
          <Text style={stepStyles.percentText}>{item.percent}</Text>
        </View>

        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={stepStyles.offerTitle}>{item.title}</Text>
          <Text style={stepStyles.offerDesc}>{item.desc}</Text>
        </View>
      </View>

      <Ionicons
        name={selectedOffer === item.id ? "checkbox" : "square-outline"}
        size={24}
        color="#111"
      />
    </TouchableOpacity>
  );
}
