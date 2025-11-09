import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/messageStyles";

const Header = ({ onMenuPress, onAllPress }) => {
  return (
    <View style={[styles.header, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
      <Text style={styles.title}>Messages</Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Filter Button */}
        <TouchableOpacity style={styles.filterBtn} onPress={onAllPress}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>

        {/* 3-dot Menu */}
        <TouchableOpacity onPress={onMenuPress} style={{ marginLeft: 12 }}>
          <Ionicons name="ellipsis-vertical" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
