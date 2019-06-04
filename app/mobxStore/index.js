import MainStore from './main.store';
import LoginViewStore from './loginView.store';

let mainStore = new MainStore();
let loginViewStore = new LoginViewStore();

module.exports = {
    mainStore: mainStore,
    loginViewStore: loginViewStore,
}