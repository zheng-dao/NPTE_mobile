import React from 'react'
import { View, TextInput, Platform, Keyboard, Image, TouchableOpacity, Alert, } from 'react-native'
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
import IC_MESSAGE from '../../images/ic_message.png'
import IC_BACK from '../../images/ic_back.png'


import { forgotPassword } from '../../network/api';
import Loader from '../../components/loader/Loader';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      email: '',
    }
  }

  isEmailValid = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    return reg.test(email);
  }

  handleTextChange = (text) => {
    this.setState({email: text});
  }

  sendEmail = async () => {
    this.setState({loading: true});
    const response = await forgotPassword(this.state.email);
    
    this.setState({loading: false});
    if(response.error){
      Alert.alert(response.error);
    }else{
      Alert.alert(response.success);
    }
  }

  render() {
    const { 
      props: { 
        navigation 
      },
      state: {
        loading,
        email,
      },
      isEmailValid,
      handleTextChange,
      sendEmail,
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
        
          <AlignCenter
            paddingTop={40}
            paddingBottom={40}
            paddingLeft={30}
            paddingRight={30}
            backgroundColor={DARK_BLUE}>
            <CustomTxt
              text='Forgot Password'
              textColor={WHITE}
              fontSize={24}
            />
            <CustomTxt
              text='Write your email below for new password.'
              textColor={WHITE}
              fontSize={18}
              marginTop={10}
              textAlign='center'
            />
          </AlignCenter>

        <TouchableOpacity 
          style={{ marginTop:20, marginLeft:10, position: 'absolute'}}
          onPress={() => navigation.pop()}>
          <Image style={{ height:20, width:20}} source={IC_BACK} />
        </TouchableOpacity>

        <MainCon paddingTop={30}>
          <PageWidth>
            <View style={{ alignItems: 'center' }}>
              <FlexRowAndCenter marginRight={25}>
                <Image style={ commonStyle.textFieldIconStyle } source={IC_MESSAGE} />
                  <TextInput
                    style={ commonStyle.textFieldStyle }
                    ref="input_email"
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    autoCorrect={false}
                    enablesReturnKeyAutomatically
                    returnKeyType="next"
                    keyboardType="email-address"
                    onChangeText={(value) => handleTextChange(value)}
                    placeholder="Your Email"
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
                isButtonDisable={!isEmailValid(email)}
                onPress={() => sendEmail()}
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