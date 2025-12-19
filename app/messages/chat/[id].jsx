import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { messagesAPI } from "../../../services/api";

const { width } = Dimensions.get("window");
const bubbleBase = {
  maxWidth: "78%",
  paddingVertical: width * 0.02,
  paddingHorizontal: width * 0.03,
  borderRadius: 14,
};

const Header = ({ name, role, onBack }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <Ionicons name="chevron-back" size={26} color="#111" />
    </TouchableOpacity>
    <View style={styles.avatar}>
      <Ionicons name="person" size={22} color="#555" />
    </View>
    <View style={styles.headerText}>
      <Text style={styles.headerName}>{name}</Text>
      <Text style={styles.headerRole}>{role}</Text>
    </View>
  </View>
);

const Bubble = ({ item }) => {
  const isMe = item.from === "me";
  return (
    <View
      style={[styles.bubbleWrapper, isMe ? styles.bubbleMeWrapper : null]}
    >
      <View
        style={[
          bubbleBase,
          isMe ? styles.bubbleMe : styles.bubbleOther,
        ]}
      >
        <Text style={styles.bubbleText}>{item.text}</Text>
        <Text style={styles.bubbleTime}>{item.time}</Text>
      </View>
    </View>
  );
};

const InputBar = ({ value, onChangeText, onSend, onMic }) => {
  const canSend = value.trim().length > 0;
  return (
    <View style={styles.inputBar}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Message"
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          returnKeyType="send"
          onSubmitEditing={() => (canSend ? onSend() : null)}
        />
        {/* <TouchableOpacity onPress={onMic} style={styles.micButton}>
          <Ionicons name="mic" size={22} color="#444" />
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity
        onPress={onSend}
        disabled={!canSend}
        style={[
          styles.sendButton,
          { backgroundColor: canSend ? "#1c9f4a" : "#c9e7d4" },
        ]}
      >
        <Ionicons
          name="send"
          size={20}
          color={canSend ? "#fff" : "#6aa883"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default function ChatRoom() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const listRef = useRef(null);
  const [text, setText] = useState("");

  const meta = useMemo(
    () => ({
      id: String(params.id || "chat"),
      name: params.name || "Contact",
      role: params.role || "Member",
      preview: params.preview || "When will you come?",
    }),
    [params]
  );

  const [thread, setThread] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, [meta.id]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await messagesAPI.getConversation(meta.id);
      if (response.success && response.data) {
        const messages = response.data.messages || [];
        const transformed = messages.map((msg) => ({
          id: msg._id || msg.id,
          from: msg.sender === 'me' ? 'me' : 'them',
          text: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setThread(transformed);
      } else {
        // Fallback to preview message
        setThread([{ id: "seed-1", from: "them", text: meta.preview, time: "12:00 pm" }]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setThread([{ id: "seed-1", from: "them", text: meta.preview, time: "12:00 pm" }]);
    } finally {
      setLoading(false);
    }
  };

  const send = async () => {
    const t = text.trim();
    if (!t) return;
    
    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    
    // Optimistically add message
    const tempId = String(Date.now());
    setThread((prev) => [
      ...prev,
      { id: tempId, from: "me", text: t, time },
    ]);
    setText("");
    
    try {
      // Send to backend
      await messagesAPI.sendMessage(meta.id, t);
      // Reload messages to get server confirmation
      loadMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove optimistic message on error
      setThread((prev) => prev.filter(msg => msg.id !== tempId));
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
    
    requestAnimationFrame(() =>
      listRef.current?.scrollToEnd({ animated: true })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header name={meta.name} role={meta.role} onBack={() => router.back()} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={listRef}
          data={thread}
          keyExtractor={(it) => it.id}
          renderItem={({ item }) => <Bubble item={item} />}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
        />
        <InputBar
          value={text}
          onChangeText={setText}
          onSend={send}
          onMic={() => {}}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding:'8%',
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  backButton: {
    padding: 6,
    marginRight: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#111",
  },
  headerRole: {
    fontSize: width * 0.03,
    color: "#666",
  },
  bubbleWrapper: {
    paddingHorizontal: 12,
    marginVertical: 6,
    flexDirection: "row",
  },
  bubbleMeWrapper: {
    flexDirection: "row-reverse",
  },
  bubbleMe: {
    backgroundColor: "#d2f8d2",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 4,
    borderWidth: 0.5,
    borderColor: "#e8e8e8",
  },
  bubbleOther: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 14,
    borderWidth: 0.5,
    borderColor: "#e8e8e8",
  },
  bubbleText: {
    color: "#111",
    fontSize: width * 0.035,
  },
  bubbleTime: {
    color: "#999",
    fontSize: width * 0.028,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: '8%',
    gap: 8,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e4e4e4",
    borderRadius: 24,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
    color: "#111",
    fontSize: width * 0.035,
  },
  micButton: {
    padding: 6,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingVertical: 8,
  },
  keyboardAvoid: {
    flex: 1,
  },
});
