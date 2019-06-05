import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import Spinner from 'react-native-spinkit';
import { themes } from "../themes";


export default class LoadingView extends Component {
  render() {
    return (
      <Modal
        transparent={true}
        animationType={"none"}
        visible={true}
        onRequestClose={() => {
          // console.log("close modal");
        }}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPressOut={this.props.onPressOut}
        >
          <TouchableWithoutFeedback>
            <Spinner isVisible={true} size={60} type={'ChasingDots'} color={themes.colorApp}/>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000030"
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
