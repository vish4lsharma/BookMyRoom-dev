// styles/carStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  /* ---------- FORM ---------- */
  formContainer: {
    marginBottom: 24,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  formHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  formTitle: { fontSize: 16, fontWeight: "800", color: "#111" },
  cancelEdit: { color: "#DC2626", fontWeight: "700" },

  label: { fontSize: 14, fontWeight: "600", marginBottom: 6, color: "#111" },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: "#fff",
  },

  /* ---------- PHOTO PICKER ---------- */
  photoToolbar: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  pillBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#111",
    borderRadius: 999,
  },
  pillLabel: { color: "#fff", fontWeight: "700", fontSize: 13 },

  thumbsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 4,
  },
  thumbWrap: {
    width: 84,
    height: 84,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    position: "relative",
  },
  thumb: { width: "100%", height: "100%" },
  removeThumb: {
    position: "absolute",
    right: 4,
    top: 4,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  removeThumbText: { color: "#DC2626", fontSize: 11, fontWeight: "800" },

  addTile: {
    width: 84,
    height: 84,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  addTileText: { fontSize: 11, color: "#6B7280", fontWeight: "700" },

  addButton: {
    backgroundColor: "#111",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  addButtonText: { color: "white", fontSize: 16, fontWeight: "600" },

  /* ---------- LIST ---------- */
  carListTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 14,
    marginBottom: 10,
    color: "#111",
  },
  carCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTopRow: { flexDirection: "row", alignItems: "center" },

  coverImage: {
    width: 92,
    height: 92,
    borderRadius: 12,
    marginRight: 12,
  },
  cardDetails: { flex: 1 },
  carName: { fontSize: 16, fontWeight: "800", color: "#111" },
  carMeta: { fontSize: 13.5, color: "#4B5563", marginTop: 2 },

  cardActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  actionLabel: { fontWeight: "700", fontSize: 13, color: "#111" },
  danger: { color: "#DC2626" },

  thumbsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  miniThumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});
