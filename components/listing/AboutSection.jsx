import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AboutSection({ text = "" }) {
  const [expanded, setExpanded] = useState(false);
  const preview = text.slice(0, 220);

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>About this sanctuary</Text>
      <Text style={styles.body}>
        {expanded ? text : `${preview.trim()}${text.length > 220 ? "…" : ""}`}
      </Text>

      {text.length > 220 && (
        <TouchableOpacity
          style={styles.showMore}
          onPress={() => setExpanded((s) => !s)}
        >
          <Text style={styles.showMoreText}>{expanded ? "Show less" : "Show more"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 12 },
  heading: { fontWeight: "800", fontSize: 16, marginBottom: 8, color: "#111" },
  body: { color: "#444", lineHeight: 20 },
  showMore: {
    marginTop: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  showMoreText: { fontWeight: "700", color: "#111" },
});
