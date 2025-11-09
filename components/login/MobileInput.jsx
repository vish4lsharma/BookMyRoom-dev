import CountrySelector from "../common/CountrySelector";
import { useState } from "react";
import { View, TextInput } from "react-native";



export default function MobileInput({ mobile, setMobile, styles }) {
  const [country, setCountry] = useState({ flag: "🇮🇳", code: "+91" });

  return (
    <View style={styles.mobileRow}>
      <CountrySelector selected={country} setSelected={setCountry} styles={styles} />

      <TextInput
        style={styles.mobileField}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        maxLength={10}
        value={mobile}
        onChangeText={setMobile}
      />
    </View>
  );
}
