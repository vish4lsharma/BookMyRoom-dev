import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Redirect to LoginScreen immediately
    router.replace("/LoginScreen");
  }, []);

  // Show loading while redirecting
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007BFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
