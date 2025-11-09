// screens/message/MessageScreen.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import BottomNav from "../../components/common/BottomNav";
import styles from "../../styles/messageStyles";
import Header from "../../components/message/Header";
import FloatingButtons from "../../components/message/FloatingButtons";
import MessageItem from "../../components/message/MessageItem";
import useMessages from "../../archives/ArchiveMessages";
import FeedbackCard from "../../components/message/FeedbackCard";

const MessageScreen = () => {
  const router = useRouter();

  const {
    showArchive,
    setShowArchive,
    archiveMessage,
    unarchiveMessage,
    resetToAll,
    activeData,
    messages,
  } = useMessages();

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

  return (
    <TouchableWithoutFeedback onPress={() => setShowFAB(false)}>
      <View style={styles.container}>
        <Header
          onMenuPress={() => setShowFAB(!showFAB)}
          onAllPress={() => {
            resetToAll();
            setFilteredData([]);
            setActiveButton(null);
          }}
        />

        {displayedData.length === 0 ? (
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
            data={displayedData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MessageItem
                item={item}
                onSwipe={
                  showArchive
                    ? () => unarchiveMessage(item)
                    : () => archiveMessage(item)
                }
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

