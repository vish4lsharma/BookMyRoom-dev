import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useMessages from "../../archives/ArchiveMessages";
import MessageItem from "../../components/message/MessageItem";

const { width } = Dimensions.get("window");

const SearchScreen = () => {
  const { messages } = useMessages(); // ✅ only active messages
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredData = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(query.toLowerCase()) ||
      msg.role.toLowerCase().includes(query.toLowerCase()) ||
      msg.id.toString().includes(query)
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* 🔙 Back + Search Bar container */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back("")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Search by name, role, or ID"
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
        </View>
      </View>

      {/* Results */}
      {filteredData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No results found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <MessageItem item={item} onSwipe={() => {}} />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "10%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "5%",
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    elevation: 2, // ✅ adds subtle shadow on Android
    shadowColor: "#000", // ✅ subtle shadow on iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 12,
    borderRadius: 25,
    height: width * 0.12,
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    marginLeft: 8,
    paddingVertical: 6,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: width * 0.04,
  },
});

export default SearchScreen;
