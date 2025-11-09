import React from "react";
import { View, ScrollView } from "react-native";
import BottomNav from "../../components/common/BottomNav";
import SearchBar from "../../components/explore/SearchBar";
import TopTabs from "../../components/explore/TopTabs";
import SectionsList from "../../components/explore/SectionsList";
import styles from "../../styles/exploreStyles";
import { useWishlist } from "../_store/wishlistStore";
import { AntDesign } from "@expo/vector-icons";


const ExploreScreen = ({ navigation }) => {
  // Existing sample section
  const recommendedRooms = {
    id: "recommended",
    title: "Recommended Rooms",
    data: [
      { id: "r1", title: "Deluxe Suite", price: "$120/night", rating: "4.5", image: "https://picsum.photos/200" },
      { id: "r2", title: "AC Room", price: "$90/night", rating: "4.3", image: "https://picsum.photos/201" },
    ],
  };

  // New Bareilly items (as provided)
  const bareillyItems = [
    {
      id: "1",
      city: "Bareilly",
      title: "Private room in Bareilly",
      subtitle: "Ground-floor Room",
      details: "1 double bed",
      availableFrom: "20 Aug",
      price: 1000,
      unit: "24 hour",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "2",
      city: "Bareilly",
      title: "Cozy budget stay",
      subtitle: "1BHK Apartment",
      details: "1 double bed",
      availableFrom: "18 Aug",
      price: 1200,
      unit: "24 hour",
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "3",
      city: "Bareilly",
      title: "Sunlit private room",
      subtitle: "Shared Apartment",
      details: "1 queen bed",
      availableFrom: "22 Aug",
      price: 900,
      unit: "24 hour",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  // New section for Bareilly
  const bareillySection = {
    id: "bareilly",
    title: "Bareilly stays",
    data: bareillyItems.map((item) => ({
      // Normalize fields so SectionsList can render consistently
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      details: item.details,
      availableFrom: item.availableFrom,
      // Keep numeric price but also provide a displayPrice for existing card UIs
      price: item.price,
      unit: item.unit,
      displayPrice: `₹${item.price}/${item.unit}`,
      rating: String(item.rating),
      image: item.image,
      city: item.city,
    })),
  };

  const sections = [recommendedRooms, bareillySection];

  return (
    <View style={styles.container}>
      <SearchBar />
      <TopTabs />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionsList sections={sections} styles={styles} />
      </ScrollView>
      <BottomNav active="Explore" navigation={navigation} />
    </View>
  );
};

export default ExploreScreen;
