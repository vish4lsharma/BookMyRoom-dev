import React, { useState } from "react";
import { ScrollView, View, Text, ImageBackground, Alert, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

import AppLogo from "../components/common/AppLogo";
import SignupCard from "../components/signup/SignupCard";
import SignupInput from "../components/signup/SignupInput";
import PrimaryButton from "../components/common/PrimaryButton";
import GoogleButton from "../components/common/GoogleButton";

import { getStyles, scaleFont } from "../styles/signupStyles";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const styles = getStyles(width, height);

  const validate = () => {
    if (!name || !name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return false;
    }
    
    if (!username || !username.trim()) {
      Alert.alert("Error", "Please enter a username");
      return false;
    }
    
    if (username.trim().length < 3) {
      Alert.alert("Error", "Username must be at least 3 characters");
      return false;
    }
    
    if (!/^[a-z0-9_]+$/i.test(username.trim())) {
      Alert.alert("Error", "Username can only contain letters, numbers, and underscores");
      return false;
    }
    
    if (!email || !email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    
    if (!password || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleConfirm = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      
      // Register user via API
      const { authAPI } = require("../services/api");
      const response = await authAPI.register({
        name: name.trim(),
        username: username.trim().toLowerCase(),
        email: email.trim(),
        password: password,
      });

      if (response.success) {
        Alert.alert("Success", "Registration successful! Please login.");
        router.push("/LoginScreen");
      } else {
        Alert.alert("Error", response.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert("Error", error.message || "Registration failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground source={require("../assets/images/images-bg.png")} style={styles.background}>

        <AppLogo styles={styles} />

        <SignupCard styles={styles}>

          <SignupInput placeholder="Enter Your Name" value={name} onChangeText={setName} styles={styles} />

          <SignupInput placeholder="Enter Username" value={username} onChangeText={(text) => setUsername(text.toLowerCase())} autoCapitalize="none" styles={styles} />

          <SignupInput placeholder="Enter Your Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" styles={styles} />

          <SignupInput placeholder="Enter Password" value={password} onChangeText={setPassword} secureTextEntry styles={styles} />

          <SignupInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry styles={styles} />

          <PrimaryButton text={loading ? "SIGNING UP..." : "SIGN UP"} onPress={handleConfirm} styles={styles} disabled={loading} />

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
