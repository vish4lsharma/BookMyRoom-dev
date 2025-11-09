import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingBottom: 16,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  header: { fontSize: 26, fontWeight: "800" },
  subHeader: { fontSize: 13, color: "#666", marginTop: 2 },

  filterBtn: {
    backgroundColor: "#F1F1F1",
    padding: 8,
    borderRadius: 8,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    width: width * 0.92,
    alignSelf: "center",
    padding: 14,
    marginBottom: 14,
    gap: 12,
  },
  cardImage: {
    width: 95,
    height: 95,
    borderRadius: 12,
    backgroundColor: "#eee",
  },

  cardRight: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "700" },

  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ratingText: { marginLeft: 4, fontSize: 13, color: "#444", fontWeight: "500" },

  locationText: { fontSize: 13, color: "#666", marginVertical: 4 },

  callBtn: {
    marginTop: 8,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  callBtnText: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
