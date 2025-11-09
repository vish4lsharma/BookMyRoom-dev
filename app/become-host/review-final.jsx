// app/become-host/review-final.jsx
import React, { useState } from "react";
import { View, ScrollView, Text, Pressable, Keyboard } from "react-native";
import { useRouter } from "expo-router";

import StepProgress from "../../components/becomeHost/common/StepProgress";
import StepFooter from "../../components/becomeHost/common/StepFooter";

import AddressFields from "../../components/becomeHost/review/AddressFields";
import BusinessSelection from "../../components/becomeHost/review/BusinessSelection";

import stepStyles from "../../styles/stepStyles";

export default function ReviewFinal() {
  const router = useRouter();

  const [country, setCountry] = useState("India"); // ✅ Fixed
  const [business, setBusiness] = useState(null);
  const [showError, setShowError] = useState(false);

  const [address, setAddress] = useState({
    flat: "",
    street: "",
    landmark: "",
    district: "",
    city: "",
    state: "",
    pincode: "",
  });

  const required = ["street", "city", "state", "pincode"];
  const isValid = required.every((k) => address[k].trim() !== "");

  const updateField = (key, value) => {
    setAddress({ ...address, [key]: value });
    setShowError(false);
  };

  const handleCreate = () => {
    if (!isValid) {
      setShowError(true);
      return;
    }
    router.push("/explore/ExploreScreen");
  };

  return (
    <Pressable style={stepStyles.container} onPress={Keyboard.dismiss}>
      <View style={stepStyles.pageWrapper}>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={stepStyles.scrollContent}>

          <View style={stepStyles.headerRow}>
            <Text style={stepStyles.headerBtn}>Save & exit</Text>
            <Text style={stepStyles.headerBtn}>Questions?</Text>
          </View>

          <Text style={stepStyles.title}>Provide a few final details</Text>

          <AddressFields
             country={country}
             setCountry={setCountry}   // ✅ important
              address={address}
             updateField={updateField}
             showError={showError}
          />


          <BusinessSelection business={business} setBusiness={setBusiness} />

        </ScrollView>

        <View>
          <StepProgress active={12} total={12} />

          <StepFooter
             onBack={() => router.back()}
             nextLabel="Create Listing"
             onNext={handleCreate}
             disabled={!isValid}
           />

        </View>

      </View>
    </Pressable>
  );
}
