import React, { useState } from "react";
import { ScrollView, View, Text, ImageBackground, Alert, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

import AppLogo from "../components/common/AppLogo";
import SignupCard from "../components/signup/SignupCard";
import SignupInput from "../components/signup/SignupInput";
import PrimaryButton from "../components/common/PrimaryButton";
import GoogleButton from "../components/common/GoogleButton";
import SignupPhoneInput from "../components/signup/SignupPhoneInput";

import { getStyles, scaleFont } from "../styles/signupStyles";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");

  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const styles = getStyles(width, height);

  const validate = () => {
    if (!name.trim()) return Alert.alert("Error", "Enter your name");
    if (!/^[0-9]{10}$/.test(mobile)) return Alert.alert("Error", "Enter valid 10-digit mobile");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Alert.alert("Error", "Enter valid email");
    if (!/^[0-9]{12}$/.test(aadhar)) return Alert.alert("Error", "Enter valid 12-digit Aadhar");
    return true;
  };

  const handleConfirm = () => {
    if (validate()) {
      Alert.alert("Success", "Signup Successful!");
      router.push("/OtpScreen");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground source={require("../assets/images/images-bg.png")} style={styles.background}>

        <AppLogo styles={styles} />

        <SignupCard styles={styles}>

          <SignupInput placeholder="Enter Your Name" value={name} onChangeText={setName} styles={styles} />

          <View style={styles.mobileRow}>
            
            <SignupPhoneInput mobile={mobile} setMobile={setMobile} styles={styles} />

          </View>

          <SignupInput placeholder="Enter Your Email" value={email} onChangeText={setEmail} keyboardType="email-address" styles={styles} />

          <SignupInput placeholder="Enter Your Aadhar Number" value={aadhar} onChangeText={setAadhar} keyboardType="numeric" styles={styles} />

          <PrimaryButton text="CONFIRM" onPress={handleConfirm} styles={styles} />

          <Text style={styles.orText}>OR</Text>

          <GoogleButton styles={styles} iconSize={scaleFont(26, width)} />

          <Text style={styles.bottomText}>
            already have an account?
            <Text style={styles.signupText} onPress={() => router.push("/LoginScreen")}>
              {" "}Login
            </Text>
          </Text>

        </SignupCard>

      </ImageBackground>
    </ScrollView>
  );
}
