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
        <Text style={styles.stepLabel}>Step 1</Text>
        <Text style={styles.title}>Add Your Place</Text>

        <Text style={styles.description}>
          We’ll guide you step by step. First, tell us about your room or
          property, where it is, and how many people it can host.
        </Text>
      </View>

      {/* Shared Progress Bar */}
      <StepProgress active={1} total={12} />

      {/* Shared Footer Navigation */}
      <StepFooter
        onBack={() => router.push("/become-host")}
        onNext={() => router.push("/become-host/about")}
      />

    </View>
  );
}
