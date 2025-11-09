import React, { useMemo, useCallback } from "react";
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
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import BottomNav from "../../components/common/BottomNav";
import { useWishlist } from "../_store/wishlistStore";

const { width } = Dimensions.get("window");

const MOCK_RESULTS = [
  {
    id: "1",
    city: "Bareilly",
    title: "Private room in Bareilly",
    subtitle: "Ground-floor Room",
    details: "1 double bed",
    availableFrom: "20 Aug",
    price: 1000,
    unit: "24 hour",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "2",
    city: "Bareilly",
    title: "Cozy budget stay",
    subtitle: "1BHK Apartment",
    details: "1 double bed",
    availableFrom: "18 Aug",
    price: 1200,
    unit: "24 hour",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "3",
    city: "Bareilly",
    title: "Sunlit private room",
    subtitle: "Shared Apartment",
    details: "1 queen bed",
    availableFrom: "22 Aug",
    price: 900,
    unit: "24 hour",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { add, remove, isWishlisted } = useWishlist();

  const city = (params.city || "Bareilly").toString();
  const start = (params.start || "1 Sep").toString();
  const end = (params.end || "1 Dec").toString();
  const guests = (params.guests || "Add Adults").toString();

  const type = (params.type || "Any type").toString();
  let reqLabel = [];
  try {
    reqLabel = params.reqLabel ? JSON.parse(params.reqLabel) : [];
  } catch {}

  const selectedReqText =
    reqLabel.length > 0 ? ` • ${reqLabel.slice(0, 2).join(", ")}${reqLabel.length > 2 ? " +" : ""}` : "";

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

  const filtered = useMemo(() => {
    const min = Number(params.min || 0);
    const max = Number(params.max || Number.MAX_SAFE_INTEGER);
    const reqKeys = (() => {
      try { return params.req ? JSON.parse(params.req) : []; } catch { return []; }
    })();

    return MOCK_RESULTS.filter((r) => {
      const priceOk = r.price >= min && r.price <= max;
      const typeOk =
        type === "Any type" ||
        (type === "Room" && r.subtitle?.toLowerCase().includes("room")) ||
        (type === "Entire home" && r.subtitle?.toLowerCase().includes("entire"));
      // Placeholder: requirements not strictly enforced in mock
      const reqOk = true;
      return priceOk && typeOk && reqOk;
    });
  }, [params.min, params.max, type, params.req]);

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



  const toggleWishlist = (room) => {
    const normalized = {
      ...room,
      details: Array.isArray(room.details) ? room.details : room.details ? [room.details] : [],
    };
    if (isWishlisted(room.id)) remove(room.id);
    else add(normalized);
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

  return (
    <SafeAreaView style={styles.safe}>
      {renderHeader()}
      <FlatList
        data={filtered}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        ListFooterComponent={<View style={{ height: 90 }} />}
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
