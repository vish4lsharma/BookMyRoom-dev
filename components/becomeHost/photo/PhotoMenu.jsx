// components/becomeHost/photo/PhotoMenu.jsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../styles/photoStyles";

export default function PhotoMenu({ onClose, onSetCover, onReplace, onRemove }) {
  return (
    <View style={styles.menuPopup}>
      <TouchableOpacity style={styles.menuItem} onPress={onSetCover}>
        <Text style={styles.menuItemText}>Set as cover</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={onReplace}>
        <Text style={styles.menuItemText}>Replace photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={onRemove}>
        <Text style={[styles.menuItemText, { color: "#D00" }]}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
}
