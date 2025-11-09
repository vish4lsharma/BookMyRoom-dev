import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

const horizontalPadding = width * 0.045;
const chipSpacing = 10;
const CHIP_WIDTH = (width - horizontalPadding * 2 - chipSpacing * 2) / 3;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 55 : 45,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalPadding,
    marginBottom: 12,
  },
  title: {
    fontSize: width * 0.052,
    fontWeight: "700",
    color: "#111",
  },
  reset: {
    fontSize: width * 0.04,
    color: "#007AFF",
    fontWeight: "600",
  },

  /* SECTION TITLE */
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: horizontalPadding,
    color: "#111",
  },

  /* CHIPS ROW */
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: chipSpacing,
    paddingHorizontal: horizontalPadding,
    marginBottom: 8,
  },

  /* CHIP STYLE */
  chip: {
    width: CHIP_WIDTH,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",

    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  chipSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",

    shadowColor: "#007AFF",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },

  chipText: {
    fontSize: width * 0.038,
    color: "#333",
    fontWeight: "500",
  },

  chipTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },

  /* APPLY BUTTON */
  applyBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#DADADA",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  applyText: {
    color: "#fff",
    fontSize: width * 0.048,
    fontWeight: "700",
  },
});
