import React, { useState } from "react";
import { View, TextInput } from "react-native";
import CountrySelector from "../common/CountrySelector";

export default function SignupPhoneInput({ mobile, setMobile, styles }) {
  // ✅ Local country state
  const [country, setCountry] = useState({ flag: "🇮🇳", code: "+91" });

  return (
    <View style={styles.mobileRow}>

      {/* ✅ Country Selector Component */}
      <CountrySelector selected={country} setSelected={setCountry} styles={styles} />

      {/* ✅ Mobile Number Input */}
      <TextInput
        style={styles.mobileField}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        maxLength={10}
        value={mobile}
        onChangeText={(text) => {
          // Only allow digits
          const digitsOnly = text.replace(/\D/g, '');
          setMobile(digitsOnly);
        }}
      />

    </View>
  );
}
