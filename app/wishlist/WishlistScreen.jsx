import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ActivityIndicator, Alert } from "react-native";
import RecentlyViewed from "../../components/wishlist/RecentlyViewed";
import WishlistCard from "../../components/wishlist/WishlistCard";
import BottomNav from "../../components/common/BottomNav";
import styles from "../../styles/wishlistStyles";
import { wishlistAPI } from "../../services/api";
import { useWishlist } from "../_store/wishlistStore"; 
import { useRecentStore } from "../_store/recentStore";

const WishlistScreen = () => {
  const { list, remove, add } = useWishlist();
  const recent = useRecentStore((state) => state.recent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistAPI.getAll();
      if (response.success && response.data) {
        // Update local store with API data
        response.data.forEach(room => {
          const normalized = {
            id: room._id || room.id,
            title: room.title,
            subtitle: room.subtitle,
            price: room.price?.weekday || room.price,
            unit: room.price?.unit || 'day',
            rating: room.rating?.average || 0,
            image: room.images?.[0]?.url || room.images?.[0],
            city: room.city,
          };
          add(normalized);
        });
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      Alert.alert('Error', 'Failed to load wishlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (roomId) => {
    try {
      await wishlistAPI.remove(roomId);
      remove(roomId);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      Alert.alert('Error', 'Failed to remove from wishlist. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading wishlist...</Text>
        <BottomNav />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlists</Text>

      {recent.length > 0 && <RecentlyViewed rooms={recent} />}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {list.length > 0 ? (
          list.map((room) => (
            <WishlistCard key={room.id} room={room} onToggleHeart={() => handleRemove(room.id)} />
          ))
        ) : (
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#555", padding: 16 }}>
              You have not added any rooms to your wishlist yet.
            </Text>
          </View>
        )}
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default WishlistScreen;
