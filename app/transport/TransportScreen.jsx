import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../../components/common/BottomNav";
import TransportCard from "../../components/transport/TransportCard";
import styles from "../../styles/transportStyles";
import { useRouter } from "expo-router";
import { transportAPI } from "../../services/api";

export default function TransportScreen() {
  const router = useRouter();
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransports();
  }, []);

  const loadTransports = async () => {
    try {
      setLoading(true);
      const response = await transportAPI.getAll();
      if (response.success && response.data) {
        // Transform data to match component format
        const transformed = response.data.map((item) => ({
          id: item._id || item.id,
          name: item.name,
          rating: item.rating?.count || 0,
          location: item.location?.city || item.location || 'Unknown',
          image: item.image?.url || item.image || 'https://via.placeholder.com/400',
          phone: item.phone,
        }));
        setTransports(transformed);
      }
    } catch (error) {
      console.error('Error loading transports:', error);
      Alert.alert('Error', 'Failed to load transport services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading transport services...</Text>
        <BottomNav />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>

        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.header}>Transport Services</Text>
            <Text style={styles.subHeader}>Popular transport services</Text>
          </View>

          <TouchableOpacity style={styles.filterBtn}
            onPress={() => router.push("transport/FilterScreen")}
          >
            <Ionicons name="options-outline" size={20} color="#111" />
          </TouchableOpacity>
        </View>

        {transports.length > 0 ? (
          transports.map((item) => (
            <TransportCard key={item.id} item={item} />
          ))
        ) : (
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#555', padding: 16 }}>
              No transport services available
            </Text>
          </View>
        )}

      </ScrollView>

      <BottomNav />
    </View>
  );
}
