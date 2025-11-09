import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../../styles/exploreStyles';
import { router } from 'expo-router';

const TopTabs = () => (
  <View style={styles.topTabs}>
    <TouchableOpacity
      style={styles.tabItem}
      onPress={() => router.replace('explore/ExploreScreen')}
    >
      <Image
        source={require('../../assets/icons/flat-color-icons_home.png')} // Replace with your actual image path
        style={{ width: 25, height: 25 }}
      />
      <Text style={styles.tabText}>Rooms</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.tabItem}
      onPress={() => router.replace('explore/HistoryPage')}
    >
      <Image
        source={require('../../assets/icons/fluent-color_history-16.png')} // Replace with your actual image path
        style={{ width: 25, height: 25 }}
      />
      <Text style={styles.tabText}>History</Text>
    </TouchableOpacity>
  </View>
);

export default TopTabs;
