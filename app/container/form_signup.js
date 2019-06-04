import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Switch, DatePickerAndroid, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'native-base';
import ButtonApp from '../component/ButtonApp';
import LoadingView from '../component/LoadingView';
import { themes } from '../themes';
import { styles } from '../style/form_signin.style';
import { inject, observer } from 'mobx-react';

@inject("mainStore")
@observer
export default class FormSignUp extends Component {

    openDatePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(2020, 4, 25),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                this.props.mainStore.setDob(year + "-" + month + "-" + day)
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
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
                            name="user"
                            style={styles.image}
                        />
                        <TextInput
                            style={styles.input_text}
                            placeholder="Nhập tên"
                            onChangeText={(text) => { mainStore.setName(text) }}
                        >{mainStore.name}</TextInput>
                    </View>
                    <View style={styles.container_input}>
                        <Icon
                            type="FontAwesome"
                            name="envelope"
                            style={styles.image}
                        />
                        <TextInput style={styles.input_text}
                            placeholder="Nhập email"
                            onChangeText={(text) => { mainStore.setEmail(text) }}
                        >{mainStore.email}</TextInput>
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
                            onChangeText={(text) => { mainStore.setPass(text) }}
                        >{mainStore.pass}</TextInput>
                    </View>
                    <TouchableOpacity
                        style={styles.container_input}
                        onPress={() => { this.openDatePicker() }}
                    >
                        <Icon
                            type="FontAwesome"
                            name="calendar"
                            style={styles.image}
                        />
                        <Text style={styles.text}>{mainStore.dob}</Text>
                    </TouchableOpacity>
                    <View style={styles.container_input}>
                        <Text>Nam</Text>
                        <Switch
                            style={{ marginLeft: 16, marginRight: 16 }}
                            onValueChange={(val) => { mainStore.setSex(val) }}
                            value={mainStore.sex}
                            trackColor={{ true: themes.colorGrayLight, false: themes.colorGrayLight }}
                            thumbColor={themes.colorApp}
                        />
                        <Text>Nữ</Text>
                    </View>
                    <View style={styles.container_input}>
                        <Icon
                            type="FontAwesome"
                            name="phone"
                            style={styles.image}
                        />
                        <TextInput style={styles.input_text}
                            secureTextEntry={true}
                            placeholder="Nhập sđt"
                            onChangeText={(text) => { mainStore.setPhone(text) }}
                        >{mainStore.phone}</TextInput>
                    </View>
                    <View style={{ height: 16 }}></View>
                    <ButtonApp onPress={() => { mainStore.signUp() }}
                        title=" Đăng ký "
                        color={themes.colorApp}>
                    </ButtonApp>
                </View>

                {isLoading == true ? <LoadingView /> : null}

            </ScrollView>
        )
    }
}