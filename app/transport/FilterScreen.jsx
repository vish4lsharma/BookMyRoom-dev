import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FilterSection from "../../components/filter/FilterSection";
import FilterChip from "../../components/filter/FilterChip";
import styles from "../../styles/filterStyles";
import { useRouter } from "expo-router";

export default function FilterScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState({});

  const toggle = (category, value) => {
    setSelected(prev => ({
      ...prev,
      [category]: prev[category] === value ? null : value,
    }));
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Filter</Text>
        <TouchableOpacity onPress={() => setSelected({})}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* QUICK FILTERS */}
        <FilterSection title="Quick Filters">
          <FilterChip label="Top Rated" icon="star" isSelected={selected.quick === "Top Rated"} onPress={() => toggle("quick", "Top Rated")} />
          <FilterChip label="Quick Response" icon="flash" isSelected={selected.quick === "Quick Response"} onPress={() => toggle("quick", "Quick Response")} />
          <FilterChip label="Jd Verified" icon="checkmark-done" isSelected={selected.quick === "Jd Verified"} onPress={() => toggle("quick", "Jd Verified")} />
          <FilterChip label="Jd Trust" icon="shield-checkmark" isSelected={selected.quick === "Jd Trust"} onPress={() => toggle("quick", "Jd Trust")} />
        </FilterSection>

        {/* SORT BY */}
        <FilterSection title="Sort by">
          {["Relevance", "Rating", "Popular", "Distance"].map(item => (
            <FilterChip key={item} label={item} isSelected={selected.sort === item} onPress={() => toggle("sort", item)} />
          ))}
        </FilterSection>

        {/* VEHICLE TYPE */}
        <FilterSection title="Vehicle Type">
          {["Lorry", "Trailer", "Truck", "Car", "Container", "Tempo"].map(item => (
            <FilterChip key={item} label={item} isSelected={selected.vehicle === item} onPress={() => toggle("vehicle", item)} />
          ))}
        </FilterSection>

        {/* LOAD TYPE */}
        <FilterSection title="Load Type">
          {["Full Load", "Part Load"].map(item => (
            <FilterChip key={item} label={item} isSelected={selected.load === item} onPress={() => toggle("load", item)} />
          ))}
        </FilterSection>

        {/* GOODS TYPE */}
        <FilterSection title="Goods Type">
          {["Refrigerated Goods", "Oil Goods"].map(item => (
            <FilterChip key={item} label={item} isSelected={selected.goods === item} onPress={() => toggle("goods", item)} />
          ))}
        </FilterSection>

        {/* TRAILER TYPE */}
        <FilterSection title="Trailer Type">
          {["40ft Trailer", "20ft Trailer", "Over Dimensional Cargo"].map(item => (
            <FilterChip key={item} label={item} isSelected={selected.trailer === item} onPress={() => toggle("trailer", item)} />
          ))}
        </FilterSection>

        {/* RATINGS */}
        <FilterSection title="Ratings">
          {["Any", "3.5+", "4.0+", "4.5+", "5.0"].map(item => (
            <FilterChip key={item} label={item} icon="star" isSelected={selected.rating === item} onPress={() => toggle("rating", item)} />
          ))}
        </FilterSection>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* APPLY BUTTON */}
      <TouchableOpacity style={styles.applyBtn} onPress={() => router.back()}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}
