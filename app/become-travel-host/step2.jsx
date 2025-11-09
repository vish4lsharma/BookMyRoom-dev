// app/become-host/step1.jsx
import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import StepProgress from "../../components/becomeHost/common/StepProgress";
import StepFooter from "../../components/becomeHost/common/StepFooter";
import styles from "../../styles/stepStyles";

export default function Step1() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={{ flex: 1 }} />

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.stepLabel}>Step 2</Text>

        {/* ✅ Updated Title */}
        <Text style={styles.title}>
          Show Travelers What You Offer
        </Text>

        {/* ✅ Updated Description */}
        <Text style={styles.description}>
          Set your pricing and upload photos of your vehicle, and then add booking preferences so everything is ready for travelers to book.
        </Text>
      </View>

      {/* Shared Progress Bar */}
      <StepProgress active={4} total={6} />

      {/* Shared Footer Navigation */}
      <StepFooter
        onBack={() => router.back()}
        onNext={() => router.push("/become-travel-host/services&pricing")}
      />

    </View>
  );
}
