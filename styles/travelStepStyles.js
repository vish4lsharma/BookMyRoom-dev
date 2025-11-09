import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: width < 380 ? 50 : 60,
    paddingHorizontal: width < 380 ? 16 : 22,
  },

  scrollContent: {
    paddingBottom: 140,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  headerBtn: { fontSize: 14, fontWeight: "600", color: "#111" },

  sectionTitle: {
    fontSize: width < 380 ? 20 : 22,
    fontWeight: "800",
    marginTop: 16,
    marginBottom: 8,
    color: "#111",
  },

  subLabel: { fontSize: 14, color: "#666", marginVertical: 6 },
});
