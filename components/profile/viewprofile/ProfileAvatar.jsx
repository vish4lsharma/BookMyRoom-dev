import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useProfileStore } from "../../app/store/profileStore";

export default function ProfileAvatar() {
  const { avatar, name, role } = useProfileStore();

  const fallbackInitial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <View style={styles.center}>
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.initial}>{fallbackInitial}</Text>
        </View>
      )}

      {name ? <Text style={styles.name}>{name}</Text> : null}
      {role ? <Text style={styles.role}>{role}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", marginTop: 20 },
  avatar: { width: 95, height: 95, borderRadius: 47.5 },
  avatarPlaceholder: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  initial: { color: "#fff", fontSize: 38, fontWeight: "700" },
  name: { marginTop: 10, fontSize: 18, fontWeight: "700" },
  role: { color: "#777", marginBottom: 20 },
});
