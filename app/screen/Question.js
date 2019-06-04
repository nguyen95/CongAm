import React, { Component } from 'react';
import { View, Picker, ScrollView, FlatList, Text, TextInput, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import HeaderExit from '../component/HeaderExit';
import LoadingView from '../component/LoadingView';
import FastImage from 'react-native-fast-image';
import { Icon } from 'native-base';
import { inject, observer } from 'mobx-react';
import { themes } from '../themes';
import { styles } from '../style/home.style';
import ButtonApp from '../component/ButtonApp';

@inject('mainStore')
@observer
export default class Question extends Component {
    constructor(props) {
        super(props);
        this.props.mainStore.setNavigation(this.props.navigation);
        this.props.mainStore.resetData();

        this.renderItem = this.renderItem.bind(this)
    }

    showImagePicker = () => {
        const options = {
            noData: true
        }
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.props.mainStore.addImage(
                    {
                        name: response.fileName,
                        type: response.type,
                        uri: Platform.OS === "android" ? response.uri : response.uri.replace("file://", "")
                    }
                )
            }
        });
    }

    renderItem = (item) => {
        return <FastImage
            style={styles.image}
            source={{
                uri: item.uri
            }}
            resizeMode='cover'
        />
    }

    render() {
        const { mainStore, navigation } = this.props;
        const { data_image, isLoading } = mainStore;
        return (
            <View style={styles.container}>
                <HeaderExit
                    navigation={navigation}
                    onPress={() => {
                    }}
                    title="Gửi câu hỏi"
                />
                <ScrollView
                    contentContainerStyle={styles.content_container}
                    showsVerticalScrollIndicator={false}
                >
                    <View >
                        <View style={styles.row}>
                            <Text style={styles.label}>Chọn loại câu hỏi:</Text>
                            <Picker
                                selectedValue={mainStore.type}
                                style={{ height: 80, minWidth: 150, marginLeft: 16 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    mainStore.setType(itemValue)
                                }>
                                <Picker.Item label="Điều trị" value={1} />
                                <Picker.Item label="Dinh dưỡng" value={2} />
                            </Picker>
                        </View>

                        <Text style={styles.label}>Nội dung câu hỏi:</Text>
                        <TextInput style={styles.input_text}
                            multiline={true}
                            placeholder="Nhập câu hỏi"
                            onChangeText={(text) => {
                                mainStore.setContent(text)
                            }}
                        >{mainStore.content}</TextInput>

                        <View style={styles.row}>
                            <Text style={styles.label}>Chọn ảnh:</Text>
                            <Icon
                                type="FontAwesome"
                                name="image"
                                style={[styles.icon, { color: themes.colorGrayLight }]}
                                onPress={() => {
                                    this.showImagePicker()
                                }}
                            />
                        </View>
                        <FlatList
                            style={styles.list_image}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={true}
                            data={data_image}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => this.renderItem(item)}
                        />

                        <ButtonApp onPress={() => { mainStore.sendQuest() }}
                            title="Gửi"
                            color={themes.colorApp}>
                        </ButtonApp>
                    </View>
                </ScrollView>

                {isLoading ? <LoadingView /> : null}
            </View>
        )
    }
}