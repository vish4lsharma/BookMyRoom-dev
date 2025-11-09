import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import carStyles from "../../../styles/carStyles";

export default function CarList({ cars, onRemove, onEdit, onView }) {
  return (
    <View>
      <Text style={carStyles.carListTitle}>Your Added Vehicles</Text>

      {cars.map((car, index) => {
        const cover = car.photos?.[0];
        return (
          <View key={car.id || index} style={carStyles.carCard}>
            <View style={carStyles.cardTopRow}>
              {cover ? (
                <TouchableOpacity onPress={() => onView(cover)}>
                  <Image source={{ uri: cover }} style={carStyles.coverImage} />
                </TouchableOpacity>
              ) : (
                <View style={[carStyles.coverImage, { backgroundColor: "#F3F4F6" }]} />
              )}

              <View style={carStyles.cardDetails}>
                <Text style={carStyles.carName}>{car.name}</Text>
                <Text style={carStyles.carMeta}>Price: {car.price}</Text>
                <Text style={carStyles.carMeta}>Seats: {car.seating || "N/A"}</Text>
                <Text style={carStyles.carMeta}>Luggage: {car.luggage || "N/A"}</Text>
              </View>
            </View>

            {/* Thumbnails row */}
            {car.photos?.length > 1 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                <View style={carStyles.thumbsRow}>
                  {car.photos.slice(1).map((uri) => (
                    <TouchableOpacity key={uri} onPress={() => onView(uri)}>
                      <Image source={{ uri }} style={carStyles.miniThumb} />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            ) : null}

            {/* Actions */}
            <View style={carStyles.cardActions}>
              <TouchableOpacity style={carStyles.actionBtn} onPress={() => onEdit(car, index)}>
                <Text style={carStyles.actionLabel}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={carStyles.actionBtn} onPress={() => onRemove(index)}>
                <Text style={[carStyles.actionLabel, carStyles.danger]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}
