// app/become-host/step2.jsx
import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useRouter } from "expo-router";

import StepProgress from "../../components/becomeHost/common/StepProgress";
import StepFooter from "../../components/becomeHost/common/StepFooter";

import ServiceTypeSelector from "../../components/become-travel-host/about/ServiceTypeSelector";

import styles from "../../styles/travelStepStyles";

export default function Step2_Travel() {
  const router = useRouter();

  const [serviceType, setServiceType] = useState(null);
  
  return (
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerRow}>
          <Text style={styles.headerBtn}>Save & exit</Text>
          <Text style={styles.headerBtn}>Need help?</Text>
        </View>

        <Text style={styles.sectionTitle}>What kind of travel service do you offer?</Text>
        <ServiceTypeSelector selected={serviceType} onSelect={setServiceType} />

      </ScrollView>

      <StepProgress active={2} total={6} />

      <StepFooter
        onBack={() => router.push("/become-travel-host/step1")}
        onNext={() => router.push("/become-travel-host/location")}
      />

    </View>
  );
}
