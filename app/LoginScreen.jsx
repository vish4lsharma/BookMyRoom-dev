import React, { useState } from "react";
import { ScrollView, View, Text, ImageBackground, Alert, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

import AppLogo from "../components/common/AppLogo";
import LoginCard from "../components/login/LoginCard";
import MobileInput from "../components/login/MobileInput";
import PrimaryButton from "../components/common/PrimaryButton";
import GoogleButton from "../components/common/GoogleButton";

import { getStyles, scaleFont } from "../styles/loginStyles";

export default function LoginScreen() {
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  const { width, height } = useWindowDimensions();
  const styles = getStyles(width, height);

  const validate = () => /^[0-9]{10}$/.test(mobile);

  const handleConfirm = () => {
    if (!validate()) return Alert.alert("Error", "Enter valid 10-digit mobile number");
    router.push("/OtpScreen");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground source={require("../assets/images/images-bg.png")} style={styles.background}>
        
        <AppLogo styles={styles} />

        <LoginCard styles={styles}>
          <MobileInput mobile={mobile} setMobile={setMobile} styles={styles} />

          <PrimaryButton text="CONFIRM" onPress={handleConfirm} styles={styles} />

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
