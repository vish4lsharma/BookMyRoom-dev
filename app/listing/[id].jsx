import React from "react";
import { useLocalSearchParams } from "expo-router";
import ListingDetailsScreen from "../listing/ListingDetailsScreen";

export default function ListingPage() {
  const room = useLocalSearchParams(); 
  // room now contains all params pushed from card click

  return <ListingDetailsScreen room={room} />;
}
