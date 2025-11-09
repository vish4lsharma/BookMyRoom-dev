import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { useRouter } from "expo-router";

import StepProgress from "../../components/becomeHost/common/StepProgress";
import StepFooter from "../../components/becomeHost/common/StepFooter";

import OfferCard from "../../components/becomeHost/specialOffers/OfferCard";
import SecurityToggleRow from "../../components/becomeHost/specialOffers/SecurityToggleRow";

import stepStyles from "../../styles/stepStyles";

export default function SpecialOffers() {
  const router = useRouter();

  const [selectedOffer, setSelectedOffer] = useState("long");
  const [security, setSecurity] = useState({
    camera: false,
    noise: false,
    weapons: false,
  });

  const toggleSecurity = (key) =>
    setSecurity((prev) => ({ ...prev, [key]: !prev[key] }));

  const next = () => router.push("/become-host/review-final");

  const offers = [
    { id: "welcome", percent: "20%", title: "Welcome Offer", desc: "Give 20% off your first 3 reservations to encourage early bookings." },
    { id: "last", percent: "5%", title: "Last-Minute Saver", desc: "5% discount for guests booking within 14 days of arrival." },
    { id: "extended", percent: "10%", title: "Extended Stay Savings", desc: "10% off stays of 7 nights or more." },
    { id: "long", percent: "20%", title: "Long-Term Stay Perk", desc: "20% off bookings of 28 nights or more." },
  ];

  return (
    <View style={stepStyles.container}>
      <View style={stepStyles.pageWrapper}>

        {/* Scroll Section */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={stepStyles.scrollContent}>

          <View style={stepStyles.headerRow}>
            <Text style={stepStyles.headerBtn}>Save & exit</Text>
            <Text style={stepStyles.headerBtn}>Questions?</Text>
          </View>

          <Text style={stepStyles.sectionTitle}>Apply Special Offers</Text>
          <Text style={stepStyles.smallText}>
            Boost your bookings with flexible deals.
          </Text>

          {offers.map((item) => (
            <OfferCard
              key={item.id}
              item={item}
              selectedOffer={selectedOffer}
              setSelectedOffer={setSelectedOffer}
            />
          ))}

          <Text style={stepStyles.smallText}>
            Only one offer applies per stay. <Text style={stepStyles.link}>Learn more</Text>
          </Text>

          <Text style={stepStyles.sectionTitle}>Security Information</Text>
          <Text style={stepStyles.smallText}>Select all that apply.</Text>

          <SecurityToggleRow
            label="Outdoor Security Camera Installed"
            value={security.camera}
            toggle={() => toggleSecurity("camera")}
          />
          <SecurityToggleRow
            label="Noise Monitoring Device Present"
            value={security.noise}
            toggle={() => toggleSecurity("noise")}
          />
          <SecurityToggleRow
            label="Weapons Stored on Site"
            value={security.weapons}
            toggle={() => toggleSecurity("weapons")}
          />

        </ScrollView>

        {/* Bottom Controls */}
        <View>
          <StepProgress active={11} total={12} />
          <StepFooter
            onBack={() => router.back("")}
            onNext={next}
          />
        </View>

      </View>
    </View>
  );
}
