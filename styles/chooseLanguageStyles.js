import { StyleSheet } from "react-native";

export const scaleFont = (size, width) => Math.round(size * (width / 375));

export const getStyles = (width, height) =>
  StyleSheet.create({
    container: { flex: 1 },
    background: { flex: 1, height: "62%" },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.45)",
      justifyContent: "space-between",
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: width * 0.05,
      paddingTop: height * 0.02,
    },
    logoContainer: { flexDirection: "column" },

    logoText: {
      fontSize: scaleFont(18, width),
      fontWeight: "700",
      letterSpacing: 0.5,
    },
    skip: {
      color: "#fff",
      fontSize: scaleFont(15, width),
      fontWeight: "600",
    },

    textContainer: {
      paddingHorizontal: width * 0.05,
      marginTop: height * 0.4,
    },
    iconTitle: { flexDirection: "row", alignItems: "center" },

    welcome: { color: "#fff", fontSize: scaleFont(20, width), marginLeft: 6 },
    title: {
      color: "#fff",
      fontSize: scaleFont(24, width),
      fontWeight: "700",
      marginTop: 4,
    },

    languageBox: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: width * 0.05,
      paddingTop: height * 0.03,
      paddingBottom: height * 0.05,
      elevation: 8,
      height: height * 0.4,
    },

    languageOption: {
      borderWidth: 1.2,
      borderColor: "#ddd",
      borderRadius: 12,
      paddingVertical: height * 0.018,
      paddingHorizontal: width * 0.04,
      marginBottom: height * 0.015,
      backgroundColor: "#fff",
    },
    selectedOption: { borderColor: "#007AFF", backgroundColor: "#E8F2FF" },

    rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    rowCenter: { flexDirection: "row", alignItems: "center", gap: width * 0.02 },

    languageText: { fontSize: scaleFont(16, width), fontWeight: "600", color: "#000" },
    subText: { fontSize: scaleFont(12, width), color: "#555" },

    languageSymbol: { fontSize: scaleFont(22, width), color: "#ccc", fontWeight: "700" },
    selectedSymbol: { color: "#007AFF" },

    radioOuter: {
      width: width * 0.05,
      height: width * 0.05,
      borderRadius: 100,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    radioInner: {
      width: width * 0.025,
      height: width * 0.025,
      borderRadius: 100,
      backgroundColor: "#007AFF",
    },

    continueBtn: {
      backgroundColor: "#007AFF",
      borderRadius: 25,
      paddingVertical: height * 0.02,
      alignItems: "center",
      marginTop: height * 0.05,
    },
    continueText: { color: "#fff", fontSize: scaleFont(24, width), fontWeight: "700" },
  });
