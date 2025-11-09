import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "../../../styles/addressStyles";

export default function MapCard({ location, setLocation }) {
  return (
    <View style={styles.mapCard}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={location}
        onRegionChangeComplete={setLocation}
        onPress={(e) => setLocation({ ...location, ...e.nativeEvent.coordinate })}
      >
        <Marker coordinate={location} />
      </MapView>

      <View style={styles.overlayPill}>
        <Text style={styles.overlayText}>Guests see approximate location</Text>
      </View>
    </View>
  );
}
