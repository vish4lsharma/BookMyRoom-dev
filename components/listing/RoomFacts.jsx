import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function RoomFacts({ items = [] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Where Serenity Rules</Text>
      <View style={{ flexDirection: "row", gap: 14, marginTop: 10 }}>
        {items.map((it, i) => (
          <View key={i} style={styles.fact}>
            {/* simple square image placeholder; replace with icons if you like */}
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&q=80",
              }}
              style={styles.thumb}
            />
            <Text style={styles.factLabel}>{it.label}</Text>
            <Text style={styles.factValue}>{it.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 16, borderTopWidth: 1, borderColor: "#eee", paddingTop: 12 },
  heading: { fontSize: 16, fontWeight: "800", color: "#111" },
  fact: { width: 84 },
  thumb: { width: 84, height: 84, borderRadius: 12, backgroundColor: "#eee" },
  factLabel: { marginTop: 8, color: "#555", fontSize: 12 },
  factValue: { color: "#111", fontWeight: "700", marginTop: 2 },
});
