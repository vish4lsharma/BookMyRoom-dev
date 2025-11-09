import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import GradientButton from "../../components/common/GradientButton";
import { useProfileStore } from "../_store/profileStore";

export default function SetupAccount() {
  const router = useRouter();
  const avatar = useProfileStore((state) => state.avatar);
  const name = useProfileStore((state) => state.name);
  const role = useProfileStore((state) => state.role);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={26} color="#111" />
      </TouchableOpacity>

      <Text style={styles.title}>Set Up Your Account</Text>
      <Text style={styles.subtitle}>
        Take the first step to complete your profile and unlock all features.
      </Text>

      {/* Avatar */}
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.initial}>{name.charAt(0)}</Text>
        </View>
      )}

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>

      <GradientButton
        text="Begin Setup"
        onPress={() => router.push("/profile/edit-profile")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 70, alignItems: "center" },
  backBtn: { position: "absolute", top: 40, left: 20, backgroundColor: "#f4f4f4", padding: 8, borderRadius: 25 },
  title: { fontSize: 24, fontWeight: "800", marginTop: 20, textAlign: "center", color: "#111" },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    marginTop: 25,
  },
  avatarPlaceholder: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  initial: { color: "#fff", fontSize: 38, fontWeight: "700" },
  name: { marginTop: 16, fontSize: 20, fontWeight: "700" },
  role: { color: "#777", fontSize: 14, marginTop: 2, marginBottom: 30 },
});
