import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 40 ,paddingBottom: 20},

  headerWrap: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  backHit: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerText: { fontSize: 20, fontWeight: "700", marginLeft: 6 },

  inputWrap: { marginBottom: 10 },
  label: { fontSize: 13, color: "#6B7280", marginBottom: 6 },

  inputBase: {
    borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, backgroundColor: "#fff"
  },

  inputDisabled: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F9FAFB" },
  disabledText: { color: "#111827", fontSize: 15 },

  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", padding: 20 },
  modalBox: { backgroundColor: "#fff", borderRadius: 12, maxHeight: "70%", overflow: "hidden" },
  searchBar: { flexDirection: "row", alignItems: "center", padding: 12, borderBottomWidth: 1, borderColor: "#ddd" },
  searchInput: { flex: 1, marginLeft: 8 },

  modalItem: { padding: 14 },
  modalItemText: { fontSize: 15 },

  toggleCard: { marginVertical: 10 },
  toggleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  toggleTitle: { fontSize: 15, fontWeight: "700" },
  toggleHelp: { fontSize: 13, color: "#6B7280", marginTop: 4 },

  mapCard: { marginTop: 8, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#ddd" },
  map: { height: width < 380 ? 200 : 260 },

  overlayPill: { position: "absolute", top: 16, alignSelf: "center", paddingVertical: 6, paddingHorizontal: 12, backgroundColor: "#fff", borderRadius: 999, borderWidth: 1, borderColor: "#ddd" },
  overlayText: { fontSize: 13 },

  cta: { marginTop: 18, backgroundColor: "#111827", paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  footer: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#fff",
  padding: 16,
  borderTopWidth: 1,
  borderColor: "#eee",
},

cta: {
  backgroundColor: "#111827",
  borderRadius: 12,
  paddingVertical: 14,
  alignItems: "center",
},
ctaText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "700",
},
errorInput: {
  borderColor: "#E63946",
  backgroundColor: "#FFF5F5",
},

errorText: {
  color: "#E63946",
  fontSize: 13,
  marginTop: 4,
},

});
