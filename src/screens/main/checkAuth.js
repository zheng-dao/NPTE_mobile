import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, View} from 'react-native';


export default class CheckAuthScreen extends Component {
  constructor(props) {
    super(props);
    this.checkToken();
  }

  checkToken = async () => {
    //await AsyncStorage.removeItem('token');
    const token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(token ? 'AppNavigator' : 'LandingNavigator');
  }

  render() {
    return (
      <View><ActivityIndicator /></View>
    )
  }
}