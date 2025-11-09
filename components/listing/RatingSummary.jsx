import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RatingSummary({ data }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.score}>🏆 {data.score.toFixed(1)} 🏆</Text>
      <Text style={styles.caption}>Rated {data.score.toFixed(1)} out of 5</Text>
      <Text style={styles.small}>
        Based on 0 reviews from Airbnb guests. All reviews are verified for
        authenticity.
      </Text>

      <View style={styles.chipsRow}>
        {data.tags.map((t, i) => (
          <View key={i} style={styles.chip}>
            <Text style={styles.chipText}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", paddingVertical: 18 },
  score: { fontSize: 28, fontWeight: "800", color: "#111" },
  caption: { marginTop: 6, fontWeight: "700", color: "#111" },
  small: { marginTop: 6, color: "#666", textAlign: "center", paddingHorizontal: 8 },
  chipsRow: { flexDirection: "row", marginTop: 10, gap: 8 },
  chip: { backgroundColor: "#f2f2f2", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipText: { fontWeight: "700", color: "#111", fontSize: 12 },
});
