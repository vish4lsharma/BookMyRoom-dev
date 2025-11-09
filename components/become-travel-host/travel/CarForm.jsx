import React, { useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import FullScreenImageModal from "./FullScreenImageModal";
import carStyles from "../../../styles/carStyles";

export default function CarForm({
  onAdd,
  onUpdate,
  editingCar = null,     // { id, name, price, seating, luggage, photos[] }
  onCancelEdit,
}) {
  const [car, setCar] = useState({
    id: Date.now().toString(),
    name: "",
    price: "",
    seating: "",
    luggage: "",
    photos: [], // array of URIs
  });

  useEffect(() => {
    if (editingCar) setCar(editingCar);
  }, [editingCar]);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerUri, setViewerUri] = useState(null);

  const addPhotoFromGallery = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.85,
      // On iOS you could also enable multiple selection:
      // allowsMultipleSelection: true,
      // selectionLimit: 6,
    });
    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri;
      if (uri) setCar((c) => ({ ...c, photos: [...c.photos, uri] }));
    }
  };

  const addPhotoFromCamera = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    const result = await ImagePicker.launchCameraAsync({ quality: 0.85 });
    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri;
      if (uri) setCar((c) => ({ ...c, photos: [...c.photos, uri] }));
    }
  };

  const removePhoto = (uri) =>
    setCar((c) => ({ ...c, photos: c.photos.filter((p) => p !== uri) }));

  const handleSubmit = () => {
    if (!car.name.trim() || !car.price.trim() || car.photos.length === 0) {
      Alert.alert("Missing info", "Please add car name, price and at least one photo.");
      return;
    }
    if (editingCar) {
      onUpdate(car);
      onCancelEdit?.();
    } else {
      onAdd(car);
      // reset for new entry
      setCar({
        id: Date.now().toString(),
        name: "",
        price: "",
        seating: "",
        luggage: "",
        photos: [],
      });
    }
  };

  return (
    <View style={carStyles.formContainer}>

      <View style={carStyles.formHeaderRow}>
        <Text style={carStyles.formTitle}>{editingCar ? "Edit Vehicle" : "Add Vehicle"}</Text>
        {editingCar ? (
          <TouchableOpacity onPress={onCancelEdit}>
            <Text style={carStyles.cancelEdit}>Cancel edit</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={carStyles.label}>Car Model Name *</Text>
      <TextInput
        style={carStyles.input}
        value={car.name}
        onChangeText={(v) => setCar((c) => ({ ...c, name: v }))}
        placeholder="e.g., Suzuki Alto, Dzire, i10"
      />

      <Text style={carStyles.label}>Price (Per KM or Per Day) *</Text>
      <TextInput
        style={carStyles.input}
        keyboardType="numeric"
        value={car.price}
        onChangeText={(v) => setCar((c) => ({ ...c, price: v }))}
        placeholder="e.g., ₹12/km or ₹1800/day"
      />

      <Text style={carStyles.label}>Seating Capacity</Text>
      <TextInput
        style={carStyles.input}
        keyboardType="numeric"
        value={car.seating}
        onChangeText={(v) => setCar((c) => ({ ...c, seating: v }))}
        placeholder="e.g., 4"
      />

      <Text style={carStyles.label}>Luggage Capacity</Text>
      <TextInput
        style={carStyles.input}
        value={car.luggage}
        onChangeText={(v) => setCar((c) => ({ ...c, luggage: v }))}
        placeholder="e.g., 2 medium bags"
      />

      {/* Photo add toolbar */}
      <View style={carStyles.photoToolbar}>
        <TouchableOpacity style={carStyles.pillBtn} onPress={addPhotoFromCamera}>
          <Text style={carStyles.pillLabel}>📷 Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={carStyles.pillBtn} onPress={addPhotoFromGallery}>
          <Text style={carStyles.pillLabel}>🖼️ Gallery</Text>
        </TouchableOpacity>
      </View>

      {/* Thumbnails */}
      <View style={carStyles.thumbsGrid}>
        {car.photos.map((uri) => (
          <View key={uri} style={carStyles.thumbWrap}>
            <TouchableOpacity onPress={() => { setViewerUri(uri); setViewerOpen(true); }}>
              <Image source={{ uri }} style={carStyles.thumb} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removePhoto(uri)} style={carStyles.removeThumb}>
              <Text style={carStyles.removeThumbText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add more tile (secondary) */}
        <TouchableOpacity style={carStyles.addTile} onPress={addPhotoFromGallery}>
          <Ionicons name="add" size={20} color="#6B7280" />
          <Text style={carStyles.addTileText}>Add</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={carStyles.addButton} onPress={handleSubmit}>
        <Text style={carStyles.addButtonText}>
          {editingCar ? "Save Changes" : "Add Car"}
        </Text>
      </TouchableOpacity>

      <FullScreenImageModal
        visible={viewerOpen}
        uri={viewerUri}
        onClose={() => setViewerOpen(false)}
      />
    </View>
  );
}
