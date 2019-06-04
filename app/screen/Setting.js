import React, { Component } from 'react';
import { View, Picker, ScrollView, FlatList, Text, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import HeaderExit from '../component/HeaderExit';
import FastImage from 'react-native-fast-image';
import { Icon } from 'native-base';
import { inject, observer } from 'mobx-react';
import { themes } from '../themes';
import { styles } from '../style/home.style';

@inject('mainStore')
@observer
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.props.mainStore.setNavigation(this.props.navigation);
    }

    render() {
        const { mainStore, navigation } = this.props;
        return (
            <View style={styles.container}>
                <HeaderExit
                    navigation={navigation}
                    onPress={() => {
                    }}
                    title="Cài đặt"
                />
                <ScrollView
                    contentContainerStyle={styles.content_container}
                    showsVerticalScrollIndicator={false}
                >
                    
                </ScrollView>

            </View>
        )
    }
}