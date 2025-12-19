import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator, Text, Alert } from "react-native";
import BottomNav from "../../components/common/BottomNav";
import SearchBar from "../../components/explore/SearchBar";
import TopTabs from "../../components/explore/TopTabs";
import SectionsList from "../../components/explore/SectionsList";
import styles from "../../styles/exploreStyles";
import { useWishlist } from "../_store/wishlistStore";
import { roomsAPI } from "../../services/api";

const ExploreScreen = ({ navigation }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch featured rooms
      const featuredResponse = await roomsAPI.getFeatured();
      const featuredRooms = featuredResponse.data || [];

      // Fetch all rooms (limit to 20)
      const allRoomsResponse = await roomsAPI.getAll({ limit: 20 });
      const allRooms = allRoomsResponse.data || [];

      // Transform rooms to match component format
      const transformRoom = (room) => ({
        id: room._id || room.id,
        title: room.title,
        subtitle: room.subtitle || room.stayType,
        details: `${room.beds || 1} ${room.beds === 1 ? 'bed' : 'beds'}`,
        availableFrom: room.availableFrom ? new Date(room.availableFrom).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Available now',
        price: room.price?.weekday || room.price || 0,
        unit: room.price?.unit || 'day',
        displayPrice: `₹${room.price?.weekday || room.price || 0}/${room.price?.unit || 'day'}`,
        rating: String(room.rating?.average || 0),
        image: room.images?.[0]?.url || room.images?.[0] || 'https://via.placeholder.com/400',
        city: room.city,
      });

      // Create sections
      const recommendedSection = {
        id: "recommended",
        title: "Recommended Rooms",
        data: featuredRooms.map(transformRoom),
      };

      // Group rooms by city
      const roomsByCity = {};
      allRooms.forEach(room => {
        const city = room.city || 'Other';
        if (!roomsByCity[city]) {
          roomsByCity[city] = [];
        }
        roomsByCity[city].push(transformRoom(room));
      });

      // Create city sections
      const citySections = Object.entries(roomsByCity).map(([city, rooms]) => ({
        id: city.toLowerCase().replace(/\s+/g, '-'),
        title: `${city} stays`,
        data: rooms,
      }));

      setSections([recommendedSection, ...citySections]);
    } catch (err) {
      console.error('Error loading rooms:', err);
      setError(err.message || 'Failed to load rooms');
      Alert.alert('Error', 'Failed to load rooms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading rooms...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#ff4d5b', marginBottom: 10 }}>{error}</Text>
        <Text style={{ color: '#007BFF' }} onPress={loadRooms}>Tap to retry</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar />
      <TopTabs />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionsList sections={sections} styles={styles} />
      </ScrollView>
      <BottomNav active="Explore" navigation={navigation} />
    </View>
  );
};

export default ExploreScreen;
