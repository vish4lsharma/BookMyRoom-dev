// components/becomeHost/review/AddressFields.jsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import stepStyles from "../../../styles/stepStyles";

export const COUNTRY_LIST = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia",
  "Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",
  "Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria",
  "Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Chile","China","Colombia","Costa Rica",
  "Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominican Republic","Ecuador",
  "Egypt","El Salvador","Estonia","Ethiopia","Fiji","Finland","France","Georgia","Germany","Ghana",
  "Greece","Grenada","Guatemala","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia",
  "Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kenya","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Lithuania","Luxembourg","Madagascar","Malawi",
  "Malaysia","Maldives","Mali","Malta","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro",
  "Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Nigeria",
  "North Korea","North Macedonia","Norway","Oman","Pakistan","Panama","Paraguay","Peru","Philippines",
  "Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saudi Arabia","Senegal","Serbia","Seychelles",
  "Sierra Leone","Singapore","Slovakia","Slovenia","Somalia","South Africa","South Korea","Spain",
  "Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania",
  "Thailand","Turkey","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States",
  "Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

export default function AddressFields({ country, setCountry, address, updateField, showError }) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = COUNTRY_LIST.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Text style={stepStyles.sectionTitle}>What’s your residential address?</Text>
      <Text style={stepStyles.smallText}>Guests won’t see this information.</Text>

      {/* Country dropdown */}
      <TouchableOpacity style={stepStyles.inputRow} onPress={() => setPickerVisible(true)}>
        <Text style={stepStyles.inputText}>{country}</Text>
        <Ionicons name="chevron-down" size={18} color="#555" />
      </TouchableOpacity>

      {/* Country Picker Modal */}
      <Modal transparent animationType="fade" visible={pickerVisible}>
        <View style={stepStyles.modalBackdrop}>
          <View style={stepStyles.modalBox}>
            <View style={stepStyles.searchBar}>
              <Ionicons name="search" size={18} color="#555" />
              <TextInput
                placeholder="Search country..."
                style={{ flex: 1, marginLeft: 8 }}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <FlatList
              data={filtered}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={stepStyles.modalItem}
                  onPress={() => {
                    setCountry(item);
                    setPickerVisible(false);
                    setSearch("");
                  }}
                >
                  <Text style={stepStyles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Address Inputs */}
      <TextInput
        style={stepStyles.input}
        placeholder="Flat, house, etc. (optional)"
        value={address.flat}
        onChangeText={(v) => updateField("flat", v)}
      />

      <TextInput
        style={[stepStyles.input, showError && !address.street && stepStyles.errorInput]}
        placeholder="Street address *"
        value={address.street}
        onChangeText={(v) => updateField("street", v)}
      />

      <TextInput
        style={stepStyles.input}
        placeholder="Nearby landmark (optional)"
        value={address.landmark}
        onChangeText={(v) => updateField("landmark", v)}
      />

      <TextInput
        style={[stepStyles.input, showError && !address.city && stepStyles.errorInput]}
        placeholder="City / Town *"
        value={address.city}
        onChangeText={(v) => updateField("city", v)}
      />

      <TextInput
        style={[stepStyles.input, showError && !address.state && stepStyles.errorInput]}
        placeholder="State *"
        value={address.state}
        onChangeText={(v) => updateField("state", v)}
      />

      <TextInput
  style={[stepStyles.input, showError && !address.pincode && stepStyles.errorInput]}
  placeholder="PIN Code *"
  keyboardType="number-pad"
  value={address.pincode}
  onChangeText={(v) => updateField("pincode", v)}
/>

{showError && (
  <Text style={stepStyles.errorMsg}>⚠️ Please fill all required fields.</Text>
)}

<View style={stepStyles.divider} />

    </>
  );
}
