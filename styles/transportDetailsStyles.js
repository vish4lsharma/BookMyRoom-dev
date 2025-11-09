import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// Dynamic scale helpers
const scale = width / 390; // 390px = iPhone 12/13 baseline
const font = (size) => Math.round(size * scale);
const spacing = (size) => Math.round(size * scale);

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing(16),
    paddingTop: Platform.OS === "ios" ? spacing(20) : spacing(16),
  },
  headerTitle: {
    fontSize: font(18),
    fontWeight: "700",
    color: "#111",
  },

  /* IMAGE */
  mainImage: {
    width: "100%",
    height: height * 0.27, // Responsive height
    borderBottomLeftRadius: spacing(14),
    borderBottomRightRadius: spacing(14),
  },

  /* TITLE + LOCATION */
  name: {
    fontSize: font(22),
    fontWeight: "700",
    marginTop: spacing(14),
    paddingHorizontal: spacing(16),
    color: "#111",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing(6),
    paddingHorizontal: spacing(16),
  },
  ratingText: { marginLeft: spacing(6), fontSize: font(14), color: "#444" },
  location: {
    fontSize: font(14),
    color: "#666",
    paddingHorizontal: spacing(16),
    marginBottom: spacing(14),
  },

  /* SECTION TITLES */
  sectionTitle: {
    fontSize: font(16),
    fontWeight: "700",
    marginTop: spacing(18),
    paddingHorizontal: spacing(16),
    color: "#111",
  },

  /* SERVICES LIST */
  serviceList: { paddingHorizontal: spacing(16), marginTop: spacing(6) },
  serviceItem: {
    fontSize: font(14),
    marginBottom: spacing(4),
    color: "#444",
  },

  /* PRICING BOX */
  priceBox: {
    backgroundColor: "#F7F7F7",
    padding: spacing(14),
    borderRadius: spacing(12),
    marginHorizontal: spacing(16),
    marginTop: spacing(10),
  },
  priceText: {
    fontSize: font(14),
    marginBottom: spacing(6),
    fontWeight: "500",
    color: "#333",
  },

  /* CALL BUTTON */
  callBtn: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: spacing(22),
    paddingVertical: spacing(12),
    paddingHorizontal: spacing(36),
    borderRadius: spacing(12),
    alignItems: "center",
    gap: spacing(8),
  },
  callBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: font(16),
  },
});
