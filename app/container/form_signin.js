import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import ButtonApp from '../component/ButtonApp';
import LoadingView from '../component/LoadingView';
import { themes } from '../themes';
import { styles } from '../style/form_signin.style';
import { inject, observer } from 'mobx-react';

@inject("mainStore")
@observer
export default class FormSignIn extends Component {
    componentWillMount() {
        this.props.mainStore.setNavigation(this.props.navigation);
    }

    render() {
        const { mainStore } = this.props;
        let { isLoading } = mainStore;
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.container_input}>
                        <Icon
                            type="FontAwesome"
                            name="envelope"
                            style={styles.image}
                        />
                        <TextInput style={styles.input_text}
                            placeholder="Nhập email"
                            onChangeText={(text) => {
                                mainStore.setEmail(text)
                            }}
                        >{mainStore.mail}</TextInput>
                    </View>
                    <View style={styles.container_input}>
                        <Icon
                            type="FontAwesome"
                            name="lock"
                            style={styles.image}
                        />
                        <TextInput style={styles.input_text}
                            secureTextEntry={true}
                            placeholder="Nhập mật khẩu"
                            onChangeText={(text) => {
                                mainStore.setPass(text)
                            }}
                        >{mainStore.pass}</TextInput>
                    </View>
                    <View style={{ height: 16 }}></View>
                    <ButtonApp onPress={() => { mainStore.signIn() }}
                        title="Đăng nhập"
                        color={themes.colorApp}>
                    </ButtonApp>
                </View>

                {isLoading == true ? <LoadingView /> : null}

            </ScrollView>
        )
    }
}