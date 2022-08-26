import React, { createRef } from 'react'
import { View, TextInput, Platform, Keyboard, Image, Alert, TouchableOpacity, AsyncStorage } from 'react-native'
import CustomBtn from '../../components/customBtn'
import commonStyle from '../../common/styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  MainCon,
  PageWidth,
  AlignCenter,
  ViewMargin,
  FlexOne,
  FlexRow,
  FlexRowAndCenter,
} from '../../common/commonStyles'
import {
  deviceWidth,
  deviceHeight,
  IS_IPHONE_X,
  IS_IPHONE_5,
  IS_ANDROID
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
import IC_BACK from '../../images/ic_back.png'
import IC_MESSAGE from '../../images/ic_message.png'
import IC_LOCK from '../../images/ic_lock.png'

import { login } from '../../network/api';
import { phoneLogin } from '../../network/api';
import Loader from '../../components/loader/Loader';

import messaging from '@react-native-firebase/messaging';
import PhoneInput from "react-native-phone-number-input";

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: '',
      },
      loading: false,
      fcmToken: '',
      phone: '',
      valid: false,
      formattedPhone: ''
    };
    this.phoneInputRef = createRef();
  }

  componentDidMount() {
    // this.getFCMToken();
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
    user.email = 'leostar444@gmail.com';
    user.password = '12345678';
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

  isFormValid = () => {
    const {
      state: {
        user: {
          email,
          password,
        }
      },
      isEmailValid,
    } = this;
    return (isEmailValid(email) && password.length >= 8);
  }

  login = () => {
    const {
      props: {
        navigation,
      },
      state: {
        user: {
          email,
          password,
        },
        fcmToken,
      },
    } = this;

    this.setState({ loading: true });
    login(email, password, fcmToken).then(async response => {
      console.log('login > response:', response);
      this.setState({ loading: false });
      if (response.id) {
        await AsyncStorage.setItem('user', JSON.stringify(response));
        await AsyncStorage.setItem('token', response.api_token);
        navigation.navigate('AppNavigator')
      } else {
        Alert.alert(response.error)
      }
    });
  }

  phoneLogin = () => {
    const {
      props: {
        navigation,
      },
      state: {
        phone,
        formattedPhone
      },
    } = this;

    this.setState({ loading: true });
    const checkValid = this.phoneInputRef.current?.isValidNumber(phone);
    this.setState({
      valid: checkValid ? checkValid : false
    });
    if (checkValid) {
      phoneLogin(formattedPhone).then(async response => {
        this.setState({ loading: false });
        if (response.status === "pending") {
          navigation.navigate('VerificationCheckScreen', { phone: formattedPhone })
        } else {
          Alert.alert(response.error)
        }
      });
    } else {
      Alert.alert("Phone number is invalid",);
    }
  }

  render() {
    const {
      props: {
        navigation
      },
      state: {
        user,
        loading,
        phone
      },
      handleTextChange,
      login,
      phoneLogin,
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

          {/* <TouchableOpacity 
          style={{ marginTop:20, marginLeft:10, position: 'absolute'}}
          onPress={() => ()}>
          <Image style={{ height:20, width:20}}
            source={IC_BACK}
            />
        </TouchableOpacity> */}

          <MainCon paddingTop={30}>
            <PageWidth>
              <View style={{ alignItems: 'center' }}>
                <FlexRowAndCenter marginRight={25}>
                  {/* <Image style={commonStyle.textFieldIconStyle} source={IC_MESSAGE} /> */}
                  {/* <TextInput
                    style={commonStyle.textFieldStyle}
                    ref="input_email"
                    value={user.email}
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    autoCorrect={false}
                    enablesReturnKeyAutomatically
                    returnKeyType="next"
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={(value) => handleTextChange('email', value)}
                    placeholderTextColor={BLACK_FOUR}
                    allowFontScaling={false}
                  /> */}
                  <PhoneInput
                    containerStyle={commonStyle.phoneInputContainerStyle}
                    textContainerStyle={commonStyle.phoneTextContainerStyle}
                    ref={this.phoneInputRef}
                    value={phone}
                    defaultCode="US"
                    layout="first"
                    onChangeText={(text) => {
                      this.setState({ phone: text });
                    }}
                    onChangeFormattedText={(text) => {
                      this.setState({
                        formattedPhone: text
                      });
                    }}
                    countryPickerProps={{ withAlphaFilter: true }}
                    // withDarkTheme
                    // withShadow
                    autoFocus
                  />
                </FlexRowAndCenter>
                <FlexRow
                  height={0.5}
                  width='100%'
                  backgroundColor={BLACK}
                />
              </View>
              {/* <View style={{ alignItems: 'center', marginTop: 10 }}>
                <FlexRowAndCenter marginRight={25}>
                  <Image style={commonStyle.textFieldIconStyle} source={IC_LOCK} />
                  <TextInput
                    style={commonStyle.textFieldStyle}
                    ref="input_password"
                    value={user.password}
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    enablesReturnKeyAutomatically
                    returnKeyType="go"
                    secureTextEntry
                    onChangeText={(value) => handleTextChange('password', value)}
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
              </View> */}
              <AlignCenter marginTop={20} marginBottom={20}>
                <CustomBtn
                  btnHeight={50}
                  btnWidth={deviceWidth <= 320 ? 260 : 300}
                  borderRadius={7}
                  boxShadow={true}
                  backgroundColor={DARK_BLUE}
                  fontFamily={AVENIR_BLACK}
                  btnText='Send'
                  textColor={WHITE}
                  fontSize={16}
                  // isButtonDisable={!this.isFormValid()}
                  onPress={() => phoneLogin()}
                />
              </AlignCenter>

              {/* <AlignCenter>
                <CustomBtn
                  textColor={BLACK_FOUR}
                  paddingLeft={0}
                  paddingRight={0}
                  paddingBottom={5}
                  marginBottom={20}
                  btnText='Forgot Password?'
                  onPress={() => navigation.navigate('ForgotPasswordScreen')}
                />
                <CustomBtn
                  textColor={BLACK}
                  fontSize={16}
                  paddingLeft={0}
                  paddingRight={0}
                  paddingBottom={5}
                  btnText='Create new Account'
                  onPress={() => navigation.navigate('SignupScreen')}
                />
              </AlignCenter> */}
            </PageWidth>
          </MainCon>
        </KeyboardAwareScrollView>
        <Loader loading={loading} />
      </FlexOne>
    )
  }
}