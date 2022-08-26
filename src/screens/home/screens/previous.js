import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
//import { PieChart } from 'react-native-chart-kit'
import PieChart from 'react-native-pie-chart';

import { NavigationEvents } from 'react-navigation';
import { deviceWidth, isValid } from '../../../common/utility'
import Loader from '../../../components/loader/Loader';
import { getUserReport, getPreviousQuestions, } from '../../../network/api'

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
import QuestionComponent from './questionComponent';

export default class Previous extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      type: 'DAY',
      start: '',
      end: '',
      questions: []
    }
  }

  componentDidMount() {
    this.onReload()
  }

  onReload = () => {
    this.setState({ type: this.props.navigation.state.params.type })

    const type = this.props.navigation.state.params.type;
    let end = moment(Date()).format('YYYY/MM/DD')
    let start = '';
    if (type == 'DAY') {
      start = moment().subtract(1, 'day').format('YYYY/MM/DD');
      end = moment().subtract(1, 'day').format('YYYY/MM/DD');
    } else if (type == 'WEEK') {
      start = moment().subtract(1, 'week').format('YYYY/MM/DD');
      end = moment().subtract(1, 'day').format('YYYY/MM/DD');
    } else if (type == 'MONTH') {
      start = moment().subtract(1, 'month').format('YYYY/MM/DD');
      end = moment().subtract(1, 'day').format('YYYY/MM/DD');
    }

    this.setState({ start: start, end: end }, () => {
      this.loadQuestion();
    });
  }

  loadQuestion = async () => {
    this.setState({ loading: true });
    let previousQuestions = await getPreviousQuestions(this.state.start, this.state.end);
    previousQuestions = previousQuestions.sort((a, b) => new Date(a.triggered_date) - new Date(b.triggered_date));
    this.setState({ loading: false });
    if (previousQuestions.errors) {
      setTimeout(() => Alert.alert(report.errors), 500);
    } else {
      this.setState({ questions: previousQuestions.reverse() });
    }
  }

  render() {
    const {
      state: {
        loading,
        questions,
        type,
      },
      onReload,
    } = this;

    return (
      <View style={{ flex: 1 }}>
        {this.loadSubTitle()}
        <View style={styles.MainContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              type == 'DAY' ?
                questions.length > 0 && <QuestionComponent question={questions[0]} />
                :
                questions.length > 0 && questions.map(question => {
                  return this._renderQuestionItem(question)
                })
            }
          </ScrollView>
          <Loader loading={loading} />
          <NavigationEvents onDidFocus={() => onReload()} />
        </View>
      </View>
    );
  }

  onQuestionPress = (question) => {
    this.props.navigation.navigate('PreviousQuestion', { question: question, subHeading: question.triggered_date })
  }

  _renderQuestionItem = (question) => {
    return (
      <View>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: deviceWidth }}
          onPress={() => this.onQuestionPress(question)}>
          <View>
            <CustomTxt
              fontSize={18}
              numberOfLines={2}
              textColor={DARK_BLUE}
              text={question.question_text}
            />
            <CustomTxt
              fontSize={14}
              textColor={BLACK_ONE}
              text={moment(question.triggered_date).format('MMM DD, YYYY')}
            />
          </View>
        </TouchableOpacity>
        <FlexRow
          height={0.5}
          backgroundColor={'#CCC'}
        />
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
    let title = '';
    const type = this.state.type;
    if (type == 'DAY') {
      if (this.state.questions.length > 0) {
        title = moment(this.state.questions[0].triggered_date).format('MMM DD, YYYY');
        //'Previous Day';
      }
    } else if (type == 'WEEK') {
      title = 'Previous Week';
    } else if (type == 'MONTH') {
      title = 'Previous Month';
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
});