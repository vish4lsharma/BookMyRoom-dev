import React from "react";
import { View, FlatList } from "react-native";
import SectionHeader from "./SectionHeader";
import RoomCard from "./RoomCard";
import { useWishlist } from "../../app/_store/wishlistStore";

export default function SectionsList({ sections, styles }) {
  const { list } = useWishlist(); // 👈 track wishlist state

  return (
    <>
      {sections.map((section) => (
        <View key={section.id} style={styles.section}>
  <SectionHeader title={section.title} styles={styles} rooms={section.data} />

          <FlatList
            data={section.data}
            renderItem={({ item }) => <RoomCard item={item} styles={styles} />}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            extraData={list} // 👈 forces re-render when wishlist updates
          />
        </View>
      ))}
    </>
  );
}
