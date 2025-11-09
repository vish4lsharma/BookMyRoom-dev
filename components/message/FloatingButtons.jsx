import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // ✅ Expo Router
import styles from "../../styles/messageStyles";

const FloatingButtons = ({ onButtonPress, activeButton }) => {
  const router = useRouter();

  return (
    <View style={styles.floatingButtons}>
      {/* Search */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("messages/search")} // ✅ go to SearchScreen
      >
        <Ionicons
          name="search"
          size={20}
          color={activeButton === "search" ? "#fff" : "#000"}
        />
      </TouchableOpacity>

      {/* Chat (⚡simple, no filtering, opens feedback modal maybe) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => onButtonPress("chat")}
      >
        <Ionicons
          name="chatbox-ellipses"
          size={20}
          color={activeButton === "chat" ? "#fff" : "#000"}
        />
      </TouchableOpacity>

      {/* Archive */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => onButtonPress("archive")}
      >
        <Ionicons
          name="archive"
          size={20}
          color={activeButton === "archive" ? "#fff" : "#000"}
        />
      </TouchableOpacity>

      {/* Transport */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => onButtonPress("car")}
      >
        <Ionicons
          name="car"
          size={20}
          color={activeButton === "car" ? "#fff" : "#000"}
        />
      </TouchableOpacity>

      {/* Support */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => onButtonPress("support")}
      >
        <MaterialIcons
          name="support-agent"
          size={20}
          color={activeButton === "support" ? "#fff" : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButtons;
