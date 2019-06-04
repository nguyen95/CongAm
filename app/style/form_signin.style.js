import { StyleSheet } from "react-native";
import { themes } from "../themes";

export var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
  },
  container_input: {
    height: 60,
    width: themes.fullWidth - 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: themes.colorGrayLight,
  },
  input_text: {
    flex: 1,
    fontFamily: themes.fontRegular,
    fontSize: 16,
    color: 'black',
    paddingLeft: 8,
  },
  text: {
    flex: 1,
    fontFamily: themes.fontRegular,
    fontSize: 16,
    color: 'black',
    paddingLeft: 8,
    textAlignVertical: 'bottom'
  },
  image: {
    color: themes.colorGrayLight,
    fontSize: 22,
  },
  forgot_pass: {
    fontFamily: themes.fontRegular,
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  }
});
