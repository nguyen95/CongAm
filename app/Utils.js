import AsyncStorage from '@react-native-community/async-storage';

export const saveDataLocal = async (key, original_data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(original_data));
    } catch (error) {
        console.error(error);
    }
}

export const getDataLocal = async (key) => {
    let value = null;
    try {
        value = await AsyncStorage.getItem(key);
    } catch (error) {
        console.error(error);
    }
    return value == null
        ? null
        : Object.entries(value).length <= 2
            ? null
            : JSON.parse(value);
}

export const clearDataLocal = async () => {
    await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiRemove(keys, (err) => {

        });
    });
}

export const objToQueryString = (obj) => {
    const keyValuePairs = [];
    for (const key in obj) {
        keyValuePairs.push(decodeURIComponent(key) + '=' + (obj[key]));
    }
    return keyValuePairs.join('&');
}

export var domainApp = {
    domain1: "http://210.211.96.141:3000",
    domain2: "https://curvo.serveo.net",
}

export const changeDomain = (val) => {
    domainApp.domain1 = val
}