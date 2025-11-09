import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

import StepProgress from "../../components/becomeHost/common/StepProgress";
import StepFooter from "../../components/becomeHost/common/StepFooter";
import styles from "../../styles/stepStyles";

export default function TravelStep1() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={{ flex: 1 }} />

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.stepLabel}>Step 1</Text>
        <Text style={styles.title}>Tell Us What You Offer</Text>

        <Text style={styles.description}>
          First tell us whether you offer transportation services within your district, city, country or region.
        </Text>
      </View>

      {/* Progress Bar */}
      <StepProgress active={1} total={6} />
      {/* Travel host flow usually shorter; adjust if you want */}

      {/* Footer Navigation */}
      <StepFooter
        onBack={() => router.push("/become-travel-host")}
        onNext={() => router.push("/become-travel-host/about")}
      />

    </View>
  );
}
