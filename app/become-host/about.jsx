// app/become-host/step2.jsx
import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useRouter } from "expo-router";

// Reusable Components
import StepProgress from "../../components/becomeHost/common/StepProgress";
import StepFooter from "../../components/becomeHost/common/StepFooter";

// Step UI Components
import PlaceTypeSelector from "../../components/becomeHost/about/PlaceTypeSelector";
import StayTypeSelector from "../../components/becomeHost/about/StayTypeSelector";
import CounterGroup from "../../components/becomeHost/about/CounterGroup";
import YesNoSelector from "../../components/becomeHost/about/YesNoSelector";
import GuestMeetSelector from "../../components/becomeHost/about/GuestMeetSelector";

import styles from "../../styles/travelStepStyles";

export default function About() {
  const router = useRouter();

  const [placeType, setPlaceType] = useState(null);
  const [stayType, setStayType] = useState(null);

  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);

  const [bedroomLock, setBedroomLock] = useState(null);

  const [bathroomPrivate, setBathroomPrivate] = useState(0);
  const [bathroomDedicated, setBathroomDedicated] = useState(0);
  const [bathroomShared, setBathroomShared] = useState(0);

  return (
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Small top header buttons */}
        <View style={styles.headerRow}>
          <Text style={styles.headerBtn}>Save & exit</Text>
          <Text style={styles.headerBtn}>Need help?</Text>
        </View>

        <Text style={styles.sectionTitle}>Which of these best describes your place?</Text>
        <PlaceTypeSelector selected={placeType} onSelect={setPlaceType} />

        <Text style={styles.sectionTitle}>Choose how guests will stay</Text>
        <StayTypeSelector selected={stayType} onSelect={setStayType} />

        <Text style={styles.sectionTitle}>Tell us about your space</Text>

        <CounterGroup label="Guests" value={guestCount} onChange={setGuestCount} />
        <CounterGroup label="Bedrooms" value={bedroomCount} onChange={setBedroomCount} />
        <CounterGroup label="Beds" value={bedCount} onChange={setBedCount} />

        <Text style={styles.subLabel}>Does every bedroom have a lock?</Text>
        <YesNoSelector selected={bedroomLock} onSelect={setBedroomLock} />

        <Text style={styles.sectionTitle}>Who will guests meet?</Text>
        <GuestMeetSelector />

        <Text style={styles.sectionTitle}>Which bathrooms can guests use?</Text>

        <CounterGroup label="Private & attached" value={bathroomPrivate} onChange={setBathroomPrivate} />
        <CounterGroup label="Dedicated" value={bathroomDedicated} onChange={setBathroomDedicated} />
        <CounterGroup label="Shared" value={bathroomShared} onChange={setBathroomShared} />

      </ScrollView>

      {/* ✅ Reusable Step Progress */}
      <StepProgress active={2} total={12} />

      {/* ✅ Reusable Footer */}
      <StepFooter
        onBack={() => router.push("/become-host/step1")}
        onNext={() => router.push("/become-host/location")}
      />

    </View>
  );
}
