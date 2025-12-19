import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { transportAPI } from "../../../services/api";
import styles from "../../../styles/transportDetailsStyles";

export default function TransportDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransportDetails();
  }, [id]);

  const loadTransportDetails = async () => {
    try {
      setLoading(true);
      const response = await transportAPI.getById(id);
      if (response.success && response.data) {
        // Transform data to match component format
        const transport = response.data;
        setData({
          id: transport._id || transport.id,
          name: transport.name,
          rating: transport.rating?.count || 0,
          location: transport.location?.city || transport.location || 'Unknown',
          image: transport.image?.url || transport.image || 'https://via.placeholder.com/400',
          phone: transport.phone,
          vehicleTypes: transport.vehicleTypes || [],
        });
      } else {
        Alert.alert('Error', 'Transport service not found');
        router.back();
      }
    } catch (error) {
      console.error('Error loading transport details:', error);
      Alert.alert('Error', 'Failed to load transport details. Please try again.');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading details...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#666' }}>Transport service not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 10 }}>
          <Text style={{ color: '#007BFF' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          {data.vehicleTypes && data.vehicleTypes.length > 0 ? (
            data.vehicleTypes.map((vehicle, index) => (
              <Text key={index} style={styles.priceText}>
                {vehicle.type ? vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1) : 'Vehicle'} 
                {vehicle.capacity ? ` (${vehicle.capacity} capacity)` : ''} 
                {vehicle.pricePerKm ? ` — ₹${vehicle.pricePerKm}/km` : ' — Contact for pricing'}
              </Text>
            ))
          ) : (
            <>
              <Text style={styles.priceText}>Truck 14FT — ₹2500/trip</Text>
              <Text style={styles.priceText}>Tata Ace — ₹800/trip</Text>
              <Text style={styles.priceText}>Lorry 22FT — ₹4500/trip</Text>
            </>
          )}
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
