import React, { useState } from "react";
import { ScrollView, View, Text, ImageBackground, Alert, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

import AppLogo from "../components/common/AppLogo";
import LoginCard from "../components/login/LoginCard";
import PrimaryButton from "../components/common/PrimaryButton";
import GoogleButton from "../components/common/GoogleButton";
import SignupInput from "../components/signup/SignupInput";

import { getStyles, scaleFont } from "../styles/loginStyles";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { width, height } = useWindowDimensions();
  const styles = getStyles(width, height);

  const validate = () => {
    if (!username || !username.trim()) {
      Alert.alert("Error", "Please enter your username or email");
      return false;
    }
    if (!password || !password.trim()) {
      Alert.alert("Error", "Please enter your password");
      return false;
    }
    return true;
  };

  const handleConfirm = async () => {
    if (!validate()) return;
    
    try {
      setLoading(true);
      const { authAPI } = require("../services/api");
      const response = await authAPI.login(username.trim(), password);
      
      if (response.success && response.token) {
        // Store token and user data
        const { authService } = require("../services/authService");
        await authService.setToken(response.token);
        await authService.setUser(response.user);
        
        Alert.alert("Success", "Login successful!");
        router.replace("/explore/ExploreScreen");
      } else {
        Alert.alert("Error", response.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert("Error", error.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground source={require("../assets/images/images-bg.png")} style={styles.background}>
        
        <AppLogo styles={styles} />

        <LoginCard styles={styles}>
          <SignupInput 
            placeholder="Username or Email" 
            value={username} 
            onChangeText={(text) => setUsername(text.toLowerCase())} 
            autoCapitalize="none"
            styles={styles} 
          />

          <SignupInput 
            placeholder="Password" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry
            styles={styles} 
          />

          <PrimaryButton 
            text={loading ? "LOGGING IN..." : "LOGIN"} 
            onPress={handleConfirm} 
            styles={styles} 
            disabled={loading}
          />

          <Text style={styles.orText}>OR</Text>

          <GoogleButton styles={styles} iconSize={scaleFont(26, width)} />

          <Text style={styles.bottomText}>
            don’t have an account?
            <Text style={styles.signupText} onPress={() => router.push("/SignupScreen")}>
              {" "}Signup
            </Text>
          </Text>
        </LoginCard>

      </ImageBackground>
    </ScrollView>
  );
}
