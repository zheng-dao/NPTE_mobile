import React from 'react'
import { Platform, ImageBackground } from 'react-native'
import {
	MainCon,
	PageWidth,
	MainImgBg,
	AlignCenter,
	ViewMargin,
	FlexRowAndCenter,
	FlexRow,
} from '../../common/commonStyles'
import { 
  WHITE,
  GREEN,
  BLACK_SEVENTYSIX,
  PROXIMA_BOLD,
  AVENIR_HEAVY,
} from '../../common';
import {
  deviceWidth,
  deviceHeight,
  IS_IPHONE_X,
  IS_IPHONE_5
} from '../../common/utility'
import commonStyle from '../../common/styles'
import CustomTxt from '../../components/customTxt';
import CustomBtn from '../../components/customBtn'
import MAIN_BG from '../../images/main_bg.png'

export default class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { props: { navigation }} = this

    return (
      <ImageBackground source={MAIN_BG} style={{width: '100%', height: '100%'}}>
        <MainCon paddingTop={80}>
          <PageWidth>
            <AlignCenter>
              <ViewMargin marginBottom={22}>
                <CustomTxt
                  fontSize={26}
                  fontFamily={PROXIMA_BOLD}
                  textColor={WHITE}
                  text='Create a'
                />
                <CustomTxt
                  fontSize={26}
                  fontFamily={PROXIMA_BOLD}
                  textColor={WHITE}
                  text='New Account'
                />
                <FlexRow 
                  height={1}
                  width={40}
                  backgroundColor={WHITE}
                  marginTop={5}
                  marginBottom={5}
                />
                <CustomTxt
                  fontSize={16}
                  textColor={WHITE}
                  text='For the best experience'
                />
                <CustomTxt
                  fontSize={16}
                  textColor={WHITE}
                  text='with tractiv'
                />
              </ViewMargin>
            </AlignCenter>

            <FlexRowAndCenter marginTop={100} marginLeft={35} marginRight={40}>
              <AlignCenter>
                <CustomBtn
                  textColor={WHITE}
                  fontFamily={AVENIR_HEAVY}
                  fontSize={16}
                  btnText='Sign Up'
                  onPress={() => navigation.navigate('SignupScreen')}
                />
                <FlexRow 
                  height={1}
                  width={75}
                  backgroundColor={GREEN}
                  marginTop={6}
                  marginBottom={5}
                />
              </AlignCenter>
              <ViewMargin marginLeft={100}/>
              <CustomBtn
                textColor={WHITE}
                fontFamily={AVENIR_HEAVY}
                fontSize={16}
                marginBottom={5}
                btnText='Sign In'
                onPress={() => navigation.navigate('LoginScreen')}
              />
            </FlexRowAndCenter>

            <AlignCenter marginTop={30} marginBottom={20}>
              <ViewMargin marginBottom={IS_IPHONE_X ? 24 : 12}>
                <CustomBtn
                  btnHeight={60}
                  btnWidth={deviceWidth <= 320 ? 220 : 275}
                  boxShadow={true}
                  backgroundColor={WHITE}
                  btnText='SIGN UP WITH EMAIL'
                  textColor={BLACK_SEVENTYSIX}
                  fontSize={16}
                  onPress={() => navigation.navigate('SignupScreen')}
                />
              </ViewMargin>
              {/* <CustomBtn
                btnHeight={60}
                btnWidth={IS_IPHONE_5 ? 220 : 275}
                backgroundColor='transparent'
                btnText='SIGN UP WITH PHONE NUMBER'
                textColor={WHITE}
                fontSize={16}
                borderWidth={1}
                boxShadow={true}
                onPress={() => {}} /> */}
            </AlignCenter>
          </PageWidth>
        </MainCon>
      </ImageBackground>
    )
  }
}