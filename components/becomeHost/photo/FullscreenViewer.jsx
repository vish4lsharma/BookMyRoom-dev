// components/becomeHost/photo/FullscreenViewer.jsx
import React from "react";
import ImageViewing from "react-native-image-viewing";

export default function FullscreenViewer({ visible, onClose, photos, startIndex = 0 }) {
  const images = photos.map((p) => ({ uri: p.uri }));
  return (
    <ImageViewing
      images={images}
      imageIndex={startIndex}
      visible={visible}
      onRequestClose={onClose}
    />
  );
}
