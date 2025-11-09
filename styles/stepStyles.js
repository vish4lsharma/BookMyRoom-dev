// styles/stepStyles.js
import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  /* MAIN CONTAINER */
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: width < 380 ? 18 : 22,
    paddingTop: width < 380 ? 45 : 60,
  },

  scrollContent: {
    paddingBottom: width < 380 ? 120 : 150,
  },

  /* HEADER */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  headerBtn: { fontSize: 14, fontWeight: "600", color: "#111" },

  /* TITLES */
  stepLabel: { fontSize: 14, fontWeight: "600", color: "#111" },
  title: {
    fontSize: width < 380 ? 24 : 28,
    fontWeight: "800",
    marginTop: 6,
    color: "#111",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
    lineHeight: 20,
    paddingRight: 10,
    
  },

  sectionTitle: {
    fontSize: width < 380 ? 18 : 20,
    fontWeight: "700",
    marginTop: 0,
    marginBottom: 12,
    color: "#111",
  },
  subLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
    color: "#333",
  },

  /* SEARCH / ADDRESS INPUT */
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    marginBottom: 14,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 15,
    color: "#111",
    flex: 1,
  },

  /* MAP */
  mapLarge: {
    width: "100%",
    height: 550,
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 8,
  },

  /* PROGRESS BAR */
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 5,
  },
  bar: {
    height: 4,
    flex: 1,
    backgroundColor: "#ddd",
    marginHorizontal: 3,
    borderRadius: 4,
  },
  barActive: { backgroundColor: "#111" },

  /* FOOTER */
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    marginBottom: width < 380 ? 10 : 20,
  },
  backText: { fontSize: 16, fontWeight: "600", color: "#444" },

  nextButton: {
    backgroundColor: "#111",
    paddingHorizontal: width < 380 ? 28 : 35,
    paddingVertical: 12,
    borderRadius: 10,
  },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  subtitle: {
    fontSize: width < 380 ? 12.5 : 14,
    color: "#777",
    marginTop: 6,
    marginBottom: 18,
  },
  smallText: {
    fontSize: width < 380 ? 12 : 13,
    color: "#777",
    marginBottom: 12,
  },



  // styles/stepStyles.js (snippet – make sure these exist)
progressBarContainer:{ flexDirection:"row", justifyContent:"space-between", marginBottom:15, marginTop:8 },
bar:{ height:4, flex:1, backgroundColor:"#ddd", marginHorizontal:3, borderRadius:4 },
barActive:{ backgroundColor:"#111" },
headerRow:{ flexDirection:"row", justifyContent:"space-between", marginBottom:16 },
headerBtn:{ fontSize:14, fontWeight:"600", color:"#111" },
sectionTitle:{ fontSize:22, fontWeight:"800", color:"#111", marginTop:8 },
subtitle:{ fontSize:13, color:"#777", marginTop:4, marginBottom:8 },

// Booking & selection cards
selectCard: {
  borderWidth: 1,
  borderColor: "#ccc",
  backgroundColor: "#fff",
  borderRadius: 14,
  padding: 18,
  marginBottom: 14,
},
activeCard: {
  borderColor: "#111",
  backgroundColor: "#f6f6f6",
},
cardTitle: { fontSize: 17, fontWeight: "700", color: "#111" },
cardSubtitle: { fontSize: 14, color: "#666", marginTop: 6 },
recommendedLabel: { fontSize: 14, fontWeight: "700", color: "#0a8f28", marginTop: 4 },
rowBetween: { flexDirection: "row", justifyContent: "space-between" },

// Price Screen Specific
priceWrapper: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 8,
},
currency: {
  fontSize: width < 380 ? 34 : 42,
  fontWeight: "800",
  color: "#111",
  marginRight: 6,
},
priceInput: {
  fontSize: width < 380 ? 34 : 42,
  fontWeight: "800",
  color: "#111",
  minWidth: 120,
  textAlign: "left",
},
priceNote: {
  textAlign: "center",
  color: "#777",
  fontSize: 13,
  marginBottom: 24,
},

