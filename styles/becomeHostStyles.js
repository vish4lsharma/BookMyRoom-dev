// styles/becomeHostStyles.js
import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: width < 380 ? 45 : 60,
    paddingHorizontal: width < 380 ? 18 : 22,
  },

  title: { fontSize: width < 380 ? 24 : 28, fontWeight: "800", color: "#111" },
  appName: { color: "#000" },

  subtitle: {
    fontSize: width < 380 ? 13 : 15,
    color: "#555",
    marginTop: 6,
    lineHeight: 20,
  },

  stepContainer: { marginTop: 35, gap: 25 },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  stepNumber: {
    fontSize: width < 380 ? 18 : 20,
    fontWeight: "700",
    marginTop: 4,
  },
  stepTextBox: { flex: 1 },
  stepTitle: { fontSize: 16, fontWeight: "700", marginBottom: 2 },
  stepDesc: { fontSize: 13, color: "#555", lineHeight: 17 },

  stepImage: {
    width: width < 380 ? 40 : 45,
    height: width < 380 ? 40 : 45,
    resizeMode: "contain",
  },

  button: {
    marginTop: 40,
    backgroundColor: "#ff0066",
    borderRadius: 45,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
