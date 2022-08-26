import React from 'react'
import { View, TextInput, Platform, Keyboard, Image, TouchableOpacity, Alert, AsyncStorage, } from 'react-native'
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
  FlexRowAndCenter
} from '../../common/commonStyles'
import {
  deviceWidth,
  deviceHeight
} from '../../common/utility'
import {
  BLACK,
  BLACK_FOUR,
  DARK_BLUE,
  WHITE,
  AVENIR_BLACK,
} from '../../common';
import LOGO from '../../images/logo.png'
import IC_LOCK from '../../images/ic_lock.png'
import IC_BACK from '../../images/ic_back.png'

import { updatePassword } from '../../network/api';
import Loader from '../../components/loader/Loader';

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      user: {
        password: '',
        password_confirmation: ''
      },
    }
  }

  handleTextChange = (type, text) => { 
    const user = this.state.user;
    user[type] = text;
    this.setState({user})
  }

  isEmailValid = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    return reg.test(email);
  }

  isTextValid = (text) => {
    return text.length > 0;
  }

  isPasswordValid = (text) => {
    return text.length >= 8;
  }

  isFormValid = (showAlert) => {
    const {
      state: {
        user: {
          password,
          password_confirmation,
        }
      },
      isPasswordValid,
    } = this;

    let errorMessage = '';

    if(!isPasswordValid(password)){
      errorMessage = 'Password is not valid.';
    }else if(!isPasswordValid(password_confirmation)){
      errorMessage = 'Confirm password is not valid.';
    }else if(password != password_confirmation) {
      errorMessage = 'Password & Confirm password mismatch.';
    }

    if(errorMessage.length > 0){
      showAlert && Alert.alert(errorMessage);
      return false;
    }else{
      return true;
    }

  }

  updatePassword = () => {
    this.setState({loading: true});
    console.log('##########>' , this.state.user);
    
    
    updatePassword(this.state.user).then(async response => {
      console.log('updatePassword', 'HERE', response);
      this.setState({loading: false});
      if(response.id){
        //await AsyncStorage.setItem('user', JSON.stringify(response));
        //await AsyncStorage.setItem('token', response.api_token);
        this.props.navigation.pop();
      }else{
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
      updatePassword,
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
          <TouchableOpacity onPress={() => {}}>
            <Image style={{ height:120, resizeMode: 'contain'}} source={LOGO} />
          </TouchableOpacity>
        </AlignCenter>

        <TouchableOpacity 
          style={{ marginTop:10, marginLeft:0, position: 'absolute', padding: 20}}
          onPress={() => navigation.pop()}>
          <Image style={{ height:20, width:20}} source={IC_BACK} />
        </TouchableOpacity>

        <MainCon paddingTop={30}>
          <PageWidth>
            <View style={{ alignItems: 'center', marginTop:0 }}>
              <FlexRowAndCenter marginRight={25}>
                <Image style={ commonStyle.textFieldIconStyle } source={IC_LOCK} />
                  <TextInput
                    style={ commonStyle.textFieldStyle }
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
            <View style={{ alignItems: 'center', marginTop:10 }}>
              <FlexRowAndCenter marginRight={25}>
                <Image style={ commonStyle.textFieldIconStyle } source={IC_LOCK} />
                  <TextInput
                    style={ commonStyle.textFieldStyle }
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
                btnText='Reset Password'
                textColor={WHITE}
                fontSize={16}
                isButtonDisable={!isFormValid(false)}
                onPress={() => isFormValid(true) && updatePassword()}
              />
            </AlignCenter>
            </PageWidth>
          </MainCon>
        </KeyboardAwareScrollView>

        <Loader loading={loading}  />
      </FlexOne>
    )
  }
}