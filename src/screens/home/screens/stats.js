import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, } from 'react-native';
//import { PieChart } from 'react-native-chart-kit'
import PieChart from 'react-native-pie-chart';
import { deviceWidth, isValid } from '../../../common/utility'
import { NavigationEvents } from 'react-navigation';

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
import { WHITE, BLACK_FOUR, BLACK, BLACK_ONE } from '../../../common';
import CustomTxt from '../../../components/customTxt';

/*const data = [
  { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
]

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
}*/

export default class Stats extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      report: {},
      values: [],
      colors: [],
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const report = await getUserReport(false);
    if (report.errors) {
      this.setState({ loading: false });
      setTimeout(() => Alert.alert(report.errors), 500);
    } else {
      const reportArray = this.compileReportData(report);
      this.setState({ report: reportArray });
      this.setState({ loading: false });
    }
  }

  onReload = async () => {
    const report = await getUserReport(false);
    if (report.errors) {
      setTimeout(() => Alert.alert(report.errors), 500);
    } else {
      const reportArray = this.compileReportData(report);
      this.setState({ report: reportArray });
    }
  }

  compileReportData = (report) => {
    let reportArray = [];
    let values = [];
    let colors = [];
    let index = 0;
    for (var key in report.report) {

      if (key != 'total') {
        values.push(report.report[key]);
        colors.push((index % 2 == 0) ? '#FF2C2D' : '#648751')
        const reportItem = {
          name: key,
          value: report.report[key],
          color: (index % 2 == 0) ? '#FF2C2D' : '#648751',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        };
        reportArray.push(reportItem);
      }
      index = index + 1;
    }
    this.setState({ values: values, colors: colors, });
    console.log('++++values+++>>', values, colors);
    return reportArray;
  }

  hasValidValue = (values) => {
    let sum = 0;
    values.map((value) => {
      sum = sum + value;
    })
    return sum > 0;
  }

  getSum = (values) => {
    let sum = 0;
    values.map((value) => {
      sum = sum + value;
    })
    return sum;
  }

  render() {
    const {
      state: {
        loading,
        report,
        values,
        colors,
      },
      onReload,
    } = this;

    console.log('~~~report~~~~~>', report);

    return (
      <View style={{ flex: 1, }}>
        {this.loadSubTitle()}
        {/* (isValid(report) && this.hasValidValue(values)) */}
        <View style={styles.MainContainer}>
          {(isValid(report) && this.hasValidValue(values)) ?
            <AlignCenter>
              <PieChart
                chart_wh={150}
                series={values}
                sliceColor={colors}
                doughnut={true}
                coverRadius={0.45}
                coverFill={'#FFF'} />
              <FlexRow>
                {isValid(report) && report.map((item) => {
                  return this.renderLegend(item)
                })
                }
              </FlexRow>
            </AlignCenter>
            :
            this.loadEmptyChart()
          }
          <Loader loading={loading} />
          <NavigationEvents onDidFocus={() => onReload()} />
        </View>
      </View>
    );
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
          text={'Combined (% Correct)'} />
      </AlignCenter>
    )
  }

  getPercentage = (item) => {
    const values = this.state.values;
    const total = this.getSum(values);
    return Number(((item.value / total) * 100).toFixed(0)); //Number((6.688689).toFixed(1));
  }

  renderLegend = (item) => {
    console.log('renderLegend>>>', this.getPercentage(item));

    return (
      <AlignCenter marginLeft={10}>
        <FlexRow alignItems={'center'} justifyContent={'center'} alignText={'center'} marginTop={20}>
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
            text={`${this.getPercentage(item)}%`}
          />

          <CustomTxt
            textColor={BLACK}
            textAlign='center'
            marginTop={0}
            marginLeft={10}
            fontSize={16}
            text={item.name}
          />

        </FlexRow>
      </AlignCenter>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 0,
    paddingTop: 0,
    alignItems: 'center',
    marginTop: 0,
    justifyContent: 'center',
    paddingTop: 150,
  },
});