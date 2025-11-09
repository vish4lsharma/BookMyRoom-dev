import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ReviewsSection({ review, total = 0 }) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image source={{ uri: review.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.stars}>★★★★★</Text>
          <Text style={styles.ago}>— {review.ago}</Text>
        </View>
      </View>

      <Text style={styles.text} numberOfLines={3}>
        {review.text}
      </Text>

      <View style={{ marginTop: 8 }}>
        <Text style={styles.author}>— {review.name}</Text>
        <Text style={styles.sub}>2 months on Airbnb</Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Show all {total} reviews</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 16, borderTopWidth: 1, borderColor: "#eee", paddingTop: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#eee" },
  stars: { fontWeight: "800", color: "#111" },
  ago: { color: "#777", fontSize: 12 },
  text: { marginTop: 10, color: "#111", lineHeight: 18 },
  author: { marginTop: 6, fontWeight: "700", color: "#111" },
  sub: { color: "#777", fontSize: 12 },
  btn: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 12,
  },
  btnText: { fontWeight: "700", color: "#111" },
});
