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
        <Text style={styles.title}>Show Guests Why{"\n"}They’ll Love It</Text>

        <Text style={styles.description}>
          Upload at least 5 clear photos, list amenities, and write a short
          description that highlights what makes your room unique.
        </Text>
      </View>

      {/* Shared Progress Bar */}
      <StepProgress active={4} total={12} />

      {/* Shared Footer Navigation */}
      <StepFooter
        onBack={() => router.back()}
        onNext={() => router.push("/become-host/services")}
      />
      

    </View>
  );
}
