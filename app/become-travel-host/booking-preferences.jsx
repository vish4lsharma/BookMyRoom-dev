import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useRouter } from "expo-router";

import stepStyles from "../../styles/stepStyles";
import StepProgress from "../../components/becomeHost/common/StepProgress";
import StepFooter from "../../components/becomeHost/common/StepFooter";

import BookingOptionCard from "../../components/becomeHost/booking/BookingOptionCard";

export default function BookingPreferences() {
  const router = useRouter();
  const [bookingType, setBookingType] = useState("review");
  const [guestType, setGuestType] = useState("any");

  const next = () =>
    router.push({
      pathname: "/transport/TransportScreen",
      params: { bookingType, guestType },
    });

  return (
    <View style={stepStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={stepStyles.scrollContent}>

        {/* Header */}
        <View style={stepStyles.headerRow}>
          <Text style={stepStyles.headerBtn}>Save & exit</Text>
          <Text style={stepStyles.headerBtn}>Questions?</Text>
        </View>

        {/* Section 1 */}
        <Text style={stepStyles.sectionTitle}>Choose How Guests Book</Text>

        <BookingOptionCard
          title="Review Your First 5 Reservations"
          subtitle="Approve requests first, then enable instant booking"
          icon="calendar-outline"
          highlighted
          active={bookingType === "review"}
          onPress={() => setBookingType("review")}
        />

        <BookingOptionCard
          title="Enable Instant Booking"
          subtitle="Guests book instantly"
          icon="flash-outline"
          active={bookingType === "instant"}
          onPress={() => setBookingType("instant")}
        />

        {/* Section 2 */}
        <Text style={[stepStyles.sectionTitle, { marginTop: 26 }]}>Decide Who Can Book First</Text>
        <Text style={stepStyles.smallText}>
          After your first stay, your place will be open to all guests.
        </Text>

        <BookingOptionCard
          title="Welcome Any Guest"
          subtitle="Get reservations faster."
          icon="radio-button-off-outline"
          active={guestType === "any"}
          onPress={() => setGuestType("any")}
        />

        <BookingOptionCard
          title="Host a Seasoned Traveler"
          subtitle="Start with experienced guests."
          icon="radio-button-off-outline"
          active={guestType === "seasoned"}
          onPress={() => setGuestType("seasoned")}
        />

      </ScrollView>

      {/* Progress */}
      <StepProgress active={7} total={7} />

      {/* Footer */}
      <StepFooter
        onBack={() => router.back("")}
        onNext={next}
      />
    </View>
  );
}
