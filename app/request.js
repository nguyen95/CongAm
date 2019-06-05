import AsyncStorage from '@react-native-community/async-storage';
import { domainApp } from './Utils';

let access_token = null;
let expiry = null;
let uid = null;
let client = null;
export let dataHeader = null;

async function callMain(url_request, params, method) {
    console.log("urlllllllllllllllllll", url_request)
    return getHeader().then(async () => await call(url_request, params, method))
}

async function call(url_request, params, method) {
    let headers = {
        // Accept: "application/json",
        // "content-type": "application/json; charset=utf-8",
        access_token: access_token,
        expiry: expiry,
        uid: uid,
        client: client,
    };
    let responseJson;
    try {
        console.log("url_request: ", url_request);

        var formData = new FormData();

        if (url_request == "/questions") {
            Object.keys(params).forEach(key => {
                console.log("formData: ", key, params[key])
                if (key == "images[]") {
                    let data = params[key]
                    data.forEach((img) => {
                        formData.append(key, img);
                    });
                } else {
                    formData.append(key, params[key])
                }
            });
        } else {
            Object.keys(params).forEach(key => {
                console.log("formData: ", key, params[key])
                formData.append(key, params[key])
            });
        }

        let domain = domainApp.domain1;

        let response = method == "POST"
            ? url_request == "/auth/sign_in/"
                ? await fetch(domain + url_request, {
                    method: method,
                    body: formData,
                })
                : await fetch(domain + url_request, {
                    method: method,
                    headers: headers,
                    body: formData,
                })
            : await fetch(domain + url_request, {
                method: method,
                headers: headers,
            })

        if (response.ok) {
            if (url_request === "/auth/sign_in/") {
                saveHeader(response, params);
            }
        }
        responseJson = await response.json();
        console.log("dataaaaaaaaaaa: ", responseJson);
    } catch (err) {
        console.log("error...: ", err);
        return null;
    }

    return responseJson;
}

async function saveHeader(response, params) {
    access_token = response.headers.map['access-token'];
    expiry = response.headers.map.expiry;
    uid = response.headers.map.uid;
    client = response.headers.map.client;
    console.log("saveHeader: ", access_token, expiry, uid, client);
    dataHeader = {
        access_token_tempt: access_token,
        expiry_tempt: expiry,
        uid_tempt: uid,
        client_tempt: client,
    };
    try {
        await AsyncStorage.setItem("dataHeader", JSON.stringify(dataHeader));
    } catch (error) {
        console.error(error);
    }
}

async function getHeader() {
    if (access_token == null) {
        await AsyncStorage.getItem("dataHeader").then(value => {
            if (value !== null) {
                dataHeader = JSON.parse(value);
            }
            if (dataHeader != null) {
                const { access_token_tempt, expiry_tempt, uid_tempt, client_tempt } = dataHeader;
                access_token = access_token_tempt
                expiry = expiry_tempt
                uid = uid_tempt
                client = client_tempt
            }
        });
    }
}

module.exports = {

    // login
    login(email, password) {
        let params = {
            email: email,
            password: password,
        };
        return callMain("/auth/sign_in/", params, "POST");
    },
    // res
    register(email, password, name, sex, dob, phone_number) {
        let params = {
            email: email,
            password: password,
            name: name,
            sex: sex,
            dob: dob,
            phone_number: phone_number,
        };
        return callMain("/auth", params, "POST");
    },
    // send quest
    sendQuest(question_type, content, images) {
        console.log("sendQuest :", question_type, content, images)
        let params = {
            question_type: question_type,
            content: content,
            'images[]': images,
        };
        return callMain("/questions", params, "POST");
    },
    // get quest
    getQuest() {
        let params = {

        };
        return callMain("/user/me/questions", params, "GET");
    },
    // get quest detail
    getQuestDetail(id) {
        let params = {

        };
        return callMain("/user/me/question/" + id, params, "GET");
    },
}  