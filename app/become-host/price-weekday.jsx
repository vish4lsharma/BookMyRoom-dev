import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import StepProgress from "../../components/becomeHost/common/StepProgress";
import StepFooter from "../../components/becomeHost/common/StepFooter";
import stepStyles from "../../styles/stepStyles";

export default function PriceWeekday() {
  const router = useRouter();

  const [price, setPrice] = useState("1769");

  const formatPrice = (value) => {
    const clean = value.replace(/[^0-9]/g, "");
    return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (text) => setPrice(formatPrice(text));

  return (
    <Pressable style={stepStyles.container} onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>

        {/* ---------- TOP CONTENT ---------- */}
        <View>
          <View style={stepStyles.headerRow}>
            <Text style={stepStyles.headerBtn}>Save & exit</Text>
            <Text style={stepStyles.headerBtn}>Questions?</Text>
          </View>

          <Text style={stepStyles.sectionTitle}>Now, set a weekday base price</Text>
          <Text style={stepStyles.smallText}>
            Tip: ₹{price || "0"}. You'll set a weekend price next.
          </Text>

          <View style={styles.priceWrapper}>
            <Text style={styles.currency}>₹</Text>

            <TextInput
              style={styles.priceInput}
              value={price}
              onChangeText={handleChange}
              keyboardType="numeric"
            />

            <Ionicons name="pencil-outline" size={22} color="#111" />
          </View>

          <Text style={styles.priceNote}>
            Guest price before taxes: ₹
            {price
              ? (parseInt(price.replace(/,/g, ""), 10) + 250).toLocaleString("en-IN")
              : "0"}
          </Text>

        </View>

        {/* ---------- BOTTOM FIXED SECTION ---------- */}
        <View>
          <StepProgress active={9} total={12} />

          <StepFooter
            onBack={() => router.back("/become-host/booking-preferences")}
            onNext={() =>
              router.push({
                pathname: "/become-host/price-weekend",
                params: { weekdayPrice: price },
              })
            }
          />
        </View>

      </View>
    </Pressable>
  );
}

const styles = {
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  currency: { fontSize: 42, fontWeight: "800", color: "#111", marginRight: 6 },
  priceInput: { fontSize: 42, fontWeight: "800", color: "#111", minWidth: 120 },
  priceNote: {
    textAlign: "center",
    color: "#777",
    fontSize: 13,
    marginTop: 8,
    marginBottom: 18,
  },
};
