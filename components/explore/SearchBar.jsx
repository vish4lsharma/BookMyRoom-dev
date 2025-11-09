import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/exploreStyles";
import { router } from "expo-router";

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <Ionicons name="search" size={25} color="#555" />
    <TouchableOpacity onPress={() => router.push("/search/searchindex")}>
      <Text style={styles.searchInput}>Enter Your Search</Text>
    </TouchableOpacity>
  </View>
);

export default SearchBar;
