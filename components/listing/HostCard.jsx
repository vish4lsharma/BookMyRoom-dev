import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HostCard({ host }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Meet your host</Text>

      <View style={styles.row}>
        <Image source={{ uri: host.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text style={styles.name}>{host.name}</Text>
            {host.isSuperhost && (
              <View style={styles.super}>
                <Ionicons name="star" size={12} color="#fff" />
              </View>
            )}
          </View>

          <View style={styles.statsRow}>
            <Stat label="Reviews" value={host.stats.reviews} />
            <Stat label="Rating" value={host.stats.rating} />
            <Stat label="Years hosting" value={host.stats.years} />
          </View>
        </View>
      </View>

      {/* About lines */}
      <View style={{ marginTop: 10, gap: 8 }}>
        {host.badges.map((b, i) => (
          <View key={i} style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Ionicons name={b.icon} size={16} color="#111" />
            <Text style={{ color: "#111" }}>{b.text}</Text>
          </View>
        ))}
      </View>

      {/* response info */}
      <View style={styles.response}>
        <Text style={{ color: "#666" }}>
          Response rate: <Text style={styles.bold}>{host.response.rate}</Text>
        </Text>
        <Text style={{ color: "#666" }}>
          Responds <Text style={styles.bold}>{host.response.time}</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.msgBtn}>
        <Text style={styles.msgText}>Message host</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        To help protect your payment, always use Airbnb to send money and communicate with hosts.
      </Text>
    </View>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 16 },
  heading: { fontWeight: "800", fontSize: 16, color: "#111", marginBottom: 10 },
  row: { flexDirection: "row", gap: 12, alignItems: "center" },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#eee" },
  name: { fontWeight: "800", fontSize: 16, color: "#111" },
  super: {
    width: 18, height: 18, borderRadius: 9, backgroundColor: "#FF385C",
    alignItems: "center", justifyContent: "center",
  },
  statsRow: { flexDirection: "row", gap: 16, marginTop: 6, flexWrap: "wrap" },
  stat: { alignItems: "flex-start" },
  statValue: { fontWeight: "800", color: "#111" },
  statLabel: { color: "#777", fontSize: 12 },
  response: { marginTop: 10, gap: 2 },
  bold: { fontWeight: "700", color: "#111" },
  msgBtn: {
    marginTop: 12, alignSelf: "flex-start",
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12,
    backgroundColor: "#111",
  },
  msgText: { color: "#fff", fontWeight: "700" },
  disclaimer: { marginTop: 10, color: "#777", fontSize: 12 },
});
