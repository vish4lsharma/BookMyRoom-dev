// app/become-host/step1.jsx
import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import StepProgress from "../../components/becomeHost/common/StepProgress";
import StepFooter from "../../components/becomeHost/common/StepFooter";
import styles from "../../styles/stepStyles";

export default function Step3() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={{ flex: 1 }} />

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.stepLabel}>Step 3</Text>
        <Text style={styles.title}>Publish Your{"\n"}Listing</Text>

        <Text style={styles.description}>
          Choose your booking preferences, set pricing, and share your place
          with the world..
        </Text>
      </View>

      {/* Shared Progress Bar */}
      <StepProgress active={7} total={12} />

      {/* Shared Footer Navigation */}
      <StepFooter
        onBack={() => router.back()}
        onNext={() => router.push("/become-host/booking-preferences")}
      />

    </View>
  );
}
