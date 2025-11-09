import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SectionRooms() {
  const params = useLocalSearchParams();
  const title = params.title;
  const rooms = params.rooms ? JSON.parse(params.rooms) : [];

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
        rating: room.rating,
        unit: room.unit,
        availableFrom: room.availableFrom,
        images: JSON.stringify([room.image]),
      },
    });
  };

  return (
    <View style={styles.container}>
      
      {/* Header with Back */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={{ width: 30 }} />
      </View>

      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openDetails(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.sub}>{item.subtitle}</Text>
              <Text style={styles.price}>₹{item.price} / {item.unit}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  /* Header */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  backBtn: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 17, fontWeight: "700", color: "#111" },

  /* Room Card */
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
  },
  image: { width: 100, height: 100, borderRadius: 6 },
  info: { flex: 1, paddingLeft: 12, justifyContent: "center" },
  title: { fontSize: 15, fontWeight: "700" },
  sub: { fontSize: 13, color: "#666", marginTop: 2 },
  price: { marginTop: 6, fontSize: 14, fontWeight: "600", color: "#111" },
});
