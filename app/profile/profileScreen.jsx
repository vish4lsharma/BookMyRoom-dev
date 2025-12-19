import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from "react-native";
import BottomNav from "../../components/common/BottomNav";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import HostCard from "../../components/profile/HostCard";
import ProfileMenu from "../../components/profile/ProfileMenu";
import { useRouter } from "expo-router";
import { authAPI } from "../../services/api";
import { authService } from "../../services/authService";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userData = await authService.getUser();
      if (userData) {
        setUser(userData);
      } else {
        // Try to fetch from API
        const response = await authAPI.getMe();
        if (response.success && response.user) {
          setUser(response.user);
          await authService.setUser(response.user);
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading profile...</Text>
        <BottomNav />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <ProfileHeader />

        {/* ✅ Load user data from backend */}
        <ProfileAvatar 
          name={user?.name || "Guest"} 
          role={user?.role || "Guest"} 
        />

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
