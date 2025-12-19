import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, Text, StyleSheet, StatusBar, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";

import HeaderCarousel from "../../components/listing/HeaderCarousel";
import TopActions from "../../components/listing/TopActions";
import Highlights from "../../components/listing/Highlights";
import AboutSection from "../../components/listing/AboutSection";
import RoomFacts from "../../components/listing/RoomFacts";
import AmenitiesSection from "../../components/listing/AmenitiesSection";
import LocationMap from "../../components/listing/LocationMap";
import RatingSummary from "../../components/listing/RatingSummary";
import ReviewsSection from "../../components/listing/ReviewsSection";
import HostCard from "../../components/listing/HostCard";
import InfoList from "../../components/listing/InfoList";
import FooterReserveBar from "../../components/listing/FooterReserveBar";

import { useRecentStore } from "../_store/recentStore";
import { useWishlist } from "../_store/wishlistStore";
import { roomsAPI, reviewsAPI, wishlistAPI } from "../../services/api";

export default function ListingDetailsScreen() {
  const params = useLocalSearchParams();
  const addRecent = useRecentStore((state) => state.addRecent);
  const { add, remove, isWishlisted } = useWishlist();
  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadListing();
  }, [params.id]);

  const loadListing = async () => {
    try {
      setLoading(true);
      const roomId = params.id;
      
      // Fetch room details
      const roomResponse = await roomsAPI.getById(roomId);
      if (!roomResponse.success) {
        throw new Error('Room not found');
      }
      
      const room = roomResponse.data;
      
      // Fetch reviews
      const reviewsResponse = await reviewsAPI.getByRoom(roomId);
      const roomReviews = reviewsResponse.data || [];

      // Transform room data
      const transformedListing = {
        id: room._id || room.id,
        title: room.title,
        subtitle: room.subtitle || room.stayType,
        price: room.price?.weekday || room.price || 0,
        rating: room.rating?.average || 0,
        city: room.city,
        details: `${room.beds || 1} ${room.beds === 1 ? 'bed' : 'beds'}`,
        availableFrom: room.availableFrom ? new Date(room.availableFrom).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Available now',
        unit: room.price?.unit || 'day',
        reviewsCount: room.rating?.count || roomReviews.length,
        images: room.images?.map(img => img.url) || [room.images?.[0]] || ['https://via.placeholder.com/400'],
        highlights: room.highlights?.map(h => ({
          icon: "ribbon-outline",
          title: h,
          desc: "",
        })) || [
          {
            icon: "ribbon-outline",
            title: "Exceptional Ranking",
            desc: "Ranks highly based on guest ratings & reviews.",
          },
        ],
        about: room.description || "A cozy and inviting stay perfect for short or long visits.",
        roomFacts: [
          { label: `${room.beds || 1} ${room.beds === 1 ? 'bed' : 'beds'}`, value: "", icon: "bed" },
          { label: `${room.bedrooms || 0} ${room.bedrooms === 1 ? 'bedroom' : 'bedrooms'}`, value: "", icon: "home" },
          { label: `${room.bathrooms || 0} ${room.bathrooms === 1 ? 'bathroom' : 'bathrooms'}`, value: "", icon: "water" },
        ],
        amenities: room.amenities?.map(a => ({
          label: a,
          icon: "checkmark-circle-outline",
        })) || [],
        location: {
          title: room.city || "Location",
          latitude: room.address?.coordinates?.latitude || 28.5355,
          longitude: room.address?.coordinates?.longitude || 77.391,
        },
        ratingSummary: {
          score: room.rating?.average || 0,
          tags: roomReviews.slice(0, 3).flatMap(r => r.tags || []),
        },
        topReview: roomReviews[0] ? {
          name: roomReviews[0].guest?.name || "Guest",
          avatar: roomReviews[0].guest?.avatar || "https://via.placeholder.com/100",
          ago: new Date(roomReviews[0].createdAt).toLocaleDateString(),
          stars: roomReviews[0].rating?.overall || 5,
          text: roomReviews[0].comment || "Great stay!",
        } : null,
        host: {
          name: room.host?.name || "Host",
          avatar: room.host?.avatar || "https://via.placeholder.com/100",
          isSuperhost: false,
          stats: { reviews: roomReviews.length, rating: room.rating?.average || 0, years: 1 },
          badges: [
            { icon: "home-outline", text: `Lives in ${room.city}` },
          ],
          response: { rate: "100%", time: "within an hour" },
        },
        sections: [
          { title: "Availability", value: room.availableFrom ? `Available from ${new Date(room.availableFrom).toLocaleDateString()}` : "Available Now" },
          {
            title: "House rules",
            value: room.bookingPreferences?.checkInTime ? `Check-in after ${room.bookingPreferences.checkInTime}\nCheckout before ${room.bookingPreferences.checkOutTime || '12:00pm'}` : "Standard check-in/checkout",
          },
        ],
      };

      setListing(transformedListing);
      setReviews(roomReviews);

      // Add to recently viewed
      addRecent({
        id: transformedListing.id,
        title: transformedListing.title,
        subtitle: transformedListing.subtitle,
        city: transformedListing.city,
        price: transformedListing.price,
        unit: transformedListing.unit,
        rating: transformedListing.rating,
        image: transformedListing.images[0],
        details: transformedListing.details,
        availableFrom: transformedListing.availableFrom,
      });
    } catch (error) {
      console.error('Error loading listing:', error);
      Alert.alert('Error', 'Failed to load room details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const [imagesIdx, setImagesIdx] = useState(0);

  // Wishlist handling
  const liked = listing ? isWishlisted(listing.id) : false;

  const handleReserve = () => {
    // Navigate to booking screen or show booking modal
    Alert.alert('Reserve', 'Booking functionality will be implemented');
  };

  const toggleWishlist = async () => {
    if (!listing) return;

    try {
      if (liked) {
        await wishlistAPI.remove(listing.id);
        remove(listing.id);
      } else {
        await wishlistAPI.add(listing.id);
        const obj = {
          id: listing.id,
          title: listing.title,
          subtitle: listing.subtitle,
          city: listing.city,
          price: listing.price,
          unit: listing.unit,
          rating: listing.rating,
          image: listing.images[0],
          details: listing.details,
          availableFrom: listing.availableFrom,
        };
        add(obj);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      Alert.alert('Error', 'Failed to update wishlist. Please try again.');
    }
  };

  if (loading || !listing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading room details...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="light-content" />

      <HeaderCarousel images={listing.images} index={imagesIdx} onIndexChange={setImagesIdx} />

      {/* ✅ Top Header with Back + Wishlist */}
      <TopActions onHeartPress={toggleWishlist} liked={liked} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.subtitle}>{listing.subtitle}</Text>

        <View style={styles.inlineRow}>
          <Text style={styles.inlineText}>⭐ {listing.rating}</Text>
          <Text style={styles.dot}> • </Text>
          <Text style={styles.inlineText}>{listing.reviewsCount} reviews</Text>
        </View>

        <Highlights items={listing.highlights} />
        <AboutSection text={listing.about} />
        <RoomFacts items={listing.roomFacts} />
        <AmenitiesSection items={listing.amenities} totalCount={17} />
        <LocationMap location={listing.location} />
        <RatingSummary data={listing.ratingSummary} />
        <ReviewsSection review={listing.topReview} total={reviews.length} />
        <HostCard host={listing.host} />
        <InfoList sections={listing.sections} />
      </ScrollView>

      <FooterReserveBar price={listing.price} cta="Reserve" onPress={handleReserve} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 110 },
  title: { fontSize: 22, fontWeight: "800", marginTop: 12, color: "#111" },
  subtitle: { marginTop: 6, color: "#666", lineHeight: 18 },
  inlineRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  inlineText: { color: "#222", fontWeight: "600" },
  dot: { color: "#999" },
});
