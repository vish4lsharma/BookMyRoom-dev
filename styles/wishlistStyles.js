import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingBottom: 16,paddingTop:30 },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 16,paddingLeft:16 },

  recentlyViewed: { flexDirection: "column", marginBottom: 20 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  recentImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  recentTitle: { fontSize: 16, fontWeight: "600" },
  recentSub: { fontSize: 14, color: "#666" },

  card: { backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", elevation: 3, marginBottom: 15 },
  roomImage: { width: "100%", height: 200 },
  heartIcon: { position: "absolute", top: 10, right: 10 },
  cardContent: { padding: 12 },
  roomTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  roomDetails: { fontSize: 14, color: "#666" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  row: { flexDirection: "row", alignItems: "center" },
  price: { fontSize: 15, fontWeight: "600", color: "#000" },
  rating: { marginLeft: 4, fontSize: 14, color: "#444" },
  input: { marginTop: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 8 },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: "auto",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, marginTop: 2, color: "#999" },
});
