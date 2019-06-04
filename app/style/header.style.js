import { StyleSheet } from "react-native";
import { themes } from "../themes";

export var styles = StyleSheet.create({
  container: {
    height: themes.headerHeight,
    alignItems: "center",
  },
  container_icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  right: {
    flex: 1,
  },
  image: {
    fontSize: 28,
    paddingRight: 8,
    paddingLeft: 8,
    color: themes.colorApp
  },
  image_black: {
    fontSize: 24,
    paddingRight: 8,
    paddingLeft: 8,
    color: 'black'
  },
  image_exit: {
    fontSize: 28,
    paddingRight: 8,
    paddingLeft: 8,
    color: themes.colorGrayLight
  },
  title: {
    fontFamily: themes.fontBold,
    flex: 4,
    fontSize: 24,
    color: themes.colorBG,
    paddingBottom: 2,
    textAlign: "center",
  },
  mid: {
    flex: 4,
    height: 30,
    flexDirection: 'row',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: themes.colorBG,
  },
  opacity: {
    flex: 1,
    justifyContent: 'center',
  },
  mid_text: {
    fontFamily: themes.fontRegular,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400'
  },
  left: {
    flex: 1,
    justifyContent: 'center'
  },
  menu_item: {
    fontFamily: themes.fontRegular,
    fontSize: 16,
    padding: 8,
    color: 'black',
  }
});
