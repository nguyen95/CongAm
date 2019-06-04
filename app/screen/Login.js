import React, { Component } from 'react';
import { View } from 'react-native';
import HeaderLogin from '../component/HeaderLogin';
import { styles } from '../style/header.style';
import FormSignIn from '../container/form_signin';
import FormSignUp from '../container/form_signup';

import { inject, observer } from 'mobx-react';
import { themes } from '../themes';

@inject('loginViewStore')
@inject('mainStore')
@observer
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.props.mainStore.setNavigation(this.props.navigation);
        this.props.mainStore.checkLogin();
    }

    render() {
        const { loginViewStore, navigation } = this.props;
        var { isSignIn } = loginViewStore;
        return (
            <View style={{ flex: 1, backgroundColor: themes.colorBG }}>
                <HeaderLogin
                    navigation={navigation}
                    onPress={() => {
                    }}
                />
                {isSignIn == true ?
                    <FormSignIn navigation={navigation} />
                    : <FormSignUp />
                }
            </View>
        )
    }
}