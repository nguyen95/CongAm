import { StyleSheet } from "react-native";
import { themes } from "../themes";

export var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colorBG
    },
    content_container: {
        flex: 1,
        padding: 16,
    },
    tab_container: {
        flex: 1,
        padding: 16,
        alignItems: 'center'
    },
    title_container: {
        marginTop: 8,
        height: 40,
        width: themes.fullWidth - 32,
        backgroundColor: themes.colorApp,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title_detail: {
        marginTop: 8,
        height: 30,
        width: themes.fullWidth - 32,
        backgroundColor: themes.colorBG,
        paddingLeft: 8,
        paddingRight: 8,
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: themes.colorGrayLight,
    },
    title: {
        fontSize: 14,
        fontWeight: '400',
        color: themes.colorBG,
        textAlignVertical: 'center'
    },
    list_image: {
        marginTop: 8,
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    item: {
        width: themes.fullWidth - 32,
        borderWidth: 0.5,
        borderColor: themes.colorGrayLight,
        padding: 16
    },
    label: {
        color: 'black',
        fontWeight: '500',
    },
    content_record: {
        marginTop: 4,
        marginBottom: 8,
        marginLeft: 24,
    },
    input_text: {
        marginTop: 4,
        borderRadius: 4,
        borderWidth: 0.5,
        minHeight: 80,
        width: themes.fullWidth - 32,
        padding: 8,
        fontSize: 14,
        color: 'black',
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 4,
    },
    icon: {
        fontSize: 20,
        padding: 8,
        marginLeft: 8,
    }
})