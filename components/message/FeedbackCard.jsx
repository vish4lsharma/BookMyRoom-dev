import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";

const normalize = (size, fontScale) => Math.round(size * fontScale);

const FeedbackCard = ({ visible, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const { width, height, fontScale } = useWindowDimensions();
  const isTablet = width >= 768;

  const dynamic = useMemo(
    () => ({
      card: {
        width: Math.min(width, 600),               // cap width for tablets
        alignSelf: "center",
        padding: Math.max(16, Math.round(width * 0.04)),
        minHeight: Math.max(220, Math.round(height * 0.28)),
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      },
      title: { fontSize: normalize(isTablet ? 20 : 18, fontScale) },
      subtitle: { fontSize: normalize(isTablet ? 16 : 14, fontScale) },
      input: {
        minHeight: Math.max(100, Math.round(height * 0.18)),
      },
      sendBtn: {
        paddingVertical: Math.max(12, Math.round(height * 0.016)),
      },
    }),
    [width, height, fontScale, isTablet]
  );

  const handleSend = () => {
    if (!feedback.trim()) return;
    console.log("Feedback submitted:", feedback);
    setFeedback("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.safe}>
          <View style={[styles.card, dynamic.card]}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.title, dynamic.title]}>
                Share your feedback Here
              </Text>
              <TouchableOpacity onPress={onClose} accessibilityLabel="Close">
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.subtitle, dynamic.subtitle]}>
              Share your experience with us.
            </Text>

            {/* Input */}
            <TextInput
              style={[styles.input, dynamic.input]}
              placeholder="Write your feedback..."
              placeholderTextColor="#999"
              value={feedback}
              onChangeText={setFeedback}
              multiline
            />

            {/* Send button */}
            <TouchableOpacity
              style={[
                styles.sendBtn,
                dynamic.sendBtn,
                feedback.trim() ? styles.sendEnabled : null,
              ]}
              onPress={handleSend}
              disabled={!feedback.trim()}
            >
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  safe: {
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontWeight: "600",
  },
  closeBtn: {
    fontSize: 20,
    color: "#333",
    padding: 4,
  },
  subtitle: {
    color: "#666",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  sendBtn: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
  },
  sendEnabled: {
    backgroundColor: "#000",
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default FeedbackCard;
