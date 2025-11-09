import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileAvatar({ name, role }) {
  return (
    <View style={styles.center}>
      <View style={styles.avatarPlaceholder}>
        <Ionicons name="person" size={55} color="#444" />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", marginTop: 20 },
  avatarPlaceholder: {
    width: 95, height: 95, borderRadius: 47.5,
    backgroundColor: "#E6E6E6", justifyContent: "center", alignItems: "center",
  },
  name: { marginTop: 10, fontSize: 18, fontWeight: "700" },
  role: { color: "#777", marginBottom: 20 },
});
