import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import BottomNav from "../../components/common/BottomNav";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import HostCard from "../../components/profile/HostCard";
import ProfileMenu from "../../components/profile/ProfileMenu";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <ProfileHeader />

        {/* ✅ MUST pass name & role */}
        <ProfileAvatar name="Yash Gupta" role="Guest" />

        <HostCard
          title="Become a host"
          subtitle="Start hosting and earn extra income."
          onPress={() => router.push("/become-host")}
        />

        <HostCard
          title="Become a travel host"
          subtitle="Offer travel services to guests."
          onPress={() => router.push("/become-travel-host")}
        />

        <ProfileMenu />

      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40, paddingBottom: 16 },
});
