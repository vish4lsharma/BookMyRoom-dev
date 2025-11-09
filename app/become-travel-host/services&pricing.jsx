// app/become-travel-host/services-and-pricing.jsx
import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useRouter } from "expo-router";

import StepProgress from "../../components/becomeHost/common/StepProgress";
import StepFooter from "../../components/becomeHost/common/StepFooter";
import CarForm from "../../components/become-travel-host/travel/CarForm";
import CarList from "../../components/become-travel-host/travel/CarList";
import FullScreenImageModal from "../../components/become-travel-host/travel/FullScreenImageModal";

import stepStyles from "../../styles/stepStyles";

export default function ServicesAndPricing() {
  const router = useRouter();

  const [cars, setCars] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // number | null
  const editingCar = editingIndex !== null ? cars[editingIndex] : null;

  // fullscreen viewer
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerUri, setViewerUri] = useState(null);

  const addCar = (car) => setCars((prev) => [...prev, car]);

  const updateCar = (updated) =>
    setCars((prev) =>
      prev.map((c, i) => (i === editingIndex ? updated : c))
    );

  const removeCar = (index) => {
    setCars((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const onNext = () => {
    if (cars.length === 0) {
      alert("Add at least one car to continue.");
      return;
    }
    router.push({
      pathname: "/become-travel-host/booking-preferences",
      params: { cars: JSON.stringify(cars) },
    });
  };

  return (
    <View style={stepStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={stepStyles.scrollContent}
      >
        {/* Header */}
        <View style={stepStyles.headerRow}>
          <Text style={stepStyles.headerBtn}>Save & exit</Text>
          <Text style={stepStyles.headerBtn}>Need help?</Text>
        </View>

        {/* Title */}
        <Text style={stepStyles.sectionTitle}>Add Your Vehicle Details</Text>
        <Text style={stepStyles.subtitle}>
          List all your cars available for travel. You can add multiple vehicles.
          Include clear photos and accurate pricing (per km or per day).
        </Text>

        {/* Add / Edit Form */}
        <CarForm
          onAdd={addCar}
          onUpdate={updateCar}
          editingCar={editingCar}
          onCancelEdit={() => setEditingIndex(null)}
        />

        {/* List */}
        {cars.length > 0 && (
          <CarList
            cars={cars}
            onRemove={removeCar}
            onEdit={(car, index) => setEditingIndex(index)}
            onView={(uri) => {
              setViewerUri(uri);
              setViewerOpen(true);
            }}
          />
        )}
      </ScrollView>

      {/* Progress */}
      <StepProgress active={5} total={6} />

      {/* Footer */}
      <StepFooter onBack={() => router.back()} onNext={onNext} />

      {/* Fullscreen viewer shared for list taps */}
      <FullScreenImageModal
        visible={viewerOpen}
        uri={viewerUri}
        onClose={() => setViewerOpen(false)}
      />
    </View>
  );
}
