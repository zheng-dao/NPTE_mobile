import React from 'react'
import { View, TextInput, Platform, Keyboard, Image, TouchableOpacity, Alert, AsyncStorage, } from 'react-native'
import CustomBtn from '../../components/customBtn'
import CustomTxt from '../../components/customTxt';
import commonStyle from '../../common/styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  MainCon,
  PageWidth,
  AlignCenter,
  ViewMargin,
  FlexOne,
  FlexRow,
  FlexRowAndCenter
} from '../../common/commonStyles'
import {
  deviceWidth,
  deviceHeight,
  IS_IPHONE_X,
  IS_IPHONE_5
} from '../../common/utility'
import {
  BLACK,
  BLACK_FOUR,
  DARK_BLUE,
  WHITE,
  AVENIR_HEAVY,
  AVENIR_BLACK,
} from '../../common';
import LOGO from '../../images/logo.png'
import IC_MESSAGE from '../../images/ic_message.png'
import IC_USER from '../../images/ic_user.png'
import IC_PHONE from '../../images/ic_phone.png'
import IC_LOCK from '../../images/ic_lock.png'
import IC_BACK from '../../images/ic_back.png'

import { register } from '../../network/api';
import Loader from '../../components/loader/Loader';
import messaging from '@react-native-firebase/messaging';

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        gender: '',
        address: '',
        phone: '',
        PushToken: 'xyz-temp'
      },
      fcmToken: '',
    }
  }

  componentDidMount() {
    this.getFCMToken();
  }

  getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log("TOKEN::: (App)", token);
      this.setState({ fcmToken: token });
    } catch (e) {
      console.log(error);
    }
  };

  loadDefaults = () => {
    /*const user = this.state.user;
    user.first_name = 'Ahsan';
    user.last_name = 'Ch';
    user.email = 'ahsan@xyz.com';
    user.password = '12345678';
    user.password_confirmation = '12345678';
    user.phone = '03007814492';

    this.setState({ user });*/
  }

  handleTextChange = (type, text) => {
    const user = this.state.user;
    user[type] = text;
    this.setState({ user })
  }

  isEmailValid = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  }

  isTextValid = (text) => {
    return text.length > 0;
  }

  isPasswordValid = (text) => {
    return text.length >= 8;
  }

  isFormValid = () => {
    const {
      state: {
        user: {
          first_name,
          last_name,
          email,
          password,
          password_confirmation,
          phone,
        }
      },
      isEmailValid,
      isTextValid,
      isPasswordValid,
    } = this;

    let errorMessage = '';

    if (!isTextValid(first_name)) {
      errorMessage = 'First name is not valid.';
    } else if (!isTextValid(last_name)) {
      errorMessage = 'Last name is not valid.';
    } else if (!isEmailValid(email)) {
      errorMessage = 'Email is not valid.';
    } else if (!isPasswordValid(phone)) {
      errorMessage = 'Phone number is not valid.';
    } else if (!isPasswordValid(password)) {
      errorMessage = 'Password is not valid.';
    } else if (!isPasswordValid(password_confirmation)) {
      errorMessage = 'Confirm password is not valid.';
    } else if (password != password_confirmation) {
      errorMessage = 'Password & Confirm password mismatch.';
    }

    if (errorMessage.length > 0) {
      Alert.alert(errorMessage);
      return false;
    } else {
      return true;
    }

  }

  signup = () => {
    this.setState({ loading: true });
    register(this.state.user, this.state.fcmToken).then(async response => {
      console.log('signup', 'HERE', response);
      this.setState({ loading: false });
      if (response.id) {
        await AsyncStorage.setItem('user', JSON.stringify(response));
        await AsyncStorage.setItem('token', response.api_token);
        this.props.navigation.navigate('AppNavigator');
      } else {
        Alert.alert(response.error)
      }
    });
  }

  render() {
    const {
      props: {
        navigation,
      },
      state: {
        user,
        loading,
      },
      handleTextChange,
      isFormValid,
      signup,
      loadDefaults,
    } = this;

    return (
      <FlexOne backgroundColor={WHITE}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          enableOnAndroid={true}
          keyboardDismissMode={(Platform.OS == 'ios') ? 'none' : 'interactive'}
          showsVerticalScrollIndicator={false}
          scrollToEnd={true}
          extraHeight={deviceHeight / 2.7}>

          <AlignCenter paddingTop={20} paddingBottom={20} backgroundColor={DARK_BLUE}>
            <TouchableOpacity onPress={() => loadDefaults()}>
              <Image style={{ height: 120, resizeMode: 'contain' }} source={LOGO} />
            </TouchableOpacity>
          </AlignCenter>

          <TouchableOpacity
            style={{ marginTop: 10, marginLeft: 0, position: 'absolute', padding: 20 }}
            onPress={() => navigation.pop()}>
            <Image style={{ height: 20, width: 20 }} source={IC_BACK} />
          </TouchableOpacity>

          <MainCon paddingTop={30}>
            <PageWidth>
              <View style={{ alignItems: 'center' }}>
                <FlexRowAndCenter marginRight={25}>
                  <Image style={commonStyle.textFieldIconStyle} source={IC_USER} />
                  <TextInput
                    style={commonStyle.textFieldStyle}
                    ref="first_name"
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    value={user.first_name}
                    autoCorrect={false}
                    onChangeText={(value) => handleTextChange('first_name', value)}
                    enablesReturnKeyAutomatically
                    returnKeyType="next"
                    placeholder="First Name"
                    placeholderTextColor={BLACK_FOUR}
                    allowFontScaling={false}
                  />
                </FlexRowAndCenter>
                <FlexRow
                  height={0.5}
                  width='100%'
                  backgroundColor={BLACK}
                />
              </View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <FlexRowAndCenter marginRight={25}>
                  <Image style={commonStyle.textFieldIconStyle} source={IC_USER} />
                  <TextInput
                    style={commonStyle.textFieldStyle}
                    ref="last_name"
                    value={user.last_name}
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => handleTextChange('last_name', value)}
                    enablesReturnKeyAutomatically
                    returnKeyType="next"
                    placeholder="Last Name"
                    placeholderTextColor={BLACK_FOUR}
                    allowFontScaling={false}
                  />
                </FlexRowAndCenter>
                <FlexRow
                  height={0.5}
                  width='100%'
                  backgroundColor={BLACK}
                />
              </View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <FlexRowAndCenter marginRight={25}>
                  <Image style={commonStyle.textFieldIconStyle} source={IC_MESSAGE} />
                  <TextInput
                    style={commonStyle.textFieldStyle}
                    ref="input_email"
                    value={user.email}
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => handleTextChange('email', value)}
                    enablesReturnKeyAutomatically
                    returnKeyType="next"
                    keyboardType="email-address"
                    placeholder="Email"
                    placeholderTextColor={BLACK_FOUR}
                    allowFontScaling={false}
                  />
                </FlexRowAndCenter>
                <FlexRow
                  height={0.5}
                  width='100%'
                  backgroundColor={BLACK}
                />
              </View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <FlexRowAndCenter marginRight={25}>
                  <Image style={commonStyle.textFieldIconStyle} source={IC_PHONE} />
                  <TextInput
                    style={commonStyle.textFieldStyle}
                    ref="phone"
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    onChangeText={(value) => handleTextChange('phone', value)}
                    autoCorrect={false}
                    enablesReturnKeyAutomatically
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    value={user.phone}
                    placeholder="Phone"
                    placeholderTextColor={BLACK_FOUR}
                    allowFontScaling={false}
                  />
                </FlexRowAndCenter>
                <FlexRow
                  height={0.5}
                  width='100%'
                  backgroundColor={BLACK}
                />
              </View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <FlexRowAndCenter marginRight={25}>
                  <Image style={commonStyle.textFieldIconStyle} source={IC_LOCK} />
                  <TextInput
                    style={commonStyle.textFieldStyle}
                    ref="input_password"
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    enablesReturnKeyAutomatically
                    returnKeyType="next"
                    onChangeText={(value) => handleTextChange('password', value)}
                    secureTextEntry
                    value={user.password}
                    placeholder="Password"
                    placeholderTextColor={BLACK_FOUR}
                    onSubmitEditing={Keyboard.dismiss}
                    allowFontScaling={false}
                  />
                </FlexRowAndCenter>
                <FlexRow
                  height={0.5}
                  width='100%'
                  backgroundColor={BLACK}
                />
              </View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <FlexRowAndCenter marginRight={25}>
                  <Image style={commonStyle.textFieldIconStyle} source={IC_LOCK} />
                  <TextInput
                    style={commonStyle.textFieldStyle}
                    ref="input_confirm_password"
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    enablesReturnKeyAutomatically
                    returnKeyType="go"
                    secureTextEntry
                    value={user.password_confirmation}
                    onChangeText={(value) => handleTextChange('password_confirmation', value)}
                    placeholder="Confirm Password"
                    placeholderTextColor={BLACK_FOUR}
                    onSubmitEditing={Keyboard.dismiss}
                    allowFontScaling={false}
                  />
                </FlexRowAndCenter>
                <FlexRow
                  height={0.5}
                  width='100%'
                  backgroundColor={BLACK}
                />
              </View>

              <AlignCenter marginTop={15} marginBottom={15}>
                <CustomBtn
                  btnHeight={50}
                  btnWidth={deviceWidth <= 320 ? 260 : 300}
                  borderRadius={7}
                  boxShadow={true}
                  backgroundColor={DARK_BLUE}
                  fontFamily={AVENIR_BLACK}
                  btnText='Sign Up'
                  textColor={WHITE}
                  fontSize={16}
                  onPress={() => isFormValid() && signup()}
                />
              </AlignCenter>

              <AlignCenter marginBottom={20}>
                <CustomBtn
                  textColor={BLACK}
                  fontSize={16}
                  fontFamily={AVENIR_HEAVY}
                  paddingLeft={0}
                  paddingRight={0}
                  paddingBottom={5}
                  btnText='I have an Account'
                  onPress={() => navigation.navigate('LoginScreen')}
                />
              </AlignCenter>
            </PageWidth>
          </MainCon>
        </KeyboardAwareScrollView>

        <Loader loading={loading} />
      </FlexOne>
    )
  }
}