import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/addressStyles";
import { COUNTRY_LIST } from "../../becomeHost/review/AddressFields"; // Reuse same list ✅

export default function CountryPicker({ country, setCountry }) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = COUNTRY_LIST.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <View style={styles.inputWrap}>
        <Text style={styles.label}>Country/region</Text>

        <TouchableOpacity style={[styles.inputBase, styles.inputDisabled]} onPress={() => setVisible(true)}>
          <Text style={styles.disabledText}>{country}</Text>
          <Ionicons name="chevron-down" size={18} color="#555" />
        </TouchableOpacity>
      </View>

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>

            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color="#555" />
              <TextInput
                placeholder="Search country..."
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <FlatList
              data={filtered}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setCountry(item);
                    setVisible(false);
                    setSearch("");
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
