/**
 * @format
 */

import React from 'react';
import { AppRegistry, YellowBox } from 'react-native';
import { name as appName } from './app.json';
import { Provider as ProviderMobx } from "mobx-react";
import stores from "./app/mobxStore";

// const App = require("./App").default;
const App = require("./app/App").default;

YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader"
]);

export default function Main() {
    console.log("mainnnnnnnnnnnnnnn")
    return (
        <ProviderMobx {...stores}>
            <App />
        </ProviderMobx>
    );
}

AppRegistry.registerComponent(appName, () => Main);
