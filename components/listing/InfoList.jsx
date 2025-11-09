import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InfoList({ sections = [] }) {
  return (
    <View style={{ marginTop: 16 }}>
      {sections.map((s, i) => (
        <View key={i} style={styles.item}>
          <Text style={styles.title}>{s.title}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
            <Text style={styles.value}>{s.value}</Text>
            {s.chevron && (
              <Ionicons name="chevron-forward" size={18} color="#777" style={{ marginTop: 2 }} />
            )}
          </View>

          {s.showMore && (
            <TouchableOpacity style={styles.linkBtn}>
              <Text style={styles.linkTxt}>Show more</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: { paddingVertical: 14, borderBottomWidth: 1, borderColor: "#eee" },
  title: { fontWeight: "800", color: "#111", marginBottom: 8 },
  value: { color: "#444", flex: 1, lineHeight: 18 },
  linkBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 10,
  },
  linkTxt: { fontWeight: "700", color: "#111" },
});
