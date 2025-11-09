import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../../components/common/BottomNav";
import { transportData } from "./data/transportData";
import TransportCard from "../../components/transport/TransportCard";
import styles from "../../styles/transportStyles";
import { useRouter } from "expo-router";

export default function TransportScreen() {
  const router = useRouter();  // ✅

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>

        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.header}>Transport Services</Text>
            <Text style={styles.subHeader}>Popular transport services in Bareilly</Text>
          </View>

          <TouchableOpacity style={styles.filterBtn}
            onPress={() => router.push("transport/FilterScreen")}   // ✅ Expo Router Navigation
          >
            <Ionicons name="options-outline" size={20} color="#111" />
          </TouchableOpacity>
        </View>

        {transportData.map((item) => (
          <TransportCard key={item.id} item={item} />
        ))}

      </ScrollView>

      <BottomNav />
    </View>
  );
}
