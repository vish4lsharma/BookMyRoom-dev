import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const scaleFont = (size, width) => Math.round(size * (width / 375));

export default function OtpScreen() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width, height } = useWindowDimensions();
  const styles = getStyles(width, height);

  const phone = params.phone || "";

  useEffect(() => {
    if (!phone) {
      Alert.alert("Error", "Phone number is required");
      router.back();
    }
  }, [phone]);

  const validate = () => {
    if (!/^[0-9]{6}$/.test(otp)) {
      Alert.alert("Validation Error", "Please enter a valid 6-digit OTP");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const { authService } = require("../services/authService");
      const response = await authService.loginWithOTP(phone, otp);
      
      if (response.success) {
        Alert.alert("Success", "OTP Verified Successfully!");
        router.replace("/explore/ExploreScreen");
      } else {
        Alert.alert("Error", response.message || "OTP verification failed");
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      Alert.alert("Error", error.message || "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
        source={require("../assets/images/images-bg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: "#007AFF" }]}>BOOK</Text>
          <Text style={[styles.logoText, { color: "#FBBF24" }]}>MY ROOM</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Enter your OTP</Text>
          <Text style={styles.subtitle}>
            Your one time password has been sent to your registered mobile number / email
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="numeric"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity 
            style={[styles.submitBtn, loading && styles.submitBtnDisabled]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>SUBMIT</Text>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const getStyles = (width, height) =>
  StyleSheet.create({
    background: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: height * 0.08,
    },
    logoContainer: {
      position: "absolute",
      top: height * 0.02,
      left: width * 0.05,
      flexDirection: "column",
      zIndex: 10,
    },
    logoText: {
      fontSize: scaleFont(18, width),
      fontWeight: "700",
      letterSpacing: 0.5,
      lineHeight: scaleFont(22, width),
    },
    card: {
      width: width * 0.9,
      backgroundColor: "#fff",
      borderRadius: 20,
      paddingVertical: height * 0.03,
      paddingHorizontal: width * 0.05,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      marginTop: height * 0.3,
    },
    title: {
      fontSize: scaleFont(22, width),
      fontWeight: "700",
      marginBottom: height * 0.01,
      color: "#000",
      textAlign: "center",
    },
    subtitle: {
      fontSize: scaleFont(14, width),
      color: "#666",
      textAlign: "center",
      marginBottom: height * 0.02,
    },
    input: {
      width: "100%",
      height: height * 0.065,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#ddd",
      paddingHorizontal: width * 0.04,
      backgroundColor: "#f9f9f9",
      fontSize: scaleFont(18, width),
      textAlign: "center",
      letterSpacing: 5,
      marginBottom: height * 0.02,
    },
    submitBtn: {
      backgroundColor: "#007BFF",
      borderRadius: 30,
      width: "100%",
      height: height * 0.065,
      justifyContent: "center",
      alignItems: "center",
    },
    submitText: {
      color: "#fff",
      fontSize: scaleFont(16, width),
      fontWeight: "600",
    },
    submitBtnDisabled: {
      opacity: 0.6,
    },
  });
