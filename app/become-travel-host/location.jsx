// app/become-host/location.jsx
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import MapView, { Marker } from "react-native-maps";

import StepProgress from "../../components/becomeHost/common/StepProgress";
import StepFooter from "../../components/becomeHost/common/StepFooter";

import LocationHeader from "../../components/becomeHost/location/LocationHeader";
import AddressSelector from "../../components/becomeHost/location/AddressSelector";

import styles from "../../styles/stepStyles";

export default function Location() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const serviceType = params.serviceType || null;

  const [address, setAddress] = useState("");

  useEffect(() => {
    if (params.selectedAddress) {
      setAddress(params.selectedAddress);
    }
  }, [params]);

  const [region, setRegion] = useState({
    latitude: Number(params.lat) || 28.367,
    longitude: Number(params.lng) || 79.430,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const [marker, setMarker] = useState({
    latitude: Number(params.lat) || 28.367,
    longitude: Number(params.lng) || 79.430,
  });

  return (
    <View style={styles.container}>
      <LocationHeader />

      <Text style={styles.sectionTitle}>Where is your travel agency located?</Text>
      

      <AddressSelector
        selectedAddress={address}
        onPress={() =>
          router.push({
            pathname: "/become-travel-host/address/address",
            params: { selectedAddress: address },
          })
        }
      />

      <MapView
        style={styles.mapLarge}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={(e) => {
          const coord = e.nativeEvent.coordinate;
          setMarker(coord);
          setRegion({ ...region, ...coord });
        }}
      >
        <Marker coordinate={marker} />
      </MapView>

      <StepProgress active={3} total={6} />

      {/* ✅ Disable Next until address is filled */}
      <StepFooter
        onBack={() => router.push("/become-travel-host/about")}
        onNext={() => router.push("/become-travel-host/step2")}
        disabled={!address || address.trim() === ""}
      />
    </View>
  );
}
