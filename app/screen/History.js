import React, { Component } from 'react';
import { View, Picker, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Collapsible from 'react-native-collapsible';
import HeaderExit from '../component/HeaderExit';
import LoadingView from '../component/LoadingView';
import FastImage from 'react-native-fast-image';
import { Icon, Button } from 'native-base';
import { inject, observer } from 'mobx-react';
import { themes } from '../themes';
import { styles } from '../style/home.style';

@inject('mainStore')
@observer
export default class History extends Component {
    constructor(props) {
        super(props);
        this.props.mainStore.setNavigation(this.props.navigation);

        this.props.navigation.addListener("willFocus", () => {
            this.props.mainStore.getQuest();
        });

        this.renderItem = this.renderItem.bind(this)
    }

    renderItem = (item, type) => {
        return <TouchableOpacity
            style={styles.item}
            onPress={() => {
                this.props.navigation.navigate("HistoryDetail", { id: item.id, type: type })
            }}
        >
            <Text ellipsizeMode='tail'>Nội dung: {item.content}</Text>
            <Text ellipsizeMode='tail'>THời gian gửi: {item.created_at.split(".")[0]}</Text>
        </TouchableOpacity>
    }

    render() {
        const { mainStore, navigation } = this.props;
        const { isLoading, showColl1, showColl2, data } = mainStore;
        return (
            <View style={styles.container}>
                <HeaderExit
                    navigation={navigation}
                    onPress={() => {
                    }}
                    title="Danh sách câu hỏi"
                />
                <ScrollView
                    contentContainerStyle={styles.content_container}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity
                        onPress={() => mainStore.toggleCollapse1()}
                    >
                        <View style={styles.title_container}>
                            <Text style={styles.title}>Câu hỏi về điều trị</Text>
                            <Icon
                                type="FontAwesome"
                                name={showColl1 ? "caret-right" : "sort-down"}
                                style={{
                                    fontSize: 14,
                                    color: themes.colorBG
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={showColl1}>
                        <FlatList
                            style={styles.list_image}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}
                            data={data == null ? [] : data.question_doctors.slice().reverse()}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => this.renderItem(item, "Điều trị")}
                        />
                    </Collapsible>

                    <TouchableOpacity
                        onPress={() => mainStore.toggleCollapse2()}
                    >
                        <View style={styles.title_container}>
                            <Text style={styles.title}>Câu hỏi về dinh dưỡng</Text>
                            <Icon
                                type="FontAwesome"
                                name={showColl2 ? "caret-right" : "sort-down"}
                                style={{
                                    fontSize: 14,
                                    color: themes.colorBG
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={showColl2}>
                        <FlatList
                            style={styles.list_image}
                            horizontal
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}
                            data={data == null ? [] : data.question_dieticians.slice().reverse()}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => this.renderItem(item, "Dinh dưỡng")}
                        />
                    </Collapsible>
                </ScrollView>
            </View>
        )
    }
}