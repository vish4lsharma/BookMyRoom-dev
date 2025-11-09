// app/become-host/photos.jsx
import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import stepStyles from "../../styles/stepStyles";
import ProgressBar from "../../components/becomeHost/common/StepProgress";
import FooterNav from "../../components/becomeHost/common/StepFooter";
import PhotoGrid from "../../components/becomeHost/photo/PhotoGrid";

export default function PhotosScreen() {
  const router = useRouter();

  const [photos, setPhotos] = useState([]);       // [{ id, uri }]
  const [coverId, setCoverId] = useState(null);

  const canContinue = useMemo(() => photos.length >= 5, [photos]);

  const handleSetCover = (id) => setCoverId(id);
  const handleReplace  = (id, uri) =>
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, uri } : p)));
  const handleRemove   = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (coverId === id) setCoverId(null);
  };

  const onNext = () => {
    if (!canContinue) return; // Button disabled, so just guard
    // Persist or pass data forward if needed
    router.push("/become-host/step3");
  };

  return (
    <View style={stepStyles.container}>
      {/* Top small header row */}
      <View style={stepStyles.headerRow}>
        <Text style={stepStyles.headerBtn}>Save & exit</Text>
        <Text style={stepStyles.headerBtn}>Questions?</Text>
      </View>

      {/* Title */}
      <Text style={stepStyles.sectionTitle}>Upload at least 5 images</Text>
      <Text style={stepStyles.subtitle}>Your photos</Text>

      <PhotoGrid
        photos={photos}
        setPhotos={setPhotos}
        coverId={coverId}
        onSetCover={handleSetCover}
        onReplace={handleReplace}
        onRemove={handleRemove}
      />

      {/* Step progress (set your step index here) */}
      <ProgressBar active={6} total={12} />

      {/* Footer (Back / Next) */}
      <FooterNav
        onBack={() => router.back()}
        onNext={onNext}
        nextDisabled={!canContinue}
      />
    </View>
  );
}
