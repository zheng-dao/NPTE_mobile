/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import MainNavigator from './src/screens/main'
import { IS_ANDROID } from './src/common/utility';
import messaging from '@react-native-firebase/messaging';

export default class App extends Component {

  componentDidMount() {
    if (!IS_ANDROID) {
      this.requestUserPermission();
    }

    this.getFCMToken();
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      console.log('********>', 'Permission GRANTED')
    }
  }

  getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log("TOKEN::: (App)", token);
    } catch (e) {
      console.log(error);
    }
  };

// <MainNavigator />
  render() {
    return (
      <MainNavigator />
    );
  }
}
