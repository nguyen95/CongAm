import React, { Component } from "react";
import { Header, Right, Left, Icon } from "native-base";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "../style/header.style";
import { themes } from "../themes";
import { inject, observer } from 'mobx-react';

@inject('loginViewStore')
@observer
export default class HeaderLogin extends Component {

  render() {
    var loginViewStore = this.props.loginViewStore;
    var { color_active, color_inactive, color_back_active, color_back_inactive } = loginViewStore;
    return (
      <View>
        <Header
          style={[styles.container, { backgroundColor: themes.colorApp }]}
          androidStatusBarColor={themes.colorApp}
        >
          <Left style={styles.right}>
            {/* <Icon
              type="FontAwesome"
              name="times"
              style={[styles.image, { color: themes.colorBG }]}
              onPress={() => this.props.navigation.pop()}
            /> */}
          </Left>
          <View style={styles.mid}>
            <TouchableOpacity
              style={[styles.opacity, { color: color_active, backgroundColor: color_back_active }]}
              onPress={() => {
                loginViewStore.toggleStt();
              }}>
              <Text style={[styles.mid_text, { color: color_active }]}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.opacity, { color: color_inactive, backgroundColor: color_back_inactive }]}
              onPress={() => {
                loginViewStore.toggleStt();
              }}>
              <Text style={[styles.mid_text, { color: color_inactive }]}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
          <Right />
        </Header>
      </View>
    );
  }
}
