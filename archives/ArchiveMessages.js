import { useState } from "react";
import { initialMessages } from "./messages";

export default function useMessages() {
  const [messages, setMessages] = useState(initialMessages);
  const [archivedMessages, setArchivedMessages] = useState([]);
  const [showArchive, setShowArchive] = useState(false);

  // ✅ Move message to archive
  const archiveMessage = (item) => {
    // already archived? do nothing
    if (archivedMessages.find((m) => m.id === item.id)) return;

    // remove from active messages and add to archive
    setMessages((prev) => prev.filter((m) => m.id !== item.id));
    setArchivedMessages((prev) => [...prev, item]);
  };

  // ✅ Restore from archive
  const unarchiveMessage = (item) => {
    setArchivedMessages((prev) => prev.filter((m) => m.id !== item.id));
    setMessages((prev) => [...prev, item]);
  };

  // ✅ Reset to All
  const resetToAll = () => {
    setShowArchive(false);
  };

  // ✅ Active data depends on mode
  const activeData = showArchive ? archivedMessages : messages;

  return {
    messages,
    archivedMessages,
    showArchive,
    setShowArchive,
    archiveMessage,
    unarchiveMessage,
    resetToAll,
    activeData,
  };
}
