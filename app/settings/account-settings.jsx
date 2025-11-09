import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import SettingsRow from "../../components/settings/SettingsRow";

export default function AccountSettings() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Back & Title */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Account Settings</Text>
        </View>

        {/* Menu List */}
        <View style={styles.section}>
          <SettingsRow icon="person-outline" text="Personal information" 
          onPress={() => router.push("/settings/account-settings/personal-info")}
          />
          <SettingsRow icon="shield-checkmark-outline" text="Login & security" />
          <SettingsRow icon="hand-left-outline" text="Privacy" />
          <SettingsRow icon="notifications-outline" text="Notifications" />
          <SettingsRow icon="card-outline" text="Payments" />
          <SettingsRow icon="language-outline" text="Translation" />
          <SettingsRow icon="briefcase-outline" text="Travel for work" />
          <SettingsRow icon="accessibility-outline" text="Accessibility" />

          <View style={styles.divider} />

          <SettingsRow icon="calculator-outline" text="Taxes" />
        </View>

        {/* Version Number */}
        <Text style={styles.version}>Version 25.34.1 (28014457)</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  backBtn: { marginRight: 10 },

  title: { fontSize: 24, fontWeight: "800", color: "#111" },

  section: { marginTop: 20 },

  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 18,
    marginHorizontal: 16,
  },

  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginTop: 10,
  },
});
