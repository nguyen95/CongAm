import React, { Component } from 'react';
import { View, Picker, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { StackActions, NavigationActions } from 'react-navigation';
import HeaderExit from '../component/HeaderExit';
import FastImage from 'react-native-fast-image';
import { Icon } from 'native-base';
import { inject, observer } from 'mobx-react';
import { themes } from '../themes';
import { styles } from '../style/home.style';
import { clearDataLocal } from '../Utils';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

@inject('mainStore')
@observer
export default class User extends Component {
    constructor(props) {
        super(props);
        this.props.mainStore.setNavigation(this.props.navigation);
    }

    render() {
        const { mainStore, navigation } = this.props;
        const { data_user } = mainStore;
        return (
            <View style={styles.container}>
                <HeaderExit
                    navigation={navigation}
                    onPress={() => {
                    }}
                    title="Thông tin"
                />
                <ScrollView
                    contentContainerStyle={styles.tab_container}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ marginTop: 30, width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: themes.colorGrayLight }}>
                            <Icon
                                type="FontAwesome"
                                name="user"
                                style={{
                                    fontSize: 50,
                                    color: themes.colorBG
                                }}
                            />
                        </View>
                        <View style={{ flex: 1, padding: 32 }}>
                            <Text style={{ padding: 8 }}>Họ tên: {data_user != null ? data_user.name : ""}</Text>
                            <Text style={{ padding: 8 }}>Email: {data_user != null ? data_user.email : ""}</Text>
                            <Text style={{ padding: 8 }}>Ngày sinh: {data_user != null ? data_user.dob : ""}</Text>
                            <Text style={{ padding: 8 }}>Giới tính: {data_user != null ? data_user.sex == 1 ? "Nam" : "Nữ" : ""}</Text>
                            <Text style={{ padding: 8 }}>Liên hệ: {data_user != null ? data_user.phone_number : ""}</Text>
                        </View>

                        <TouchableOpacity
                            style={{ position: 'absolute', top: 0, right: -20, padding: 8 }}
                            onPress={() => {
                                clearDataLocal().then(() => {
                                    navigation.dispatch(resetAction);
                                })
                            }}
                        >
                            <Icon
                                type="FontAwesome"
                                name="arrow-circle-right"
                                style={{
                                    fontSize: 32,
                                    color: themes.colorGray
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}