import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/transportStyles";
import { useRouter } from "expo-router";

export default function TransportCard({ item }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push(`/transport/details/${item.id}`)} // ✅ Navigate to Details Page
    >
      {/* Company Image */}
      <Image source={{ uri: item.image }} style={styles.cardImage} />

      {/* Right Side */}
      <View style={styles.cardRight}>
        <Text style={styles.cardTitle}>{item.name}</Text>

        {/* Ratings */}
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color="gold" />
          <Text style={styles.ratingText}>{item.rating} Ratings</Text>
        </View>

        {/* Location */}
        <Text style={styles.locationText}>{item.location}</Text>

        {/* Call Button */}
        <TouchableOpacity
          style={styles.callBtn}
          onPress={() => Linking.openURL(`tel:${item.phone}`)}
        >
          <Text style={styles.callBtnText}>Call Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
