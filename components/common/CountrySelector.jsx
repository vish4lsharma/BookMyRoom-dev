import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";

const COUNTRIES = [
  { flag: "🇮🇳", code: "+91", name: "India" },
  { flag: "🇺🇸", code: "+1", name: "United States" },
  { flag: "🇬🇧", code: "+44", name: "United Kingdom" },
  { flag: "🇦🇪", code: "+971", name: "UAE" },
  { flag: "🇸🇦", code: "+966", name: "Saudi Arabia" },
  { flag: "🇦🇺", code: "+61", name: "Australia" },
  // You can add more later
];

export default function CountrySelector({ selected, setSelected, styles }) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = COUNTRIES.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TouchableOpacity
        style={styles.countryCodeBox}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.flagText}>
          {selected.flag} {selected.code}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <View style={modalStyles.overlay}>
          <View style={modalStyles.container}>
            <Text style={modalStyles.heading}>Select Country</Text>

            <TextInput
              style={modalStyles.search}
              placeholder="Search country..."
              onChangeText={setSearch}
              value={search}
            />

            <FlatList
              data={filtered}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={modalStyles.item}
                  onPress={() => {
                    setSelected(item);
                    setVisible(false);
                  }}
                >
                  <Text style={modalStyles.itemText}>
                    {item.flag}  {item.name}  ({item.code})
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={modalStyles.close}
              onPress={() => setVisible(false)}
            >
              <Text style={modalStyles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  item: {
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
  },
  close: {
    marginTop: 10,
    alignSelf: "center",
  },
  closeText: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
