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
export default class HistoryDetail extends Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this)
    }

    componentWillMount() {
        const { mainStore, navigation } = this.props
        let id = navigation.state.params.id;
        mainStore.getQuestionDetail(id)
    }

    renderItem = (item, index) => {
        return <View>
            <TouchableOpacity
                contentContainerStyle={styles.title_detail}
                onPress={() => mainStore.toggleCollapseDetail(index)}
            >
                <Text >Tư vấn dược gửi: {item.created_at.split(".")[0]}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={item.collSlapse}>
                <View style={{ width: themes.fullWidth - 32, padding: 16 }}>
                    <Text style={styles.label}>Chỉ định</Text>
                    <Text style={styles.content_record}>{item.assign}</Text>
                    <Text style={styles.label}>Kê đơn</Text>
                    <Text style={styles.content_record}>{item.prescription}</Text>
                    <Text style={styles.label}>Kết luận</Text>
                    <Text style={styles.content_record}>{item.reasoning}</Text>
                </View>
            </Collapsible>
        </View>
    }

    render() {
        const { mainStore, navigation } = this.props;
        let type = navigation.state.params.type;
        const { isLoading, data_detail } = mainStore;
        return (
            <View style={styles.container}>
                <HeaderExit
                    navigation={navigation}
                    onPress={() => {
                    }}
                    title="Chi tiết câu hỏi"
                />
                <ScrollView
                    contentContainerStyle={styles.content_container}
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        <View
                            style={styles.title_container}
                        >
                            <Text style={styles.title}>Câu hỏi của bạn</Text>
                        </View>
                        <View style={{ height: 4 }} />
                        <Text style={styles.label}>Loại câu hỏi: {type}</Text>
                        <View style={{ height: 4 }} />
                        <Text style={styles.label}>Nội dung câu hỏi:</Text>
                        <View style={{ height: 4 }} />
                        <Text style={styles.input_text}>{data_detail != null ? data_detail.question.content : ""}</Text>
                        <View style={{ height: 4 }} />
                        <Text style={styles.label}>Ảnh đã gửi:</Text>
                        <FlatList
                            style={styles.list_image}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={true}
                            data={data_detail == null ? [] : data_detail.images}
                            keyExtractor={(item) => item.link_path}
                            renderItem={({ item }) => <FastImage
                                style={styles.image}
                                source={{
                                    uri: "http://210.211.96.141:3000" + item.link_path
                                }}
                                resizeMode='cover'
                            />}
                        />

                        <View style={{ height: 4 }} />
                        <Text style={styles.label}>Tư vấn của bác sĩ:</Text>
                        <FlatList
                            style={styles.list_image}
                            showsVerticalScrollIndicator={false}
                            data={data_detail == null ? [] : data_detail.medical_records}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => this.renderItem(item, index)}
                        />
                    </View>
                </ScrollView>

                {isLoading ? <LoadingView /> : null}
            </View>
        )
    }
}