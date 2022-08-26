import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
//import { PieChart } from 'react-native-chart-kit'
import PieChart from 'react-native-pie-chart';

import { NavigationEvents } from 'react-navigation';
import { deviceWidth, isValid } from '../../../common/utility'
import Loader from '../../../components/loader/Loader';
import { getRandomQuestions } from '../../../network/api'

import moment from 'moment';
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
import MiniQuestionComponent from './miniQuizComponent';

export default class MiniQuizDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      questions: [],
      index: 0,
      countOfTrue: 0
    }
  }

  componentDidMount() {
    this.getRandomQuestions();
  }

  getRandomQuestions = async () => {
    const category = this.props.navigation.state.params.category;
    this.setState({ loading: true });
    const randomQuestions = await getRandomQuestions(category.id);
    this.setState({ loading: false });
    if (randomQuestions.errors) {
      setTimeout(() => Alert.alert(randomQuestions.errors), 500);
    } else {
      this.setState({ questions: randomQuestions });
    }
  }

  onReload = () => {
    this.getRandomQuestions();
  }

  handleIndex = async (index) => {
    this.setState({ index });
  }

  handleAnswer = () => {
    const { countOfTrue } = this.state;
    this.setState({
      countOfTrue: countOfTrue + 1
    });
  }

  render() {
    const {
      state: {
        loading,
        questions,
        index
      },
      onReload,
      renderItem,
      loadChart,
      renderLegend
    } = this;

    return (
      <View style={{ flex: 1 }}>
        {/* {
          !(questions.length > 0 && index === questions.length) && this.loadSubTitle()
        } */}
        {
          questions.length > 0 && index <= questions.length &&
          <View style={styles.MainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {
                questions.map((question, i) => index === i && renderItem(question, i))
              }
            </ScrollView>
          </View>
        }

        {
          questions.length > 0 && index === questions.length &&
          <View style={styles.ChartContainer}>
            <AlignCenter>
              {
                loadChart()
              }
              {
                renderLegend()
              }
            </AlignCenter>
          </View>
        }

        <Loader loading={loading} />
        <NavigationEvents onDidFocus={() => onReload()} />
      </View>
    );
  }

  renderItem = (question, index) => {
    const {
      handleIndex,
      handleAnswer
    } = this;
    return <MiniQuestionComponent key={index} question={question} index={index} handleIndex={handleIndex} handleAnswer={handleAnswer} />
  }

  loadChart = () => {
    const { questions, countOfTrue } = this.state;
    const countOfFalse = questions.length - countOfTrue;
    return (
      <PieChart
        chart_wh={150}
        series={[countOfFalse, countOfTrue]}
        sliceColor={['red', 'green']}
        doughnut={true}
        coverRadius={0.45}
        coverFill={'#FFF'} />
    );
  }

  getPercentage = () => {
    const { questions, countOfTrue } = this.state;
    const total = questions.length;
    return Number(((countOfTrue / total) * 100).toFixed(0)); //Number((6.688689).toFixed(1));
  }

  renderLegend = () => {
    return (
      <FlexRow>
        <AlignCenter marginLeft={10}>
          <FlexRow alignItems={'center'} justifyContent={'center'} alignText={'center'} marginTop={20}>
            <FlexRow
              height={15}
              width={15}
              backgroundColor={'green'}
              marginTop={5}
              marginBottom={5}
            />

            <CustomTxt
              textColor={BLACK}
              textAlign='center'
              marginTop={0}
              marginLeft={10}
              fontSize={18}
              text={`${this.getPercentage()}%`}
            />

            <CustomTxt
              textColor={BLACK}
              textAlign='center'
              marginTop={0}
              marginLeft={10}
              fontSize={16}
              text={'right'}
            />

          </FlexRow>
        </AlignCenter>
        <AlignCenter marginLeft={10}>
          <FlexRow alignItems={'center'} justifyContent={'center'} alignText={'center'} marginTop={20}>
            <FlexRow
              height={15}
              width={15}
              backgroundColor={'red'}
              marginTop={5}
              marginBottom={5}
            />

            <CustomTxt
              textColor={BLACK}
              textAlign='center'
              marginTop={0}
              marginLeft={10}
              fontSize={18}
              text={`${100 - this.getPercentage()}%`}
            />

            <CustomTxt
              textColor={BLACK}
              textAlign='center'
              marginTop={0}
              marginLeft={10}
              fontSize={16}
              text={'wrong'}
            />

          </FlexRow>
        </AlignCenter>
      </FlexRow>
    )
  }

  loadSubTitle = () => {
    let title = '';
    if (this.state.questions.length > 0) {
      title = moment(this.state.questions[0].triggered_date).format('MMM DD, YYYY');
    }

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
  ChartContainer: {
    flex: 3,
    alignItems: 'center',
    marginTop: 0,
    justifyContent: 'flex-start',
  }
});