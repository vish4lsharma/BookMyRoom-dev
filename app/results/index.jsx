import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import BottomNav from "../../components/common/BottomNav";
import { useWishlist } from "../_store/wishlistStore";
import { roomsAPI, wishlistAPI } from "../../services/api";

const { width } = Dimensions.get("window");

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { add, remove, isWishlisted } = useWishlist();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const city = (params.city || "").toString();
  const start = (params.start || "").toString();
  const end = (params.end || "").toString();
  const guests = (params.guests || "").toString();
  const type = (params.type || "Any type").toString();
  
  let reqLabel = [];
  try {
    reqLabel = params.reqLabel ? JSON.parse(params.reqLabel) : [];
  } catch {}

  const selectedReqText =
    reqLabel.length > 0 ? ` • ${reqLabel.slice(0, 2).join(", ")}${reqLabel.length > 2 ? " +" : ""}` : "";

  useEffect(() => {
    loadResults();
  }, [city, params.min, params.max, type, params.req]);

  const loadResults = async () => {
    try {
      setLoading(true);
      
      const searchParams = {
        city: city || undefined,
        minPrice: params.min || undefined,
        maxPrice: params.max || undefined,
        guests: guests || undefined,
        placeType: type !== "Any type" ? type : undefined,
        limit: 50,
      };

      const response = await roomsAPI.getAll(searchParams);
      const rooms = response.data || [];

      // Transform rooms to match component format
      const transformedRooms = rooms.map((room) => ({
        id: room._id || room.id,
        title: room.title,
        subtitle: room.subtitle || room.stayType,
        details: `${room.beds || 1} ${room.beds === 1 ? 'bed' : 'beds'}`,
        availableFrom: room.availableFrom ? new Date(room.availableFrom).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Available now',
        price: room.price?.weekday || room.price || 0,
        unit: room.price?.unit || 'day',
        rating: room.rating?.average || 0,
        image: room.images?.[0]?.url || room.images?.[0] || 'https://via.placeholder.com/400',
        city: room.city,
      }));

      setResults(transformedRooms);
    } catch (error) {
      console.error('Error loading results:', error);
      Alert.alert('Error', 'Failed to load search results. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const validateParams = useCallback(() => {
    const issues = [];
    if (!city) issues.push("Destination");
    if (!start) issues.push("Start date");
    if (!end) issues.push("End date");
    if (issues.length) {
      Alert.alert("Missing info", `Some search details are missing: ${issues.join(", ")}. Using defaults.`);
    }
  }, [city, start, end]);

  React.useEffect(() => validateParams(), [validateParams]);

  const onBack = () => {
    if (router.canGoBack?.()) router.back();
    else router.replace("/search");
  };

  const onFilters = React.useCallback(() => {
    router.push({
      pathname: "/results/filters",
      params: {
        city, start, end, guests,
        type: params.type || "Any type",
        min: params.min || "4400",
        max: params.max || "26253",
        bedrooms: params.bedrooms || "0",
        beds: params.beds || "0",
        bathrooms: params.bathrooms || "0",
        req: params.req || "[]",
        reqLabel: params.reqLabel || "[]",
      },
    });
  }, [router, city, start, end, guests, params.type, params.min, params.max, params.bedrooms, params.beds, params.bathrooms, params.req, params.reqLabel]);

const onCardPress = (item) => {
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
      images: JSON.stringify([item.image]), // support carousel
    },
  });
};



  const toggleWishlist = async (room) => {
    try {
      if (isWishlisted(room.id)) {
        await wishlistAPI.remove(room.id);
        remove(room.id);
      } else {
        await wishlistAPI.add(room.id);
        const normalized = {
          ...room,
          details: Array.isArray(room.details) ? room.details : room.details ? [room.details] : [],
        };
        add(normalized);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      Alert.alert('Error', 'Failed to update wishlist. Please try again.');
    }
  };

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
        <Ionicons name="chevron-back" size={22} color="#111" />
      </TouchableOpacity>

      <View style={styles.searchPill}>
        <Text style={styles.pillTitle} numberOfLines={1}>Rooms in {city}</Text>
        <Text style={styles.pillSubtitle} numberOfLines={1}>
          {start} - {end} {guests ? guests : ""} • {type}{selectedReqText}
        </Text>
      </View>

      <TouchableOpacity style={styles.filterBtn} onPress={onFilters} accessibilityRole="button" accessibilityLabel="Open filters">
        <Ionicons name="options-outline" size={18} color="#111" />
      </TouchableOpacity>
    </View>
  );

  const keyExtractor = (item) => item.id;

  const Card = ({ item }) => {
    const cardWidth = width - 32;
    const imageHeight = Math.min(0.58 * cardWidth, 320);
    const liked = isWishlisted(item.id);

    return (
      <TouchableOpacity style={styles.card} onPress={() => onCardPress(item)} activeOpacity={0.8}>
        <View style={[styles.imageWrap, { height: imageHeight }]}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
          <TouchableOpacity
            style={styles.heart}
            onPress={() => toggleWishlist(item)}
            accessibilityRole="button"
            accessibilityLabel={liked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <AntDesign name={liked ? "heart" : "heart"} size={18} color={liked ? "#ff4d5b" : "#333"} />
          </TouchableOpacity>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <View style={styles.ratingRow}>
              <MaterialIcons name="star-rate" size={16} color="#f5b300" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>
          <Text style={styles.cardMeta} numberOfLines={1}>{Array.isArray(item.details) ? item.details.join(" • ") : item.details}</Text>
          <Text style={styles.cardMeta} numberOfLines={1}>Available from {item.availableFrom}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceText}>₹ {item.price.toLocaleString("en-IN")}</Text>
            <Text style={styles.unitText}> for {item.unit}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => <Card item={item} />;

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        {renderHeader()}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={{ marginTop: 10, color: '#666' }}>Loading results...</Text>
        </View>
        <BottomNav />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {renderHeader()}
      <FlatList
        data={results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        ListFooterComponent={<View style={{ height: 90 }} />}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#666', fontSize: 16 }}>No rooms found</Text>
            <Text style={{ color: '#999', fontSize: 14, marginTop: 5 }}>Try adjusting your filters</Text>
          </View>
        }
      />
      <BottomNav />
    </SafeAreaView>
  );
}

