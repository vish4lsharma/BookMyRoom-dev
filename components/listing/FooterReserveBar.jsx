import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function FooterReserveBar({ price = 0, cta = "Reserve", onPress }) {
  return (
    <View style={styles.wrap}>
      <View>
        <Text style={styles.price}>₹ {price.toLocaleString()}</Text>
        <Text style={styles.unit}>for 24 hours</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>{cta}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0, right: 0, bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  price: { fontWeight: "900", fontSize: 18, color: "#111" },
  unit: { color: "#777", marginTop: 2, fontSize: 12 },
  btn: { backgroundColor: "#FF385C", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999 },
  btnText: { color: "#fff", fontWeight: "800" },
});
