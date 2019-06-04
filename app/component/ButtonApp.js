import React, { Component } from "react";
import { Button } from "native-base";
import { View, Text } from "react-native";
import { styles } from "../style/button_app.style";
import { themes } from "../themes";

export default class ButtonApp extends Component {
    render() {
        return (
            <View style={styles.btn_container_login}>
                <Button style={[styles.btn_login, { backgroundColor: this.props.color }]}
                    onPress={this.props.onPress}>
                    <Text
                        style={[
                            styles.btn_text,
                            { color: this.props.colorTitle == null ? 'white' : this.props.colorTitle }
                        ]}>
                        {this.props.title}
                    </Text>
                </Button>
            </View>
        )
    }
}