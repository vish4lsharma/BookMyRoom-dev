// screens/message/MessageScreen.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import BottomNav from "../../components/common/BottomNav";
import styles from "../../styles/messageStyles";
import Header from "../../components/message/Header";
import FloatingButtons from "../../components/message/FloatingButtons";
import MessageItem from "../../components/message/MessageItem";
import useMessages from "../../archives/ArchiveMessages";
import FeedbackCard from "../../components/message/FeedbackCard";
import { messagesAPI } from "../../services/api";

const MessageScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);

  const {
    showArchive,
    setShowArchive,
    archiveMessage,
    unarchiveMessage,
    resetToAll,
    activeData,
    messages,
  } = useMessages();

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await messagesAPI.getConversations(showArchive);
      if (response.success && response.data) {
        // Transform API data to match component format
        const transformed = response.data.map((conv) => ({
          id: conv._id || conv.id,
          name: conv.participant?.name || "Unknown",
          role: conv.participant?.role || "Member",
          message: conv.lastMessage?.content || "No messages yet",
          time: conv.lastMessage?.createdAt 
            ? new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : "Now",
          avatar: conv.participant?.avatar || "https://via.placeholder.com/100",
        }));
        setConversations(transformed);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      // Fallback to mock data if API fails
    } finally {
      setLoading(false);
    }
  };

  const [showFAB, setShowFAB] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleFABPress = (button) => {
    setActiveButton(button);
    if (button === "archive") {
      setShowArchive(true);
      setFilteredData([]);
    } else if (button === "car") {
      const filtered = messages.filter(
        (msg) =>
          msg.role.toLowerCase().includes("driver") ||
          msg.role.toLowerCase().includes("transport")
      );
      setShowArchive(false);
      setFilteredData(filtered);
    } else if (button === "support") {
      const filtered = messages.filter((msg) =>
        msg.role.toLowerCase().includes("support")
      );
      setShowArchive(false);
      setFilteredData(filtered);
    } else if (button === "chat") {
      setShowFeedback(true);
    } else {
      resetToAll();
      setFilteredData([]);
    }
    setShowFAB(false);
  };

  const getDisplayedData = () => {
    if (showArchive) return activeData;
    if (filteredData.length > 0) return filteredData;
    return activeData;
  };

  const displayedData = getDisplayedData();
  const finalData = conversations.length > 0 ? conversations : displayedData;

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading messages...</Text>
        <BottomNav active="Message" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => setShowFAB(false)}>
      <View style={styles.container}>
        <Header
          onMenuPress={() => setShowFAB(!showFAB)}
          onAllPress={() => {
            resetToAll();
            setFilteredData([]);
            setActiveButton(null);
            loadConversations();
          }}
        />

        {finalData.length === 0 ? (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.emptyText}>
              {showArchive
                ? "No archived messages yet"
                : "You don’t have any message yet"}
            </Text>
          </ScrollView>
        ) : (
          <FlatList
            data={finalData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MessageItem
                item={item}
                onSwipe={async () => {
                  try {
                    if (showArchive) {
                      await messagesAPI.archiveConversation(item.id);
                      unarchiveMessage(item);
                    } else {
                      await messagesAPI.archiveConversation(item.id);
                      archiveMessage(item);
                    }
                    loadConversations();
                  } catch (error) {
                    console.error('Error archiving conversation:', error);
                  }
                }}
                onPress={() =>
                  router.push({
                    pathname: "/messages/chat/[id]",
                    params: {
                      id: item.id,
                      name: item.name,
                      role: item.role,
                      preview: item.message,
                    },
                  })
                }
              />
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
            refreshing={loading}
            onRefresh={loadConversations}
          />
        )}

        {showFAB && (
          <FloatingButtons
            onButtonPress={handleFABPress}
            activeButton={activeButton}
          />
        )}

        <FeedbackCard
          visible={showFeedback}
          onClose={() => setShowFeedback(false)}
        />

        <BottomNav active="Message" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MessageScreen;

