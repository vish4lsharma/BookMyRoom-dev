import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function EditFieldModal({ title, placeholder, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={26} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 45 },
  headerRow: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  save: { fontSize: 16, color: "#007AFF", fontWeight: "600" },
  input: {
    marginTop: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    padding: 12,
    fontSize: 16,
  },
});
