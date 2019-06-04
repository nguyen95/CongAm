import { observable, action, computed } from "mobx";
import {themes} from '../themes'

export default class LoginViewStore {
    @observable isSignIn = true;
    @observable color_active = themes.colorApp;
    @observable color_back_active = themes.colorBG;
    @observable color_inactive = themes.colorBG;
    @observable color_back_inactive = themes.colorApp;

    @action toggleStt = (stt) => {
        this.isSignIn = stt == null ? !this.isSignIn : stt;
        this.isSignIn ? this.previousColor() : this.nextColor();
    }

    @action nextColor = () => {
        this.color_active = themes.colorBG;
        this.color_back_active = themes.colorApp;
        this.color_inactive = themes.colorApp;
        this.color_back_inactive = themes.colorBG;
    }

    @action previousColor = () => {
        this.color_active = themes.colorApp;
        this.color_back_active = themes.colorBG;
        this.color_inactive = themes.colorBG;
        this.color_back_inactive = themes.colorApp;
    }
}