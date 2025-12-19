// Web stub for react-native-image-viewing
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ImageViewing = ({ images, imageIndex = 0, visible, onRequestClose }) => {
  if (!visible || !images || images.length === 0) return null;

  const currentImage = images[imageIndex] || images[0];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={onRequestClose}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {currentImage.uri ? (
            <Image
              source={{ uri: currentImage.uri }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.placeholder}>Image preview not available on web</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ImageViewing;

