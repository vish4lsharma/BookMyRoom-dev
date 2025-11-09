// app/become-host/index.jsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import RoundedBackButton from "../../components/common/RoundedBackButton";
import StepItem from "../../components/becomeHost/StepItem";
import styles from "../../styles/becomeHostStyles";

export default function BecomeHost() {
  const router = useRouter();

  const steps = [
    {
      id: 1,
      title: "Add Your Place",
      desc: "Share the basics — location, type of room, and how many guests you can host.",
      image: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    },
    {
      id: 2,
      title: "Show It Off",
      desc: "Upload at least 5 photos, write a catchy title, and describe your space.",
      image: "https://cdn-icons-png.flaticon.com/512/2490/2490401.png",
    },
    {
      id: 3,
      title: "Publish & Start Earning",
      desc: "Set your price, confirm details, and go live for bookings instantly.",
      image: "https://cdn-icons-png.flaticon.com/512/3131/3131593.png",
    },
  ];

  return (
    <View style={styles.container}>
      <RoundedBackButton onPress={() => router.push("/profile/profileScreen")} />

      <Text style={styles.title}>
        It’s easy to get started{"\n"}on <Text style={styles.appName}>Book My Room</Text>
      </Text>
      <Text style={styles.subtitle}>
        List your space, welcome guests,{"\n"}earn with ease.
      </Text>

      <View style={styles.stepContainer}>
        {steps.map((step) => (
          <StepItem key={step.id} step={step} />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/become-host/step1")}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
}
