import { StyleSheet } from "react-native";
import { themes } from "../themes";

export var styles = StyleSheet.create({
  btn_container_login: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  btn_login: {
    elevation: 0,
    width: themes.fullWidth - 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  btn_text: {
    fontFamily: themes.fontRegular,
  }
});
