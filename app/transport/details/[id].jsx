import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { transportData } from "../data/transportData";
import styles from "../../../styles/transportDetailsStyles";

export default function TransportDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const data = transportData.find(item => item.id == id);

  if (!data) return <Text>Data not found</Text>;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Details</Text>
          <View style={{ width: 30 }} />
        </View>

        {/* Image */}
        <Image source={{ uri: data.image }} style={styles.mainImage} />

        {/* Title */}
        <Text style={styles.name}>{data.name}</Text>

        {/* Rating & Location */}
        <View style={styles.row}>
          <Ionicons name="star" size={18} color="gold" />
          <Text style={styles.ratingText}>{data.rating} Ratings</Text>
        </View>
        <Text style={styles.location}>{data.location}</Text>

        {/* Services Section */}
        <Text style={styles.sectionTitle}>Services Provided</Text>
        <View style={styles.serviceList}>
          <Text style={styles.serviceItem}>✅ House Shifting</Text>
          <Text style={styles.serviceItem}>✅ Industrial Goods Transport</Text>
          <Text style={styles.serviceItem}>✅ Goods Loading & Unloading</Text>
          <Text style={styles.serviceItem}>✅ Local / Outstation Transport</Text>
        </View>

        {/* Pricing Section */}
        <Text style={styles.sectionTitle}>Vehicle & Pricing</Text>
        <View style={styles.priceBox}>
          <Text style={styles.priceText}>Truck 14FT — ₹2500/trip</Text>
          <Text style={styles.priceText}>Tata Ace — ₹800/trip</Text>
          <Text style={styles.priceText}>Lorry 22FT — ₹4500/trip</Text>
        </View>

        {/* Contact & Call Button */}
        <TouchableOpacity
          style={styles.callBtn}
          onPress={() => Linking.openURL(`tel:${data.phone}`)}
        >
          <Ionicons name="call" size={18} color="#fff" />
          <Text style={styles.callBtnText}>Call Now</Text>
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}
