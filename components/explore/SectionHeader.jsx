import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SectionHeader({ title, styles, rooms }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/explore/sectionRooms",
            params: {
              title,
              rooms: JSON.stringify(rooms), // send all rooms of this section
            },
          })
        }
      >
        <Ionicons name="chevron-forward" size={18} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
