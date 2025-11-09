import { StyleSheet } from "react-native";

export const scaleFont = (size, width) => Math.round(size * (width / 375));

export const getStyles = (width, height) =>
  StyleSheet.create({
    background: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: height * 0.08,
    },
    logoContainer: {
      position: "absolute",
      top: height * 0.02,
      left: width * 0.05,
      flexDirection: "column",
      zIndex: 10,
    },
    logoText: {
      fontSize: scaleFont(18, width),
      fontWeight: "700",
      letterSpacing: 0.5,
    },
    card: {
      width: width * 0.9,
      backgroundColor: "#fff",
      borderRadius: 20,
      paddingVertical: height * 0.03,
      paddingHorizontal: width * 0.05,
      alignItems: "center",
      elevation: 5,
      marginTop: height * 0.3,
    },
    title: {
      fontSize: scaleFont(22, width),
      fontWeight: "700",
      marginBottom: height * 0.02,
      color: "#000",
    },
    mobileRow: {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  marginVertical: height * 0.012,
},
countryCodeBox: {
  width: width * 0.25,
  height: height * 0.065,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ddd",
  backgroundColor: "#f9f9f9",
  justifyContent: "center",
  alignItems: "center",
},
mobileField: {
  flex: 1,
  height: height * 0.065,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ddd",
  backgroundColor: "#f9f9f9",
  paddingHorizontal: width * 0.04,
  marginLeft: width * 0.03,
},

    confirmBtn: {
      backgroundColor: "#007BFF",
      borderRadius: 30,
      width: "100%",
      height: height * 0.065,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: height * 0.025,
    },
    confirmText: {
      color: "#fff",
      fontSize: scaleFont(16, width),
      fontWeight: "600",
    },
    orText: {
      marginVertical: height * 0.015,
      fontSize: scaleFont(14, width),
      color: "#888",
    },
    googleBtn: {
      padding: height * 0.012,
      borderRadius: 50,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ddd",
      marginBottom: height * 0.015,
    },
    bottomText: {
      marginTop: height * 0.01,
      fontSize: scaleFont(14, width),
      color: "#000",
    },
    signupText: {
      color: "#007BFF",
      fontWeight: "700",
    },
  });
