import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function HostCard({ title, subtitle, onPress }) {
  return (
    <TouchableOpacity style={styles.hostCard} onPress={onPress}>
      <Image
        source={{ uri: "https://img.icons8.com/color/96/000000/home.png" }}
        style={styles.hostImage}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.hostTitle}>{title}</Text>
        <Text style={styles.hostSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hostCard: {
    flexDirection: "row", alignItems: "center",
    marginHorizontal: 16, padding: 16, borderRadius: 14,
    backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd",
    marginBottom: 20, gap: 12,
  },
  hostImage: { width: 40, height: 40 },
  hostTitle: { fontSize: 16, fontWeight: "700" },
  hostSubtitle: { fontSize: 12, color: "#777", marginTop: 2 },
});
