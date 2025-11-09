import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const RecentlyViewed = ({ rooms }) => {
  // show only last 1 or 2 for preview
  const preview = rooms.slice(0, 1);

  return (
    <TouchableOpacity
      style={styles.recentlyViewed}
      onPress={() => router.push("/wishlist/recently-viewed")}
    >
      <View style={styles.row}>
        <Image source={{ uri: preview[0].image }} style={styles.recentImage} />
        <View>
          <Text style={styles.recentTitle}>Recently Viewed</Text>
          <Text style={styles.recentSub}>{rooms.length} rooms</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recentlyViewed: { marginBottom: 20 },
  row: { flexDirection: "row", alignItems: "center" },
  recentImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  recentTitle: { fontSize: 16, fontWeight: "600" },
  recentSub: { fontSize: 14, color: "#666" },
});

export default RecentlyViewed;
