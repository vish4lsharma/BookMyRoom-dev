// app/become-host/address/index.jsx
import React, { useState } from "react";
import { View, ScrollView, TextInput, TouchableOpacity, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import Header from "../../../components/becomeHost/address/Header";
import CountryPicker from "../../../components/becomeHost/address/CountryPicker";
import Field from "../../../components/becomeHost/address/Field";
import LocationToggle from "../../../components/becomeHost/address/LocationToggle";
import MapCard from "../../../components/becomeHost/address/MapCard";

import styles from "../../../styles/addressStyles";

export default function AddressScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [errors, setErrors] = useState({});
  const [country, setCountry] = useState("India");

  const [location, setLocation] = useState({
    latitude: Number(params.lat) || 28.367,
    longitude: Number(params.lng) || 79.43,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [showExact, setShowExact] = useState(false);
  const [form, setForm] = useState({});

  const update = (k, v) => {
    setForm({ ...form, [k]: v });
    if (errors[k]) setErrors({ ...errors, [k]: null });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.line2?.trim()) newErrors.line2 = "Street address is required";
    if (!form.line1?.trim()) newErrors.line1 = "Business name is required";
    if (!form.city?.trim()) newErrors.city = "City / Town is required";
    if (!form.state?.trim()) newErrors.state = "State is required";

    if (!form.pincode?.trim()) newErrors.pincode = "PIN Code is required";
    else if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = "PIN Code must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
  if (!validate()) return;

  const fullAddress = [
    form.line2,
    form.landmark,
    form.city,
    form.state,
    form.pincode
  ]
    .filter(Boolean)
    .join(", ");

  router.push({
    pathname: "/become-travel-host/location",
    params: { selectedAddress: fullAddress }
  });
};


  return (
    <View style={styles.container}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>

        <CountryPicker country={country} setCountry={setCountry} />

        <Field label="Business name">
          <TextInput style={styles.inputBase} onChangeText={(v) => update("line1", v)} />
        </Field>

        <Field label="Business address">
          <TextInput
            style={[styles.inputBase, errors.line2 && styles.errorInput]}
            onChangeText={(v) => update("line2", v)}
          />
          {errors.line2 && <Text style={styles.errorText}>{errors.line2}</Text>}
        </Field>

        <Field label="Nearby landmark (optional)">
          <TextInput style={styles.inputBase} onChangeText={(v) => update("landmark", v)} />
        </Field>

        

        <Field label="City / Town">
          <TextInput
            style={[styles.inputBase, errors.city && styles.errorInput]}
            onChangeText={(v) => update("city", v)}
          />
          {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
        </Field>

        <Field label="State">
          <TextInput
            style={[styles.inputBase, errors.state && styles.errorInput]}
            onChangeText={(v) => update("state", v)}
          />
          {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
        </Field>

        <Field label="PIN Code">
          <TextInput
            style={[styles.inputBase, errors.pincode && styles.errorInput]}
            keyboardType="number-pad"
            onChangeText={(v) => update("pincode", v)}
          />
          {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
        </Field>

        <LocationToggle showExact={showExact} setShowExact={setShowExact} />
        <MapCard location={location} setLocation={setLocation} />

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cta} onPress={handleSubmit}>
          <Text style={styles.ctaText}>Looks good</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
