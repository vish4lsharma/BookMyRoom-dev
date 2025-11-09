import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const RECOMMENDED = [
  { key: "washing_machine", label: "Washing machine", icon: "refresh-outline" },
  { key: "self_checkin", label: "Self check-in", icon: "key-outline" },
  { key: "free_parking", label: "Free parking", icon: "car" },
];

const PLACE_TYPES = ["Any type", "Room", "Entire home"];

const REQUIREMENTS = [
  { key: "free_parking", label: "Free Parking", icon: "car-outline" },
  { key: "ac", label: "Air Conditioner", icon: "snow-outline" },
  { key: "wifi", label: "Wifi", icon: "wifi-outline" },
  { key: "kitchen", label: "Kitchen", icon: "restaurant-outline" },
  { key: "workspace", label: "WorkSpace", icon: "briefcase-outline" },
  { key: "iron", label: "Iron", icon: "hardware-chip-outline" },
  { key: "tv", label: "TV", icon: "tv-outline" },
  { key: "washer", label: "Washing Machine", icon: "refresh-outline" },
  { key: "pets", label: "Allows Pets", icon: "paw-outline" },
];

export default function Filters() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const initialReq = useMemo(() => {
    if (!params.req) return [];
    try {
      const parsed = JSON.parse(params.req);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [params.req]);

  const [placeType, setPlaceType] = useState(
    PLACE_TYPES.includes(params.type) ? params.type : "Any type"
  );
  const [minPrice, setMinPrice] = useState(Number(params.min || 4400));
  const [maxPrice, setMaxPrice] = useState(Number(params.max || 26253));
  const [bedrooms, setBedrooms] = useState(Number(params.bedrooms || 0));
  const [beds, setBeds] = useState(Number(params.beds || 0));
  const [bathrooms, setBathrooms] = useState(Number(params.bathrooms || 0));
  const [requirements, setRequirements] = useState(initialReq);

  const toggleReq = (key) => {
    setRequirements((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const dec = (setter, value) => setter(Math.max(0, value - 1));
  const inc = (setter, value) => setter(value + 1);

  const clearAll = () => {
    setPlaceType("Any type");
    setMinPrice(4400);
    setMaxPrice(26253);
    setBedrooms(0);
    setBeds(0);
    setBathrooms(0);
    setRequirements([]);
  };

  const apply = () => {
    if (minPrice > maxPrice) {
      Alert.alert("Invalid price range", "Minimum price cannot exceed maximum.");
      return;
    }
    const reqLabels = REQUIREMENTS.filter((r) => requirements.includes(r.key)).map(
      (r) => r.label
    );

    router.replace({
      pathname: "/results",
      params: {
        ...params,
        type: placeType,
        min: String(minPrice),
        max: String(maxPrice),
        bedrooms: String(bedrooms),
        beds: String(beds),
        bathrooms: String(bathrooms),
        req: JSON.stringify(requirements),
        reqLabel: JSON.stringify(reqLabels),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color="#111" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        <View style={styles.recommendedRow}>
          {RECOMMENDED.map((rec) => {
            const on = requirements.includes(rec.key);
            return (
              <TouchableOpacity
                key={rec.key}
                style={[styles.recItem, on && styles.recItemActive]}
                onPress={() => toggleReq(rec.key)}
              >
                <View style={styles.recIconWrap}>
                  <Ionicons name={rec.icon} size={22} color="#2a7" />
                </View>
                <Text style={styles.recLabel} numberOfLines={1}>
                  {rec.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Type of place</Text>
        <View style={styles.typeRow}>
          {PLACE_TYPES.map((t) => {
            const active = placeType === t;
            return (
              <TouchableOpacity
                key={t}
                style={[styles.typeChip, active && styles.typeChipActive]}
                onPress={() => setPlaceType(t)}
              >
                <Text style={[styles.typeChipText, active && styles.typeChipTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Price Range</Text>
        <View style={styles.priceBar}>
          <View style={styles.priceBarActive} />
          <View style={styles.knobLeft} />
          <View style={styles.knobRight} />
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceBox}>
            <Text style={styles.miniLabel}>Minimum</Text>
            <TouchableOpacity
              onPress={() => setMinPrice(Math.max(0, minPrice - 500))}
              onLongPress={() => setMinPrice(0)}
            >
              <Text style={styles.priceValue}>
                ₹{minPrice.toLocaleString("en-IN")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.miniLabel}>Maximum</Text>
            <TouchableOpacity onPress={() => setMaxPrice(maxPrice + 500)}>
              <Text style={styles.priceValue}>
                ₹{maxPrice.toLocaleString("en-IN")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Rooms and beds</Text>
        <CounterRow
          label="Bedrooms"
          value={bedrooms}
          onDec={() => dec(setBedrooms, bedrooms)}
          onInc={() => inc(setBedrooms, bedrooms)}
        />
        <CounterRow
          label="Beds"
          value={beds}
          onDec={() => dec(setBeds, beds)}
          onInc={() => inc(setBeds, beds)}
        />
        <CounterRow
          label="Bathrooms"
          value={bathrooms}
          onDec={() => dec(setBathrooms, bathrooms)}
          onInc={() => inc(setBathrooms, bathrooms)}
        />

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Requirements</Text>
        <View style={{ marginTop: 6 }}>
          {REQUIREMENTS.map((r) => {
            const on = requirements.includes(r.key);
            return (
              <TouchableOpacity
                key={r.key}
                onPress={() => toggleReq(r.key)}
                style={styles.reqRow}
              >
                <View style={[styles.radio, on && styles.radioOn]}>
                  {on && <View style={styles.radioDot} />}
                </View>
                <Ionicons name={r.icon} size={16} color="#333" style={{ marginRight: 8 }} />
                <Text style={styles.reqLabel}>{r.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={apply}>
          <Text style={styles.applyText}>Showing 100+ Results</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function CounterRow({ label, value, onDec, onInc }) {
  return (
    <View style={styles.counterRow}>
      <Text style={styles.counterLabel}>{label}</Text>
      <View style={styles.stepper}>
        <TouchableOpacity style={styles.stepBtn} onPress={onDec}>
          <Text style={styles.stepSign}>−</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{value || "Any"}</Text>
        <TouchableOpacity style={styles.stepBtn} onPress={onInc}>
          <Text style={styles.stepSign}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const knob = 22;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff",paddingBottom:16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  headerTitle: { flex: 1, fontSize: 30, fontWeight: "700", color: "#111" },
  closeBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
  },
  divider: { height: 1, backgroundColor: "#ececec", marginVertical: 14, marginHorizontal: 16 },
  recommendedRow: { flexDirection: "row", paddingHorizontal: 16, gap: 12 },
  recItem: {
    width: (width - 16 * 2 - 12 * 2) / 3,
    borderWidth: 1,
    borderColor: "#e7e7e7",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  recItemActive: { borderColor: "#111" },
  recIconWrap: {
    width: 56, height: 56, borderRadius: 12, backgroundColor: "#f6f7fb",
    alignItems: "center", justifyContent: "center", marginBottom: 6,
  },
  recLabel: { fontSize: 12, color: "#333", textAlign: "center" },
  typeRow: { flexDirection: "row", paddingHorizontal: 16, gap: 10 },
  typeChip: {
    paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10,
    backgroundColor: "#f6f7fb", borderWidth: 1, borderColor: "#e8e8e8",
  },
  typeChipActive: { backgroundColor: "#000" },
  typeChipText: { fontSize: 14, color: "#444" },
  typeChipTextActive: { color: "#fff", fontWeight: "700" },
  priceBar: {
    height: 6, backgroundColor: "#ddd", marginHorizontal: 16, borderRadius: 4, marginTop: 10,
  },
  priceBarActive: {
    position: "absolute", left: 16, right: width * 0.35, top: 0, bottom: 0, backgroundColor: "#ff4d5b", borderRadius: 4,
  },
  knobLeft: {
    position: "absolute", left: 8, top: -8, width: knob, height: knob, borderRadius: knob / 2, backgroundColor: "#fff", borderWidth: 2, borderColor: "#ccc",
  },
  knobRight: {
    position: "absolute", right: width * 0.35 - 8, top: -8, width: knob, height: knob, borderRadius: knob / 2, backgroundColor: "#fff", borderWidth: 2, borderColor: "#ccc",
  },
  priceRow: { flexDirection: "row", paddingHorizontal: 16, marginTop: 10, gap: 12 },
  priceBox: {
    flex: 1, backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: "#eee", paddingVertical: 12, alignItems: "center",
  },
  miniLabel: { fontSize: 12, color: "#757575", marginBottom: 4 },
  priceValue: { fontSize: 16, fontWeight: "700", color: "#111" },
  counterRow: {
    flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10, justifyContent: "space-between",
  },
  counterLabel: { fontSize: 14, color: "#111" },
  stepper: { flexDirection: "row", alignItems: "center" },
  stepBtn: {
    width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: "#999", alignItems: "center", justifyContent: "center",
  },
  stepSign: { fontSize: 18, color: "#111" },
  counterValue: { width: 50, textAlign: "center", fontSize: 14, color: "#111" },
  reqRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10 },
  radio: {
    width: 16, height: 16, borderRadius: 8, borderWidth: 1, borderColor: "#999", marginRight: 8, alignItems: "center", justifyContent: "center",
  },
  radioOn: { borderColor: "#111" },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#111" },
  reqLabel: { fontSize: 14, color: "#222" },
  footer: {
    position: "absolute", left: 0, right: 0, bottom: 0, paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: "#fff", borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#eaeaea",
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  clearText: { fontSize: 14, color: "#111", textDecorationLine: "underline" },
  applyBtn: { backgroundColor: "#000", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 32 },
  applyText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});
