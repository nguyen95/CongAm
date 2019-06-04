import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Header, Title, Left, Right, View, Icon } from "native-base";
import { styles } from "../style/header.style";
import { themes } from "../themes";

export default class HeaderExit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Header
          style={[styles.container, { backgroundColor: themes.colorApp }]}
          androidStatusBarColor={themes.colorApp}
        >
          <Left style={{ flex: 1 }}>
            {/* <Icon
              type="FontAwesome"
              name="user-circle"
              style={[styles.image, { color: themes.colorBG }]}
              onPress={this.props.onPressInfo}
            /> */}
          </Left>
          <Title style={styles.title}>{this.props.title}</Title>
          <Right style={{ flex: 1 }} >
            {/* <Icon
              type="FontAwesome"
              name="sign-out-alt"
              style={[styles.image, { color: themes.colorBG }]}
              onPress={this.props.onPressLogout}
            /> */}
          </Right>
        </Header>
      </View>
    );
  }
}
