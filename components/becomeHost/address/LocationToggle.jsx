import React from "react";
import { View, Text, Switch } from "react-native";
import styles from "../../../styles/addressStyles";

export default function LocationToggle({ showExact, setShowExact }) {
  return (
    <View style={styles.toggleCard}>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleTitle}>Show your specific location</Text>
        <Switch value={showExact} onValueChange={setShowExact} />
      </View>
      <Text style={styles.toggleHelp}>
        We’ll only share the exact location after reservation.
      </Text>
    </View>
  );
}

