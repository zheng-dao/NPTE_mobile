import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, } from 'react-native';
//import { PieChart } from 'react-native-chart-kit'
import PieChart from 'react-native-pie-chart';

import { deviceWidth, isValid } from '../../../common/utility'
import {NavigationEvents} from 'react-navigation';
import Loader from '../../../components/loader/Loader';
import { getUserReport, } from '../../../network/api'

import {
	MainCon,
	PageWidth,
	AlignCenter,
  FlexOne,
  FlexRow,
  ItemImgCon,
} from '../../../common/commonStyles'
import { WHITE, BLACK, BLACK_FOUR, BLACK_ONE } from '../../../common';
import CustomTxt from '../../../components/customTxt';

export default class StatsBySystem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      report: {},
      colors: [],
      values: [],
      names: [],
    }
  }

  async componentDidMount(){
    this.setState({loading: true});
    const report = await getUserReport(true);
    this.setState({loading: false});
    if(report.errors){
      setTimeout(() => Alert.alert(report.errors), 500);
    }else{
      const categories = this.compileReportData(report);
      this.setState({report: categories});
    }
  }

  onReload = async () => {
    const report = await getUserReport(true);
    if(report.errors){
      setTimeout(() => Alert.alert(report.errors), 500);
    }else{
      const categories = this.compileReportData(report);
      this.setState({report: categories});
    }
  }

  compileReportData = (report) => {
    report = report.report;
    let categories = [];

    let colors = [];
    let values = [];
    let names = [];
    
    for (var key in report) {
      let category = {name: key};
      let categoryStats = report[key];
      let reportArray = [];
      let index = 0;

      let categoryColors = [];
      let categoryValues = [];
      let categoryNames = [];

      console.log('+++++++>>', categoryStats);
      for (var catKey in categoryStats) {
        
        if(catKey != 'total') {
          const reportItem = {
            name: catKey,
            value: categoryStats[catKey],
            color: (index % 2 == 0)? '#648751': '#FF2C2D',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          };

          categoryColors.push((index % 2 == 0)? '#648751': '#FF2C2D');
          categoryValues.push(categoryStats[catKey]); //categoryStats[catKey]
          categoryNames.push(catKey);

          reportArray.push(reportItem);
          index = index + 1;
        }
      }
      category = {...category, report: reportArray}
      categories.push(category);

      colors.push(categoryColors);
      values.push(categoryValues);
      names.push(categoryNames);

    }
    console.log('====================================');
    console.log('++ categories ++>>', categories);
    console.log('====================================');
    this.setState({colors: colors, values: values, names: names});
    return categories;
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
        report,
        colors,
        values,
        names,
      },
      onReload,
    } = this;

    return (
      <View style={{flex: 1}}>
        {this.loadSubTitle()}
        <View style={styles.MainContainer}>
          <ScrollView  showsVerticalScrollIndicator={false}>
          {isValid(report) && report.map((category, index) => {
            
            return (
              <AlignCenter 
                key={index}
                style={{paddingBottom: report.length-1 == index? 100:0}}>
                <CustomTxt
                  textColor={BLACK}
                  textAlign='center'
                  marginTop={20}
                  marginBottom={10}
                  fontSize={20}
                  text={category.name}
                />
                
                {this.hasValidValue(values[index])?
                  <AlignCenter height={200}>
                  <PieChart
                    chart_wh={150}
                    series={values[index]}
                    sliceColor={colors[index]}
                    doughnut={true}
                    coverRadius={0.45}
                    coverFill={'#FFF'}/>
                  <FlexRow marginTop={10}>
                    {category.report.map((item, i) => {
                      return this.renderLegend(item, values[index], i)
                    })}
                  </FlexRow>
                </AlignCenter>
                :
                this.loadEmptyChart()
              }
                  
                <FlexRow
                  height={2}
                  width={deviceWidth}
                  backgroundColor={BLACK_FOUR}
                  marginTop={10}
                  marginBottom={10}
                />

              </AlignCenter>
            );
          })
          }
          </ScrollView>
          <Loader loading={loading}  />
          <NavigationEvents onDidFocus={() => onReload()} />
        </View>
      </View>
    );
  }
  
  renderLegend = (item, values, index) => {
    
    return(
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
        coverFill={'#FFF'}/>
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
            text={'By System (% Correct)'} />
        </AlignCenter>
    )
  }

  getPercentage = (item, values) => {
    const total = this.getSum(values);
    if(total == 0){
      return 0;
    }else{
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