similarBtn: {
  alignSelf: "center",
  borderWidth: 1,
  borderRadius: 24,
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderColor: "#bbb",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 14,
},
similarText: { marginLeft: 6, fontWeight: "600", color: "#111" },

learnMore: { textAlign: "center", color: "#2f76e5", textDecorationLine: "underline" },


pageWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerBtn: { fontSize: 14, fontWeight: "600", color: "#111" },

  sectionTitle: {
    fontSize: width < 380 ? 24 : 28,
    fontWeight: "800",
    color: "#111",
    marginBottom: 8,
    lineHeight: 32,
  },
  smallText: { fontSize: 14, color: "#777", marginBottom: 18 },

  bigNumber: {
    fontSize: width < 380 ? 38 : 42,
    fontWeight: "800",
    color: "#111",
    marginBottom: 10,
  },

  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },

  label: { fontSize: 16, fontWeight: "700" },

  valueBox: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  valueText: { fontSize: 16, fontWeight: "700" },

  tip: { fontSize: 13, color: "#666", marginTop: 6, marginBottom: 14 },

  sliderLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 2 },
  sliderText: { fontSize: 12, color: "#666" },


  offerCard: { borderWidth: 1, borderColor: "#ddd", borderRadius: 14, padding: 14, marginBottom: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center", },
  offerCardActive: { borderColor: "#111", backgroundColor: "#f9f9f9" }, 
  cardLeft: { flexDirection: "row", alignItems: "center", flex: 1 }, 
  percentBox: { borderWidth: 1, borderColor: "#222", borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12, justifyContent: "center", alignItems: "center", }, 
  percentText: { fontSize: 14, fontWeight: "700" }, 
  offerTitle: { fontSize: 16, fontWeight: "700", marginBottom: 4 }, 
  offerDesc: { fontSize: 13, color: "#666", paddingRight: 10 }, 
  learnMore: { fontSize: 13, color: "#444", marginTop: 4 }, 
  link: { color: "#007AFF", textDecorationLine: "underline" }, 
  securityRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 14, }, 
  securityText: { fontSize: 15, color: "#111" }, 
  sectionDivider: { height: 1, backgroundColor: "#eee", marginTop: 24, marginBottom: 10 }, 
  notesTitle: { fontSize: 17, fontWeight: "700", marginBottom: 8 }, 
  note: { fontSize: 14, color: "#444", marginBottom: 4 },



  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, marginBottom: 12, backgroundColor: "#fff", }, 
  inputText: { flex: 1, fontSize: 15, color: "#111" },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 24 }, 
  choiceRow: { flexDirection: "row", justifyContent: "space-between" }, 
  choiceBtn: { flex: 1, borderWidth: 1, borderColor: "#ccc", paddingVertical: 14, borderRadius: 12, alignItems: "center", marginRight: 10, }, 
  choiceActive: { borderColor: "#111", backgroundColor: "#f8f8f8", }, 
  choiceText: { fontSize: 16, fontWeight: "600", color: "#111" },
  inputRow: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 12,
  paddingHorizontal: 14,
  paddingVertical: 12,
  marginBottom: 12,
  backgroundColor: "#fff",
  justifyContent: "space-between",
},
errorInput: {
  borderColor: "#E63946",
  backgroundColor: "#FFF5F5",
},

errorMsg: {
  color: "#D90429",
  fontSize: 13,
  marginTop: 6,
  marginBottom: 12,
  fontWeight: "500",
},


modalBackdrop: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 30,
},

modalBox: {
  backgroundColor: "#fff",
  width: "100%",
  borderRadius: 14,
  maxHeight: "50%",
  paddingVertical: 8,
},

modalItem: {
  paddingVertical: 14,
  paddingHorizontal: 18,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},

modalItemText: {
  fontSize: 16,
  fontWeight: "600",
  color: "#111",
},

searchBar: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 12,
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderColor: "#eee",
  backgroundColor: "#fafafa",
  borderTopLeftRadius: 14,
  borderTopRightRadius: 14,
},

});
