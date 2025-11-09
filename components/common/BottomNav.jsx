import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

const BottomNav = () => {
  const pathname = usePathname(); // Get current active route

  const isActive = (path) => pathname === path;

  return (
    <View style={styles.navBar}>

      <TouchableOpacity style={styles.item} onPress={() => router.replace("explore/ExploreScreen")}>
        <Ionicons name="search" size={22} color={isActive("/explore/ExploreScreen") ? "#007AFF" : "#777"} />
        <Text style={[styles.label, isActive("/explore/ExploreScreen") && styles.active]}>Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.replace("wishlist/WishlistScreen")}>
        <Ionicons name="heart-outline" size={22} color={isActive("/wishlist/WishlistScreen") ? "#007AFF" : "#777"} />
        <Text style={[styles.label, isActive("/wishlist/WishlistScreen") && styles.active]}>Wishlist</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.replace("transport/TransportScreen")}>
        <Ionicons name="car-outline" size={22} color={isActive("/transport/TransportScreen") ? "#007AFF" : "#777"} />
        <Text style={[styles.label, isActive("/transport/TransportScreen") && styles.active]}>Transport</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.replace("/messages/messages")}>
        <Ionicons name="chatbubble-outline" size={22} color={isActive("/messages/messages") ? "#007AFF" : "#777"} />
        <Text style={[styles.label, isActive("/messages/messages") && styles.active]}>Message</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.replace("/profile/profileScreen")}>
        <Ionicons name="person-outline" size={22} color={isActive("/profile/profileScreen") ? "#007AFF" : "#777"} />
        <Text style={[styles.label, isActive("/profile/profileScreen") && styles.active]}>Profile</Text>
      </TouchableOpacity>

    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  item: { alignItems: "center" },
  label: { fontSize: 11, marginTop: 2, color: "#777" },
  active: { color: "#007AFF", fontWeight: "600" },
});
