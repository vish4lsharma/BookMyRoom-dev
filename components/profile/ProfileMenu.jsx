import React from "react";
import { View, StyleSheet } from "react-native";
import MenuItem from "./MenuItem";
import { useRouter } from "expo-router";   // ✅ ADD THIS

export default function ProfileMenu() {
  const router = useRouter();              // ✅ AND THIS

  return (
    <View style={styles.menu}>
      <MenuItem 
        icon="settings-outline" 
        text="Account settings"
        onPress={() => router.push("/settings/account-settings")} // ✅ WORKS NOW
      />

      <MenuItem icon="help-circle-outline" text="Get help" />
      <MenuItem 
       icon="person-outline" 
        text="View profile"
        onPress={() => router.push("/profile/setup-account")}
      />

      <MenuItem icon="hand-left-outline" text="Privacy" />

      <View style={styles.line} />

      <MenuItem icon="people-outline" text="Refer a host" />
      <MenuItem icon="home-outline" text="Find a co-host" />
      <MenuItem icon="book-outline" text="Legal" />
      <MenuItem icon="log-out-outline" text="Log out" />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: { paddingHorizontal: 16 },
  line: { height: 1, backgroundColor: "#E9E9E9", marginVertical: 8 },
});
