import React, { useRef } from "react";
import { View, Image, FlatList, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const height = Math.round(width * 0.72);

export default function HeaderCarousel({ images = [], index = 0, onIndexChange }) {
  const ref = useRef(null);

  return (
    <View style={styles.wrap}>
      <FlatList
        ref={ref}
        data={images}
        keyExtractor={(uri, i) => `${uri}-${i}`}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(
            e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
          );
          onIndexChange?.(idx);
        }}
      />

      {/* dot indicator */}
      <View style={styles.dots}>
        {images.map((_, i) => (
          <View key={i} style={[styles.dot, index === i && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width, height, backgroundColor: "#000" },
  image: { width, height, resizeMode: "cover" },
  dots: {
    position: "absolute",
    right: 12,
    bottom: 12,
    flexDirection: "row",
    gap: 6,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#ffffff70" },
  dotActive: { backgroundColor: "#fff" },
});
