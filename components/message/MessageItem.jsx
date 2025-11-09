// components/message/MessageItem.jsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import styles from "../../styles/messageStyles";

const MessageItem = ({ item, onSwipe, onPress }) => {
  const renderRightActions = () => (
    <TouchableOpacity
      onPress={onSwipe}
      style={{
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
      }}
    >
      <Text style={{ color: "#000" }}>Archive</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.messageRow} onPress={onPress}>
        <View style={styles.avatar}>
          <Ionicons name="person-circle" size={40} color="#555" />
        </View>

        <View style={styles.messageContent}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>{item.role}</Text>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>

        <View style={styles.messageMeta}>
          <Text style={styles.date}>{item.date}</Text>
          {item.unread && <View style={styles.unreadDot} />}
          {item.icon === "support-agent" ? (
            <MaterialIcons name={item.icon} size={20} color="#000" />
          ) : (
            item.icon && <Ionicons name={item.icon} size={20} color="#000" />
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default MessageItem;
