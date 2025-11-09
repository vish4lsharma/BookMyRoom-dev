// components/becomeHost/photo/PhotoGrid.jsx
import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { Ionicons } from "@expo/vector-icons";
import PhotoTile from "./PhotoTile";
import FullscreenViewer from "./FullscreenViewer";
import styles from "../../../styles/photoStyles";

export default function PhotoGrid({
  photos,
  setPhotos,
  coverId,
  onSetCover,
  onReplace,
  onRemove,
}) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [replaceTarget, setReplaceTarget] = useState(null);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  // ask permissions once
  useEffect(() => {
    (async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
    })();
  }, []);

  const addNewPhoto = (uri) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setPhotos((prev) => [...prev, { id, uri }]);
  };

  const openPicker = (replaceId = null) => {
    setReplaceTarget(replaceId);
    setPickerVisible(true);
  };

  const pickFromGallery = async () => {
  setPickerVisible(false);
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ FIXED
    quality: 0.85,
    allowsEditing: false,
  });
  if (!result.canceled) {
    const uri = result.assets?.[0]?.uri;
    if (!uri) return;
    if (replaceTarget) onReplace(replaceTarget, uri);
    else addNewPhoto(uri);
    setReplaceTarget(null);
  }
};

const pickFromCamera = async () => {
  setPickerVisible(false);
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ FIXED
    quality: 0.85,
  });
  if (!result.canceled) {
    const uri = result.assets?.[0]?.uri;
    if (!uri) return;
    if (replaceTarget) onReplace(replaceTarget, uri);
    else addNewPhoto(uri);
    setReplaceTarget(null);
  }
};

  const renderItem = ({ item, index, drag }) => (
    <ScaleDecorator>
      <PhotoTile
        item={item}
        isCover={item.id === coverId}
        onLongPress={drag}
        onView={() => {
          setViewerIndex(index);
          setViewerOpen(true);
        }}
        onSetCover={() => onSetCover(item.id)}
        onReplace={() => openPicker(item.id)}
        onRemove={() => onRemove(item.id)}
      />
    </ScaleDecorator>
  );

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        data={photos}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setPhotos(data)}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.rowBetween}
        contentContainerStyle={styles.gridPad}
        ListFooterComponent={
          <TouchableOpacity style={styles.addTile} onPress={() => openPicker(null)}>
            <Ionicons name="add" size={28} color="#666" />
            <Text style={styles.addText}>Add more</Text>
          </TouchableOpacity>
        }
      />

      {/* Fullscreen viewer */}
      <FullscreenViewer
        visible={viewerOpen}
        onClose={() => setViewerOpen(false)}
        photos={photos}
        startIndex={viewerIndex}
      />

      {/* Picker Modal */}
      <Modal visible={pickerVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setPickerVisible(false)}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.modalBtn} onPress={pickFromCamera}>
              <Ionicons name="camera-outline" size={20} color="#111" />
              <Text style={styles.modalText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalBtn} onPress={pickFromGallery}>
              <Ionicons name="image-outline" size={20} color="#111" />
              <Text style={styles.modalText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
