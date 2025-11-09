import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRecentStore } from "../_store/recentStore";

export default function RecentlyViewedScreen() {
  const { recent, removeRecent } = useRecentStore();

  const openDetails = (room) => {
    router.push({
      pathname: "/listing/[id]",
      params: {
        id: room.id,
        title: room.title,
        subtitle: room.subtitle,
        city: room.city,
        details: JSON.stringify(room.details),
        price: room.price,
        unit: room.unit,
        rating: room.rating,
        availableFrom: room.availableFrom,
        images: JSON.stringify([room.image]),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recently Viewed</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={recent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => openDetails(item)} style={{ flex: 1, flexDirection: "row" }}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Text style={styles.price}>₹ {item.price} / {item.unit}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removeRecent(item.id)} style={styles.removeBtn}>
              <Ionicons name="close" size={20} color="#111" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row", alignItems: "center",
    padding: 16, borderBottomWidth: 1, borderColor: "#eee"
  },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 17, fontWeight: "700" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    alignItems: "center",
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 10 },
  title: { fontSize: 15, fontWeight: "700" },
  subtitle: { fontSize: 13, color: "#666", marginTop: 2 },
  price: { fontSize: 15, fontWeight: "600", marginTop: 6 },
  removeBtn: { padding: 10 },
});
