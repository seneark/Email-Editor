import React, {Component} from 'react';
import Routes from './Router/HomeRoutes';
import {Provider} from 'react-redux';
import store from './store';
// import { AppRegistry, View } from "react-native";
import {MenuProvider} from 'react-native-popup-menu';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MenuProvider>
                    <Routes/>
                </MenuProvider>
            </Provider>
        );
    }
}

export default App;
// AppRegistry.registerComponent("task", () => App);
