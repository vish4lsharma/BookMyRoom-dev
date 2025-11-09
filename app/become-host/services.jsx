import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useRouter } from "expo-router";

import ProgressBar from "../../components/becomeHost/common/StepProgress";
import FooterNav from "../../components/becomeHost/common/StepFooter";

import AmenitiesSelector from "../../components/becomeHost/services/AmenitiesSelector";
import HighlightSelector from "../../components/becomeHost/services/HighlightSelector";
import HomeNameInput from "../../components/becomeHost/services/HomeNameInput";

import styles from "../../styles/servicesStyles"; // ✅ NEW IMPORT

export default function Services() {
  const router = useRouter();

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedHighlights, setSelectedHighlights] = useState([]);
  const [homeName, setHomeName] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerBtn}>Save & exit</Text>
          <Text style={styles.headerBtn}>Questions?</Text>
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>Let Guests Know What’s Included</Text>
        <Text style={styles.subtitle}>Update your list anytime later</Text>

        <AmenitiesSelector selected={selectedAmenities} onSelect={setSelectedAmenities} />

        {/* Highlights */}
        <Text style={styles.sectionTitle}>Describe your experience</Text>
        <Text style={styles.smallText}>
          Choose up to 2 highlights. These help guests understand your experience style.
        </Text>

        <HighlightSelector selected={selectedHighlights} onSelect={setSelectedHighlights} />

        {/* Name */}
        <Text style={styles.sectionTitle}>Give Your Experience a Name</Text>
        <Text style={styles.smallText}>Make it short, clear, and memorable.</Text>

        <HomeNameInput value={homeName} onChange={setHomeName} />
      </ScrollView>

      {/* Progress Bar */}
      <ProgressBar active={5} total={12} />

      {/* Footer */}
      <FooterNav
        onBack={() => router.back()}
        onNext={() => router.push("/become-host/photos")}
      />
    </View>
  );
}
