import React, { Component } from "react";
import { StatusBar, Image } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import Question from "./screen/Question";
import History from "./screen/History";
import User from "./screen/User";
import Setting from "./screen/Setting";
import Login from "./screen/Login";
import HistoryDetail from "./screen/HistoryDetail";
import { themes } from "./themes";
import { Icon } from "native-base";

const StackHome = createBottomTabNavigator(
    {
        Tab1: {
            screen: User,
        },
        Tab2: {
            screen: Question,
        },
        Tab3: {
            screen: History,
        },
        Tab4: {
            screen: Setting,
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let name;
                switch (routeName) {
                    case "Tab1": name = "user"; break;
                    case "Tab2": name = "paper-plane"; break;
                    case "Tab3": name = "th-list"; break;
                    case "Tab4": name = "cog"; break;
                }
                return <Icon
                    type="FontAwesome"
                    name={name}
                    style={{
                        fontSize: 26,
                        color: focused ? themes.colorApp : themes.colorGrayLight
                    }}
                />;
            },
        }),
        tabBarOptions: {
            activeTintColor: themes.colorApp,
            inactiveTintColor: themes.colorGrayLight,
            backBehavior: "none",
            showLabel: false,
        },
        animationEnabled: true,
        lazy: false,
    }
);

const StackParent = createStackNavigator(
    {
        Login: { screen: Login },
        Home: { screen: StackHome },
        HistoryDetail: { screen: HistoryDetail },
    },
    {
        headerMode: "none",
        mode: "modal",
        navigationOptions: {
            gesturesEnabled: false
        },
    }
)

const Main = createAppContainer(StackParent);

export default class App extends Component {
    render() {
        console.disableYellowBox = true;
        return (
            <Main >
                <StatusBar backgroundColor={themes.colorApp}></StatusBar>
            </Main>
        );
    }
}