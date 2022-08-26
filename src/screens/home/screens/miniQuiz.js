import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
//import { PieChart } from 'react-native-chart-kit'
import PieChart from 'react-native-pie-chart';

import { deviceWidth, isValid } from '../../../common/utility'
import { NavigationEvents } from 'react-navigation';
import Loader from '../../../components/loader/Loader';
import { getCategories } from '../../../network/api'

import {
  MainCon,
  PageWidth,
  AlignCenter,
  FlexOne,
  FlexRow,
  ItemImgCon,
} from '../../../common/commonStyles'
import { WHITE, BLACK, BLACK_FOUR, BLACK_ONE, DARK_BLUE } from '../../../common';
import CustomTxt from '../../../components/customTxt';

export default class MiniQuiz extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      categories: [],
    };
  }

  async componentDidMount() {
    this.getCategories();
  }

  getCategories = async () => {
    this.setState({ loading: true });
    const categories = await getCategories();
    this.setState({ loading: false });
    if (categories.errors) {
      setTimeout(() => Alert.alert(categories.errors), 500);
    } else {
      this.setState({ categories });
    }
  }

  onReload = async () => {
    this.getCategories();
  }

  hasValidValue = (values) => {
    let sum = 0;
    values.map((value) => {
      sum = sum + value;
    })
    console.log('00000000>>', sum);

    return sum > 0;
  }

  render() {
    const {
      state: {
        loading,
        categories,
      },
      onReload,
    } = this;

    return (
      <View style={{ flex: 1 }}>
        {this.loadSubTitle()}
        <View style={styles.MainContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {isValid(categories) && categories.map((category, index) => {

              return (
                <AlignCenter
                  key={index}
                  style={{ paddingBottom: categories.length - 1 == index ? 100 : 0 }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('MINI_QUIZ_DETAIL', { category })}>
                    <CustomTxt
                      textColor={DARK_BLUE}
                      textAlign='center'
                      marginTop={20}
                      marginBottom={10}
                      fontSize={20}
                      text={category.name}
                      fontWeight={'bold'}
                    />

                    <FlexRow
                      height={2}
                      width={deviceWidth}
                      backgroundColor={BLACK_FOUR}
                      marginTop={10}
                      marginBottom={10}
                    />
                  </TouchableOpacity>


                </AlignCenter>
              );
            })
            }
          </ScrollView>
          <Loader loading={loading} />
          <NavigationEvents onDidFocus={() => onReload()} />
        </View>
      </View>
    );
  }

  renderLegend = (item, values, index) => {

    return (
      <View key={index}>
        <FlexRow marginLeft={15}>
          <FlexRow
            height={15}
            width={15}
            backgroundColor={item.color}
            marginTop={5}
            marginBottom={5}
          />

          <CustomTxt
            textColor={BLACK}
            textAlign='center'
            marginTop={0}
            marginLeft={10}
            fontSize={18}
            text={`${this.getPercentage(item, values)}%`}
          />

          <CustomTxt
            textColor={BLACK}
            textAlign='center'
            marginTop={0}
            marginLeft={5}
            fontSize={16}
            text={item.name}
          />

        </FlexRow>
      </View>
    )
  }

  loadEmptyChart = () => {
    return (
      <PieChart
        chart_wh={150}
        series={[0]}
        sliceColor={['#ccc']}
        doughnut={true}
        coverRadius={0.45}
        coverFill={'#FFF'} />
    );
  }

  loadSubTitle = () => {
    return (
      <AlignCenter padding={10} backgroundColor={'#ccc'}>
        <CustomTxt
          textColor={BLACK_ONE}
          textAlign='center'
          marginTop={0}
          fontWeight={'bold'}
          marginBottom={0}
          fontSize={20}
          text={'By System'} />
      </AlignCenter>
    )
  }

  getPercentage = (item, values) => {
    const total = this.getSum(values);
    if (total == 0) {
      return 0;
    } else {
      return Number(((item.value / total) * 100).toFixed(0));
    }
  }

  getSum = (values) => {
    let sum = 0;
    values.map((value) => {
      sum = sum + value;
    })
    return sum;
  }

}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 0,
    paddingTop: 0,
    alignItems: 'center',
    marginTop: 0,
    justifyContent: 'center',
    paddingTop: 0,
  },
});