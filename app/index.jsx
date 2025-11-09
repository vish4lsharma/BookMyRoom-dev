import React, { useState } from "react";
import { View, ImageBackground, SafeAreaView, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

import LanguageHeader from "../components/ChooseLanguage/LanguageHeader";
import LanguageTitle from "../components/ChooseLanguage/LanguageTitle";
import LanguageOption from "../components/ChooseLanguage/LanguageOption";
import ContinueButton from "../components/ChooseLanguage/ContinueButton";

import { getStyles } from "../styles/chooseLanguageStyles";

export default function ChooseLanguageScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const { width, height } = useWindowDimensions();
  const styles = getStyles(width, height);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/welcome-bg.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>

          <LanguageHeader styles={styles} />

          <LanguageTitle styles={styles} />

          <View style={styles.languageBox}>

            <LanguageOption
              label="English"
              symbol="A"
              isSelected={selectedLanguage === "English"}
              onPress={() => setSelectedLanguage("English")}
              styles={styles}
            />

            <LanguageOption
              label="हिन्दी"
              subLabel="Hindi"
              symbol="क"
              isSelected={selectedLanguage === "Hindi"}
              onPress={() => setSelectedLanguage("Hindi")}
              styles={styles}
            />

            <ContinueButton
              styles={styles}
              onPress={() => router.push("/LoginScreen")}
            />

          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
