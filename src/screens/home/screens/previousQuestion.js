import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, Image, Platform, TouchableOpacity, } from 'react-native';
//import { PieChart } from 'react-native-chart-kit'
import PieChart from 'react-native-pie-chart';

import { NavigationEvents } from 'react-navigation';
import { deviceWidth, isValid, deviceHeight, IS_IPHONE_X } from '../../../common/utility'
import Loader from '../../../components/loader/Loader';
import { getUserReport, } from '../../../network/api'

import moment from 'moment';
import {
  MainCon,
  PageWidth,
  AlignCenter,
  FlexOne,
  FlexRow,
  ItemImgCon,
} from '../../../common/commonStyles'
import { WHITE, BLACK, BLACK_FOUR, BLACK_ONE, DARK_BLUE, THEME_BLUE_DARK } from '../../../common';
import CustomTxt from '../../../components/customTxt';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IC_BACK from '../../../images/ic_back.png'
import QuestionComponent from './questionComponent';

export default class PreviousQuestion extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      question: null,
    }
  }

  componentDidMount() {
    this.setState({ question: this.props.navigation.state.params.question })
  }

  render() {
    const {
      state: {
        loading,
        question,
      },
      props: {
        navigation,
      },
    } = this;
    const subHeading = navigation.state.params.subHeading;
    return (
      <FlexOne backgroundColor={WHITE}>
        <FlexRow backgroundColor={THEME_BLUE_DARK} height={IS_IPHONE_X? 80: 56}>
          <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ marginTop: 10, marginLeft: 0, position: 'absolute', padding: 20 }}
              onPress={() => navigation.pop()}>
              <Image style={{ height: 20, width: 20 }} source={IC_BACK} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 4, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <CustomTxt
              textColor={WHITE}
              textAlign='center'
              marginTop={0}
              marginBottom={0}
              fontSize={16}
              text={'Previous Questions'} />
          </View>
          <View style={{ flex: 1, height: '100%' }}></View>
          {/*<TouchableOpacity
            style={{ marginTop: 10, marginLeft: 0, position: 'absolute', padding: 20 }}
            onPress={() => navigation.pop()}>
            <Image style={{ height: 20, width: 20 }} source={IC_BACK} />
          </TouchableOpacity>*/}
        </FlexRow>

        {this.loadSubTitle(moment(subHeading).format('MMM DD, YYYY'))}

        <MainCon>
          {question != null && <QuestionComponent question={question} />}
        </MainCon>

        <Loader loading={loading} />
      </FlexOne>
    );
  }

  loadSubTitle = (title) => {
    return (
      <AlignCenter padding={10} backgroundColor={'#ccc'}>
        <CustomTxt
          textColor={BLACK_ONE}
          textAlign='center'
          marginTop={0}
          fontWeight={'bold'}
          marginBottom={0}
          fontSize={20}
          text={title} />
      </AlignCenter>
    )
  }

}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 0,
    alignItems: 'center',
    marginTop: 0,
    justifyContent: 'center',
  },
});