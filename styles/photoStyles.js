// styles/photoStyles.js
import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

/*
We assume your screen container has ~24px horizontal padding (from stepStyles).
So we calculate 2 equal columns with a 12px gap.
*/

const SIDE_PADDING = 24;
const GUTTER = 12;
const COL = (width - SIDE_PADDING * 2 - GUTTER) / 2;

export default StyleSheet.create({
  gridPad: {
    paddingBottom: 160,
    paddingTop: 8,
  },

  rowBetween: {
    justifyContent: "space-between",
  },

  tileWrap: {
    width: COL,
    marginBottom: 14,
  },

  tile: {
    width: "100%",
    height: width < 380 ? 150 : 170,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#eee",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },

  menuButton: {
    position: "absolute",
    right: 6,
    top: 6,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 18,
  },

  coverBadge: {
    position: "absolute",
    left: 6,
    top: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  coverText: {
    fontSize: 11,
    fontWeight: "700",
  },

  addTile: {
    width: COL,
    height: width < 380 ? 150 : 170,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  addText: {
    marginTop: 6,
    color: "#666",
    fontWeight: "600",
  },

  // -------- Fullscreen Image Modal Backdrop ---------
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 24,
  },
  modalBox: {
    width: 240,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
  },
  modalBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  modalText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "600",
  },

  // -------- Context Menu Under Photo Tile --------
  menuBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  // Add this to styles/photoStyles.js

menuPopup: {
  position: "absolute",
  right: 6,
  top: 36,
  backgroundColor: "#fff",
  borderRadius: 12,
  overflow: "hidden",
  elevation: 6,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  width: 160,
}

});
