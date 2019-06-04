import { observable, action } from 'mobx';
import { Alert } from 'react-native';
import { getDataLocal, saveDataLocal } from '../Utils';
import { login, register, sendQuest, getQuest, getQuestDetail } from '../request';

export default class MainStore {
    @observable mail = "";
    @observable pass = "";
    @observable name = "";
    @observable dob = "Chọn ngày sinh";
    @observable sex = true;
    @observable phone = "";
    @observable data;
    @observable data_detail;
    @observable data_image = [];
    @observable data_record = [];
    @observable type = 1;
    @observable content = "";
    @observable data_user;
    @observable navigation;
    @observable isLoading = false;
    @observable showColl1 = true;
    @observable showColl2 = true;

    @action toggleLoading = (stt) => {
        this.isLoading = stt == null ? !this.isLoading : stt;
    }

    @action toggleCollapse1 = (stt) => {
        this.showColl1 = stt == null ? !this.showColl1 : stt;
    }

    @action toggleCollapse2 = (stt) => {
        this.showColl2 = stt == null ? !this.showColl2 : stt;
    }

    @action toggleCollapseDetail = (index) => {
        let data_record2 = [...this.data_detail];
        data_record2.forEach((r, i) => {
            r.collSlapse = i == index ? !r.collSlapse : r.collSlapse
        })
        this.data_record = [...data_record2]
    }

    @action setNavigation = (nav) => {
        this.navigation = nav;
    }

    @action setName = (name) => {
        this.name = name;
    }

    @action setEmail = (email) => {
        this.mail = email;
    }

    @action setPass = (pass) => {
        this.pass = pass;
    }

    @action setDob = (dob) => {
        this.dob = dob;
    }

    @action setSex = (val) => {
        this.sex = val;
    }

    @action setPhone = (phone) => {
        this.phone = phone;
    }

    @action setType = (val) => {
        this.type = val;
    }

    @action setContent = (val) => {
        this.content = val;
    }

    @action addImage = (img) => {
        let data = [...this.data_image]
        this.data_image = []
        data.unshift(img);
        this.data_image = [...data]
        console.log("add images: ", this.data_image)
    }

    @action resetData = () => {
        this.data_image = []
        this.type = 1
        this.content = ""
    }

    @action checkLogin = async () => {
        this.data_user = await getDataLocal("data_user");
        if (this.data_user != null) {
            this.mail = this.data_user.email
            this.pass = this.data_user.pass
            this.signIn();
        }
    }

    @action signIn = () => {
        // this.navigation.navigate("Home")
        this.toggleLoading()
        login(this.mail, this.pass).then(response => {
            this.toggleLoading()
            if (response != null && response.success == true) {
                this.data_user = response.data;
                this.data_user.pass = this.pass;
                saveDataLocal("data_user", this.data_user).then(() => {
                    this.pass = ""
                    this.mail = ""
                    this.navigation.navigate("Home")
                })
            } else {
                Alert.alert("Đăng nhập thất bại")
            }
        })
    }

    @action signUp = () => {
        this.toggleLoading()
        register(this.mail, this.pass, this.name, this.sex ? 0 : 1, this.dob, this.phone).then(response => {
            this.toggleLoading()
            if (response != null && response.status == 'success') {
                this.pass = ""
                Alert.alert("Đăng kí thành công")
            } else {
                Alert.alert("Đăng kí thất bại")
            }
        })
    }

    @action sendQuest = () => {
        this.toggleLoading()
        sendQuest(this.type + "", this.content, this.data_image).then(response => {
            this.toggleLoading()
            if (response != null && response.constructor === {}.constructor) {
                this.resetData()
                Alert.alert("Gửi thành công")
            } else {
                Alert.alert("Không thể gửi câu hỏi")
            }
        })
    }

    @action getQuest = () => {
        getQuest().then(response => {
            if (response != null && response.constructor === {}.constructor) {
                this.data = null;
                this.data = response;
            } else {
                Alert.alert("Không thể lấy câu hỏi")
            }
        })
    }

    @action getQuestionDetail = (id) => {
        this.toggleLoading()
        getQuestDetail(id).then(response => {
            this.toggleLoading()
            if (response != null && response.constructor === {}.constructor) {
                if(response.question == null) {
                    Alert.alert("Không tìm thấy câu hỏi")
                } else {
                    this.data_detail = response;
                    let data_record2 = response.medical_records;
                    data_record2.forEach((r, i) => {
                        r.collSlapse = true
                    })
                    this.data_record = [...data_record2]
                }
            } else {
                Alert.alert("Không thể lấy câu hỏi")
            }
        })
    }
}