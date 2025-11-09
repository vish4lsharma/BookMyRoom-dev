import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useWishlist } from "../../app/_store/wishlistStore";

const WishlistCard = ({ room }) => {
  const { remove, isWishlisted } = useWishlist();
  const liked = isWishlisted(room.id);

  const onToggleHeart = () => {
    remove(room.id); // Since item is already liked in wishlist
  };

  const openDetails = () => {
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
        images: JSON.stringify([room.image]), // support gallery
      },
    });
  };

  const detailsArray = Array.isArray(room.details)
    ? room.details
    : room.details
    ? [room.details]
    : [];

  return (
    <TouchableOpacity style={styles.card} onPress={openDetails} activeOpacity={0.85}>
      <Image source={{ uri: room.image }} style={styles.roomImage} />

      {/* ❤️ Remove from wishlist */}
      <TouchableOpacity style={styles.heartIcon} onPress={onToggleHeart}>
        <AntDesign name={liked ? "heart" : "hearto"} size={22} color="#ff4d5b" />
      </TouchableOpacity>

      <View style={styles.cardContent}>
        <Text style={styles.roomTitle} numberOfLines={1}>
          {room.title}
        </Text>

        {detailsArray.map((d, i) => (
          <Text key={i} style={styles.roomDetails} numberOfLines={1}>
            {d}
          </Text>
        ))}

        <View style={styles.rowBetween}>
          <Text style={styles.price}>₹ {room.price.toLocaleString("en-IN")}</Text>

          <View style={styles.row}>
            <Ionicons name="star" size={16} color="#f5b300" />
            <Text style={styles.rating}>{room.rating ?? "—"}</Text>
          </View>
        </View>

        <TextInput placeholder="Add notes" style={styles.input} placeholderTextColor="#999" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    marginBottom: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#eee",
  },
  roomImage: { width: "100%", height: 200, backgroundColor: "#f2f2f2" },
  heartIcon: { position: "absolute", top: 10, right: 10 },
  cardContent: { padding: 12 },
  roomTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6, color: "#111" },
  roomDetails: { fontSize: 14, color: "#666" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  row: { flexDirection: "row", alignItems: "center" },
  price: { fontSize: 15, fontWeight: "600", color: "#000" },
  rating: { marginLeft: 4, fontSize: 14, color: "#444" },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    color: "#111",
  },
});

export default WishlistCard;
