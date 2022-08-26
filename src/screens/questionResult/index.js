import React from 'react'
import { View, TextInput, Platform, Keyboard, Image, TouchableOpacity, Alert, AsyncStorage, Text,} from 'react-native'
import CustomBtn from '../../components/customBtn'
import commonStyle from '../../common/styles'
import CustomTxt from '../../components/customTxt';
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
import IC_BACK from '../../images/ic_back.png'

export default class QuestionResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  
  render() {
    const { 
      props: {
        navigation,
      },
    } = this;

    const isCorrect = this.props.navigation.state.params.isCorrect;
    console.log('~~~~~~>', isCorrect);
    
    return (
      <FlexOne backgroundColor={WHITE}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          enableOnAndroid={true}
          keyboardDismissMode={(Platform.OS == 'ios') ? 'none' : 'interactive'}
          showsVerticalScrollIndicator={false}
          scrollToEnd={true}
          extraHeight={deviceHeight / 2.7}>
        
        <AlignCenter paddingTop={20} paddingBottom={20} backgroundColor={DARK_BLUE} />

        <TouchableOpacity 
          style={{ marginTop:10, marginLeft:0, position: 'absolute', padding: 20}}
          onPress={() => navigation.pop()}>
          <Image style={{ height:20, width:20}} source={IC_BACK} />
        </TouchableOpacity>

        <MainCon paddingTop={30}>
          <PageWidth>
            <AlignCenter>
            <CustomTxt
              marginTop={50}
              textColor={BLACK}
              textAlign='center'
              fontSize={24}
              text={isCorrect&& isCorrect? 'Congratulations,\n Your answer is correct.': 'Ooops,\n Your answer is wrong.'}
              />
            </AlignCenter>
          </PageWidth>
          </MainCon>
        </KeyboardAwareScrollView>
      </FlexOne>
    )
  }
}