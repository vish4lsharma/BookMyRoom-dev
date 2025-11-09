import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useWishlist } from "../../app/_store/wishlistStore";

export default function RoomCard({ item, styles }) {
  const { add, remove, isWishlisted } = useWishlist();
  const liked = isWishlisted(item.id);

  // Toggle wishlist
  const toggleWishlist = () => {
    const normalized = {
      ...item,
      details: Array.isArray(item.details)
        ? item.details
        : item.details
        ? [item.details]
        : [],
    };

    if (liked) remove(item.id);
    else add(normalized);
  };

  // Open listing details
  const openDetails = () => {
    router.push({
      pathname: "/listing/[id]",
      params: {
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        details: item.details,
        city: item.city,
        price: item.price,
        unit: item.unit,
        rating: item.rating,
        availableFrom: item.availableFrom,
        images: JSON.stringify([item.image]), // support gallery
      },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={openDetails} activeOpacity={0.85}>
      <View style={styles.cardImageWrapper}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        {/* ❤️ Wishlist Button */}
        <TouchableOpacity style={styles.heartBtn} onPress={toggleWishlist}>
          <AntDesign
            name={liked ? "heart" : "heart"}
            size={18}
            color={liked ? "#ff4d5b" : "#333"}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.cardPrice}>₹{item.price} / {item.unit}</Text>

      <View style={styles.ratingRow}>
        <Ionicons name="star" size={14} color="gold" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );
}