const cardRadius = 16;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff", paddingBottom: 16 },
  headerRow: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12,
    backgroundColor: "#fff", borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#e9eaee", marginTop: 20,
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", marginRight: 6 },
  filterBtn: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", marginLeft: 6 },
  searchPill: {
    flex: 1, backgroundColor: "#f6f7fb", borderRadius: 24, paddingHorizontal: 16, paddingVertical: 8, alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 1,
  },
  pillTitle: { fontSize: 14, fontWeight: "700", color: "#202124" },
  pillSubtitle: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  listContent: { paddingHorizontal: 16, paddingTop: 12 },
  card: { backgroundColor: "#fff", borderRadius: cardRadius, overflow: "hidden", borderWidth: StyleSheet.hairlineWidth, borderColor: "#ececf0" },
  imageWrap: { width: "100%", backgroundColor: "#f2f2f2", borderTopLeftRadius: cardRadius, borderTopRightRadius: cardRadius, overflow: "hidden" },
  image: { width: "100%", height: "100%" },
  heart: {
    position: "absolute", right: 10, top: 10, backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16, width: 32, height: 32, alignItems: "center", justifyContent: "center",
  },
  cardBody: { paddingHorizontal: 12, paddingVertical: 10 },
  titleRow: { flexDirection: "row", alignItems: "center" },
  cardTitle: { flex: 1, fontSize: 14, fontWeight: "700", color: "#111" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  ratingText: { fontSize: 12, color: "#333", marginLeft: 2 },
  cardSubtitle: { fontSize: 12, color: "#5f6368", marginTop: 4 },
  cardMeta: { fontSize: 12, color: "#8d929a", marginTop: 2 },
  priceRow: { flexDirection: "row", alignItems: "flex-end", marginTop: 8 },
  priceText: { fontSize: 14, fontWeight: "700", color: "#111" },
  unitText: { fontSize: 12, color: "#6b7280", marginLeft: 4, marginBottom: 1 },
});
