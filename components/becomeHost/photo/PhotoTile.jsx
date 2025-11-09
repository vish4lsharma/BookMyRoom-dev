// components/becomeHost/photo/PhotoTile.jsx
import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PhotoMenu from "./PhotoMenu";
import styles from "../../../styles/photoStyles";

export default function PhotoTile({
  item,
  isCover,
  onLongPress,
  onView,
  onSetCover,
  onReplace,
  onRemove,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.tileWrap}>
      {/* Close menu if user taps anywhere else */}
      {menuOpen && (
        <Pressable style={styles.menuBackdrop} onPress={() => setMenuOpen(false)} />
      )}

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onView}
        onLongPress={onLongPress}
        style={styles.tile}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />

        {isCover && (
          <View style={styles.coverBadge}>
            <Text style={styles.coverText}>Cover</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuOpen((prev) => !prev)}
        >
          <Ionicons name="ellipsis-horizontal" size={18} color="#111" />
        </TouchableOpacity>
      </TouchableOpacity>

      {menuOpen && (
        <PhotoMenu
          onSetCover={() => {
            setMenuOpen(false);
            onSetCover();
          }}
          onReplace={() => {
            setMenuOpen(false);
            onReplace();
          }}
          onRemove={() => {
            setMenuOpen(false);
            onRemove();
          }}
        />
      )}
    </View>
  );
}
