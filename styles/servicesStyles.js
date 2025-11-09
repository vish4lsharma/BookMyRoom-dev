// styles/servicesStyles.js
import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  scrollContent: {
    paddingBottom: 160, // ensures content isn’t hidden behind footer
  },

  /* Header Row */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerBtn: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  /* Text Titles */
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
    marginBottom: 18,
  },
  smallText: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
    marginBottom: 12,
  },

  /* Responsive adjustments */
  ...(width < 380 && {
    sectionTitle: {
      fontSize: 19,
      fontWeight: "700",
      marginTop: 14,
      color: "#111",
    },
    headerRow: {
      marginBottom: 18,
    },
  }),
});
