import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, Text, StyleSheet, StatusBar } from "react-native";
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

export default function ListingDetailsScreen() {
  const params = useLocalSearchParams();
  const addRecent = useRecentStore((state) => state.addRecent);

  const { add, remove, isWishlisted } = useWishlist();

  // ✅ Normalize details
  let rawDetails = params.details;
  let detailsArray = [];

  try {
    detailsArray = Array.isArray(JSON.parse(rawDetails))
      ? JSON.parse(rawDetails)
      : [rawDetails];
  } catch {
    detailsArray = Array.isArray(rawDetails)
      ? rawDetails
      : rawDetails
      ? [rawDetails]
      : [];
  }

  const normalizedDetails = detailsArray.join(" • ");

  // ✅ Images array
  const images = params.images ? JSON.parse(params.images) : [params.image];

  const listing = useMemo(
    () => ({
      id: params.id,
      title: params.title,
      subtitle: params.subtitle,
      price: Number(params.price),
      rating: params.rating,
      city: params.city,
      details: normalizedDetails,
      availableFrom: params.availableFrom,
      unit: params.unit ?? "24 hour",
      reviewsCount: params.reviewsCount ?? 10,
      images,
      highlights: [
        {
          icon: "ribbon-outline",
          title: "Exceptional Ranking",
          desc: "Ranks highly based on guest ratings & reviews.",
        },
        {
          icon: "log-in-outline",
          title: "Seamless Arrival",
          desc: "Smooth check-in experience.",
        },
        {
          icon: "share-outline",
          title: "Shared Living",
          desc: "Private room in a shared home.",
        },
      ],
      about:
        "A cozy and inviting stay perfect for short or long visits. Clean, peaceful, and well-connected to local markets.",
      roomFacts: [{ label: normalizedDetails || "1 bed", value: "", icon: "bed" }],
      amenities: [
        { label: "Wifi", icon: "wifi-outline" },
        { label: "Kitchen", icon: "restaurant-outline" },
        { label: "Private entrance", icon: "lock-closed-outline" },
      ],
      location: {
        title: params.city ?? "Location",
        latitude: 28.5355,
        longitude: 77.391,
      },
      ratingSummary: {
        score: 4.9,
        tags: ["Clean", "Friendly host"],
      },
      topReview: {
        name: "Guest",
        avatar:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=256&q=80",
        ago: "1 month ago",
        stars: 5,
        text: "Great stay! Clean & peaceful environment.",
      },
      host: {
        name: "Your Host",
        avatar:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=256&q=80",
        isSuperhost: true,
        stats: { reviews: 120, rating: 4.9, years: 2 },
        badges: [
          { icon: "chatbubble-ellipses-outline", text: "Speaks English & Hindi" },
          { icon: "home-outline", text: `Lives in ${params.city}` },
        ],
        response: { rate: "100%", time: "within an hour" },
      },
      sections: [
        { title: "Availability", value: "Available Now" },
        {
          title: "House rules",
          value: "Check-in after 3:00pm\nCheckout before 12:00pm\nNo smoking",
        },
        {
          title: "Safety & property",
          value: "CCTV + gated entry",
          showMore: true,
        },
      ],
    }),
    [params]
  );

  const [imagesIdx, setImagesIdx] = useState(0);

  // ✅ Save to Recently Viewed
  useEffect(() => {
    addRecent({
      id: listing.id,
      title: listing.title,
      subtitle: listing.subtitle,
      city: listing.city,
      price: listing.price,
      unit: listing.unit,
      rating: listing.rating,
      image: listing.images[0],
      details: detailsArray,
      availableFrom: listing.availableFrom,
    });
  }, [listing]);

  // ✅ Wishlist handling
  const liked = isWishlisted(listing.id);

  const toggleWishlist = () => {
    const obj = {
      id: listing.id,
      title: listing.title,
      subtitle: listing.subtitle,
      city: listing.city,
      price: listing.price,
      unit: listing.unit,
      rating: listing.rating,
      image: listing.images[0],
      details: detailsArray,
      availableFrom: listing.availableFrom,
    };

    if (liked) remove(listing.id);
    else add(obj);
  };

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
        <ReviewsSection review={listing.topReview} total={9} />
        <HostCard host={listing.host} />
        <InfoList sections={listing.sections} />
      </ScrollView>

      <FooterReserveBar price={listing.price} cta="Reserve" />
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
