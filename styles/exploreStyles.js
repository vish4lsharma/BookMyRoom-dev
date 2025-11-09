import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 20, paddingBottom: 16 },

  section: { marginTop: 18, paddingHorizontal: 14 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontSize: 17, fontWeight: "700" },

  card: { width: 160, marginRight: 12 },
  cardImage: { width: "100%", height: 110, borderRadius: 8 },
  cardTitle: { fontSize: 14, fontWeight: "600", marginTop: 4 },
  cardPrice: { fontSize: 12, color: "#555" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  ratingText: { marginLeft: 4, fontSize: 12, fontWeight: "600" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    margin: 15,
    borderRadius: 25,
    paddingHorizontal: 85,
    height: 55,
    borderColor:"black",
    borderWidth:1
  },
  searchInput: { flexDirection: "row", margin: 10, fontSize: 17, color: "#000" },
  topTabs: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 12,
  },
  tabItem: { alignItems: "center", marginHorizontal: 25 },
  tabText: { fontSize: 13, fontWeight: "600", marginTop: 4 },

  cardImageWrapper: {
  width: "100%",
  height: 160,
  borderRadius: 12,
  overflow: "hidden",
  backgroundColor: "#f2f2f2",
},

heartBtn: {
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "#f2f2f2",
  width: 32,
  height: 32,
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",
},


});
