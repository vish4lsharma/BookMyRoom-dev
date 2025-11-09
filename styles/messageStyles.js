// /styles/messageStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingBottom: 16 ,paddingTop:20},
  header: { marginBottom: 20,padding:16 },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 10 },
  filterBtn: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  filterText: { fontSize: 14, color: "#000" },

  emptyText: { fontSize: 16, color: "#666", textAlign: "center" },

  floatingButtons: {
    position: "absolute",
    right: 16,
    top: "9%",
    justifyContent: "space-between",
  },
  fab: {
    backgroundColor: "#f2f2f2",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    elevation: 3,
  },
  messageRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 12,
  paddingHorizontal: 15,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},
avatar: {
  marginRight: 10,
},
messageContent: {
  flex: 1,
},
name: {
  fontWeight: "bold",
  fontSize: 14,
},
role: {
  fontSize: 12,
  color: "gray",
},
messageText: {
  fontSize: 13,
  color: "#333",
},
messageMeta: {
  alignItems: "flex-end",
},
date: {
  fontSize: 12,
  color: "gray",
  marginBottom: 4,
},
unreadDot: {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: "green",
  marginBottom: 6,
  alignSelf: "flex-end",
},

});

export default styles;
