import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * If you already use react-native-maps, replace the Image with <MapView> etc.
 */
export default function LocationMap({ location }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Where you'll be</Text>
      <Text style={styles.sub}>{location.title}</Text>

      <View style={{ position: "relative", marginTop: 10 }}>
        <Image
          source={{
            uri: "https://maps.gstatic.com/tactile/basepage/pegman_sherlock.png", // placeholder
          }}
          style={styles.map}
        />
        <View style={styles.pinWrap}>
          <Ionicons name="home" size={20} color="#111" />
        </View>

        <TouchableOpacity style={styles.mapAction}>
          <Ionicons name="options-outline" size={18} color="#111" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 18 },
  heading: { fontWeight: "800", fontSize: 16, color: "#111" },
  sub: { color: "#777", marginTop: 6 },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#e5e5e5",
  },
  pinWrap: {
    position: "absolute",
    left: "46%",
    top: "38%",
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#ffffffee",
    alignItems: "center",
    justifyContent: "center",
  },
  mapAction: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 2,
  },
});

