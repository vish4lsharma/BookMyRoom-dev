// Web stub for react-native-maps
// This file provides empty implementations for web platform

import React from 'react';
import { View, Text } from 'react-native';

export const PROVIDER_GOOGLE = 'google';

const MapViewStub = ({ children, style, ...props }) => (
  <View style={[{ backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }, style]}>
    <Text style={{ color: '#666' }}>Map view is not available on web</Text>
    <Text style={{ color: '#999', marginTop: 5, fontSize: 12 }}>Please use mobile app for map features</Text>
    {children}
  </View>
);

const MarkerStub = () => null;

export default MapViewStub;
export const Marker = MarkerStub;

