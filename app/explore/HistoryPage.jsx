import React from "react";
import { View, ScrollView, Text } from "react-native";
import TopTabs from "../../components/explore/TopTabs";
import styles from "../../styles/exploreStyles";
import SearchBar from "../../components/explore/SearchBar";

const HistoryPage = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <TopTabs />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 200, alignItems: "center" }}>
          <Text style={{fontSize:100,}}>😢</Text>
          <Text style={{fontSize: 20, color: "#555" }}>
            Your calendar is waiting{"\n"}— no bookings added
          </Text>
        </View>
      </ScrollView>

     
    </View>
  );
};

export default HistoryPage;
