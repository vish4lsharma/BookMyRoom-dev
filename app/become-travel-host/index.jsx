import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import RoundedBackButton from "../../components/common/RoundedBackButton";
import StepItem from "../../components/becomeHost/StepItem"; // ✅ Reuse same card component
import styles from "../../styles/becomeHostStyles";

export default function BecomeTravelHost() {
  const router = useRouter();

  const steps = [
    {
      id: 1,
      title: "Share What You Offer",
      desc: "Tell travelers what travel experience or service you provide — guiding, touring, planning, etc.",
      image: "https://cdn-icons-png.flaticon.com/512/684/684831.png",
    },
    {
      id: 2,
      title: "Set Your Availability & Pricing",
      desc: "Decide when you're available and what you’d like to charge.",
      image: "https://cdn-icons-png.flaticon.com/512/2776/2776066.png",
    },
    {
      id: 3,
      title: "Start Accepting Travelers",
      desc: "Publish your travel host profile and begin connecting with travelers from anywhere.",
      image: "https://cdn-icons-png.flaticon.com/512/3131/3131593.png",
    },
  ];

  return (
    <View style={styles.container}>
      
      <RoundedBackButton onPress={() => router.push("/profile/profileScreen")} />

      <Text style={styles.title}>
        Start your journey as a{"\n"}
        <Text style={styles.appName}>Travel Host</Text>
      </Text>

      <Text style={styles.subtitle}>
        Guide travelers, plan trips,{"\n"}and share local experiences.
      </Text>

      <View style={styles.stepContainer}>
        {steps.map((step) => (
          <StepItem key={step.id} step={step} />
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/become-travel-host/step1")}  // ✅ Start flow
      >
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>

    </View>
  );
}
