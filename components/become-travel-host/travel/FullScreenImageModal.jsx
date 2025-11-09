import React from "react";
import { Modal, View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function FullScreenImageModal({ visible, uri, onClose }) {
  if (!uri) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "100%", height: "85%" },
  closeBtn: { marginTop: 20, padding: 12, backgroundColor: "#fff", borderRadius: 10 },
  closeText: { fontSize: 16, fontWeight: "700" },
});
