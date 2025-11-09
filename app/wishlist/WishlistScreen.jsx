import React from "react";
import { View, ScrollView, Text } from "react-native";
import RecentlyViewed from "../../components/wishlist/RecentlyViewed";
import WishlistCard from "../../components/wishlist/WishlistCard";
import BottomNav from "../../components/common/BottomNav";
import styles from "../../styles/wishlistStyles";

import { useWishlist } from "../_store/wishlistStore"; 
import { useRecentStore } from "../_store/recentStore"; // ✅ import recent store

const WishlistScreen = () => {
  const { list, remove } = useWishlist();
  const recent = useRecentStore((state) => state.recent); // ✅ get recently viewed list

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlists</Text>

      {/* ✅ Show recently viewed even if not wishlisted */}
      {recent.length > 0 && <RecentlyViewed rooms={recent} />}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {list.length > 0 ? (
          list.map((room) => (
            <WishlistCard key={room.id} room={room} onToggleHeart={() => remove(room.id)} />
          ))
        ) : (
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#555", padding: 16 }}>
              You have not added any rooms to your wishlist yet.
            </Text>
          </View>
        )}
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default WishlistScreen;
