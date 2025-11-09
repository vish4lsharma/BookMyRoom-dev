import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";   // ✅ NEW
import ProfileInputRow from "../../components/profile/ProfileInputRow";
import { router } from "expo-router";
import { useProfileStore } from "../_store/profileStore";

export default function EditProfileScreen() {
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState(null); // ✅ NEW

  // ✅ Open gallery
const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!result.canceled) {
    setAvatar(result.assets[0].uri);       // local state
    setAvatarGlobal(result.assets[0].uri); // ✅ save globally
  }
};

const takePhoto = async () => {
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 0.8,
  });

  if (!result.canceled) {
    setAvatar(result.assets[0].uri);
    setAvatarGlobal(result.assets[0].uri);
  }
};

const setAvatarGlobal = (uri) => {
  useProfileStore.getState().setAvatar(uri);
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit your Profile</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="#111" />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={styles.center}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="cover" />
          ) : (
            <View style={[styles.avatar, { backgroundColor: "#111" }]}>
              <Text style={styles.avatarText}>Y</Text>
            </View>
          )}

          <TouchableOpacity style={styles.addBtn} onPress={pickImage}>
  <Ionicons name="images-outline" size={18} color="#111" />
  <Text style={styles.addBtnText}>Gallery</Text>
</TouchableOpacity>

<TouchableOpacity style={[styles.addBtn, { marginTop: 8 }]} onPress={takePhoto}>
  <Ionicons name="camera-outline" size={18} color="#111" />
  <Text style={styles.addBtnText}>Camera</Text>
</TouchableOpacity>
        </View>


        {/* Section Info */}
        <Text style={styles.sectionTitle}>My profile</Text>
        <Text style={styles.sectionDesc}>
          Your profile helps hosts and guests get to know you better.
        </Text>

        {/* Input Fields */}
        <ProfileInputRow icon="briefcase-outline" placeholder="What I Do ?" />
        <ProfileInputRow icon="location-outline" placeholder="Where ?" />
        <ProfileInputRow icon="paw-outline" placeholder="Pet ?" />
        <ProfileInputRow icon="calendar-outline" placeholder="Date I was born" />
        <ProfileInputRow icon="school-outline" placeholder="Where I went to school ?" />
        <ProfileInputRow icon="globe-outline" placeholder="Language I speak" />
        <ProfileInputRow icon="home-outline" placeholder="Where I live ?" />

        {/* About Me Box */}
        <Text style={styles.aboutTitle}>About Me</Text>
        <TextInput
          style={styles.aboutBox}
          multiline
          placeholder="Share a little about yourself"
          value={about}
          onChangeText={setAbout}
          placeholderTextColor="#888"
        />

        {/* Done Button */}
        <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff",paddingTop: 40, paddingBottom: 16 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },

  center: { alignItems: "center", marginTop: 10 },
avatar: {
  width: 110,
  height: 110,
  borderRadius: 55,
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
},
avatarText: { fontSize: 48, fontWeight: "700", color: "#fff" },
addBtn: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 6,
  paddingHorizontal: 16,
  borderRadius: 30,
  borderWidth: 1,
  borderColor: "#ccc",
  backgroundColor: "#fff",
  marginTop: -20,
},

  addBtnText: { marginLeft: 6, fontSize: 14, fontWeight: "600" },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginTop: 20, paddingHorizontal: 16 },
  sectionDesc: { paddingHorizontal: 16, color: "#777", marginTop: 6, marginBottom: 14 },

  aboutTitle: { fontSize: 16, fontWeight: "700", marginTop: 20, paddingHorizontal: 16 },
  aboutBox: {
    marginHorizontal: 16,
    height: 120,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
    textAlignVertical: "top",
  },

  doneBtn: {
    backgroundColor: "#111",
    marginHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 30,
    marginBottom: 40,
    alignItems: "center",
  },
  doneText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
