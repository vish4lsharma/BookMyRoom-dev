import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PersonalInfoRow from "../../../components/settings/PersonalInfoRow";

export default function PersonalInfo() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal info</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>

<PersonalInfoRow
          label="Legal name"
          value="Yash Gupta"
          actionText="Edit"
          onPress={() => router.push("/settings/account-settings/edit-legal-name")}
        />

        <PersonalInfoRow
          label="Preferred first name"
          value=""
          actionText="Add"
          onPress={() => router.push("/settings/account-settings/edit-first-name")}
        />

        <PersonalInfoRow
          label="Phone number"
          value=""
          actionText="Add"
          description="Add a number so confirmed guests and Book My Room can get in touch."
          onPress={() => router.push("/settings/account-settings/edit-phone-number")}
        />

        <PersonalInfoRow
          label="Email"
          value="g***8@gmail.com"
          actionText="Edit"
          onPress={() => router.push("/settings/account-settings/edit-email")}
        />

        <PersonalInfoRow
          label="Residential address"
          value=""
          actionText="Add"
          onPress={() => {}}
        />

        <PersonalInfoRow
          label="Postal address"
          value=""
          actionText="Add"
          onPress={() => {}}
        />

        <PersonalInfoRow
          label="Emergency contact"
          value=""
          actionText="Add"
          onPress={() => {}}
        />

        <PersonalInfoRow
          label="Identity verification"
          value="Not started"
          actionText="Start"
          onPress={() => {}}
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginTop: 20
  },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 20, fontWeight: "700" },
});
