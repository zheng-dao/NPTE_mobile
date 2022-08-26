import React, { Component } from 'react';
import { Platform, ScrollView, Alert, Image, StyleSheet, } from 'react-native'
import {
  deviceWidth,
} from '../../../common/utility'
import {
  MainCon,
  CardInfoTop,
  PageWidth,
  AlignCenter,
  ViewMargin,
} from '../../../common/commonStyles'
import {
  DARK_BLUE,
  WHITE,
  THEME_BLUE_DARK,
  AVENIR_BLACK,
} from '../../../common';
import CustomTxt from '../../../components/customTxt';
import CustomBtn from '../../../components/customBtn'
import AnswerItem from '../../../components/answerItem'
import { NavigationEvents } from 'react-navigation';
import Loader from '../../../components/loader/Loader';
import { isValid } from '../../../common/utility'
const PLACEHOLDER_BANNER = require('../images/banner_placeholder.jpg')
//import ProgressiveImage from '../../../common/progressiveImage';
import ImageLoad from 'react-native-image-placeholder'

const dummyText = 'Lorem ipsum dolor sit amet, consectetor adipiscing elit. Integer ac posuere ante. Ut metus ligula?'
//const feedbackText = 'Feedback\nLorem ipsum dolor sit amet, consectetor adipiscing elit. Integer ac posuere ante. Ut metus ligula?'
//const A_UNSELECTED = require('../images/A_unselected.png')
//const A_RIGHT = require('../images/A_right.png')
//const A_WRONG = require('../images/A_wrong.png')

const A_UNSELECTED = require('../images/opt/one_unselected.png')
const A_RIGHT = require('../images/opt/one_right.png')
const A_WRONG = require('../images/opt/one_wrong.png')


const B_UNSELECTED = require('../images/opt/two_unselected.png')
const B_RIGHT = require('../images/opt/two_right.png')
const B_WRONG = require('../images/opt/two_wrong.png')

const C_UNSELECTED = require('../images/opt/three_unselected.png')
const C_RIGHT = require('../images/opt/three_right.png')
const C_WRONG = require('../images/opt/three_wrong.png')

const D_UNSELECTED = require('../images/opt/four_unselected.png')
const D_RIGHT = require('../images/opt/four_right.png')
const D_WRONG = require('../images/opt/four_wrong.png')

import { getQuestion, getUser, submitAnswer, } from '../../../network/api';

export default class MiniQuestionComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAnswerSelected: false,
      question: {},
      loading: false,
      user: {},
      answerSubmitted: false,
      selectedOption: 0,
    }
  }

  componentDidMount() {
    this.onReload();
  }

  onReload = async () => {
    const self = this;
    getUser().then(user => self.setState({ user: user }));
    const question = await self.props.question;
    self.setState({ question: this.loadOptionImages(question) });

  }

  getUnselectedImage = (index) => {
    switch (index) {
      case 0:
        return A_UNSELECTED;
        break;

      case 1:
        return B_UNSELECTED;
        break;

      case 2:
        return C_UNSELECTED;
        break;

      case 3:
        return D_UNSELECTED;
        break;
    }
  }

  loadOptionImages = (question) => {
    const options = question.question_options.map((option, index) => {
      return { ...option, isSelected: option.is_correct, image: this.getUnselectedImage(index) };
    })
    question.question_options = options;
    return question;
  }

  onSubmitAnswer = async () => {
    const {
      state: {
        question,
        isAnswerSelected,
        user,
        selectedOption,
        answerSubmitted
      }
    } = this;

    if (isAnswerSelected) {
      const opt = question.question_options.filter(option => option.is_correct && option)[0];
      const answer = {
        user_id: user.id,
        question_id: question.id,
        category_id: question.category ? question.category.id : 0,
        question_option_id: question.question_options[selectedOption].id,//opt.id,
      };


      this.setState({ loading: true });
      const response = await submitAnswer(answer);
      if (response.is_right) {
        this.props.handleAnswer();
      }
      this.setState({ loading: false });
      if (response.errors) {
        Alert.alert(response.errors);
      } else {
        this.updateItemAfterSubmission(selectedOption);
        this.setState({ isAnswerSelected: false, answerSubmitted: true });
        //this.props.navigation.navigate('QuestionResult', {isCorrect: response.is_right});
      }
    } else {
      if (answerSubmitted) {
        this.props.handleIndex(this.props.index + 1);
      }
    }
  }

  getRightOptionIndex = (question) => {
    let rightOptionIndex = 0;
    question.question_options.map((option, index) => {
      if (option.is_correct) {
        rightOptionIndex = index;
      }
    });
    return rightOptionIndex;
  }

  render() {
    const self = this
    const {
      state: {
        isAnswerSelected,
        question,
        loading,
        user,
        answerSubmitted,
      },
      updateItem,
      onSubmitAnswer,
      onReload,
    } = self;

    return (
      <MainCon
        backgroundColor={THEME_BLUE_DARK}
        paddingTop={0}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PageWidth paddingBottom={50}>
            {
              question.question_image != undefined && question.question_image != null &&
              <AlignCenter
                style={{ backgroundColor: '#000000', marginLeft: -24, width: deviceWidth, height: 200 }}>

                <ImageLoad
                  style={styles.imgBg}
                  isShowActivity={false}
                  placeholderSource={PLACEHOLDER_BANNER}
                  placeholderStyle={styles.imgBg}
                  source={{ uri: question.question_image }}
                  resizeMode='contain'
                />
              </AlignCenter>
            }
            <AlignCenter marginTop={10} marginBottom={20} marginLeft={20} marginRight={20}>
              <CustomTxt
                textColor={WHITE}
                textAlign='center'
                fontSize={18}
                text={question.question_text}
              />
            </AlignCenter>
          </PageWidth>

          <ViewMargin>
            <AlignCenter backgroundColor={WHITE} paddingLeft={20} paddingRight={20}>
              <CardInfoTop
                cardBackgroundColor={WHITE}
                paddingTop={20}
                paddingLeft={20}
                paddingRight={20}
                paddingBottom={20}>

                {isValid(question) && question.question_options.map((item, index) => {
                  return (
                    <AnswerItem
                      key={index}
                      itemName={item.choice}
                      showFeedback={(answerSubmitted) && item.is_correct ? true : false}
                      feedback={question.feedback}
                      itemImg={item.image}
                      showDivider={index < 3 ? true : false}
                      onItemPress={() => !answerSubmitted && updateItem(index)} />
                  )
                }
                )}
              </CardInfoTop>
              {
                <AlignCenter marginTop={-20} marginBottom={20}>
                  <CustomBtn
                    btnHeight={50}
                    btnWidth={deviceWidth <= 320 ? 260 : 300}
                    borderRadius={7}
                    boxShadow={true}
                    isButtonDisable={!isAnswerSelected && !answerSubmitted}
                    backgroundColor={DARK_BLUE}
                    fontFamily={AVENIR_BLACK}
                    btnText={!answerSubmitted ? 'SUBMIT' : 'NEXT'}
                    textColor={WHITE}
                    fontSize={16}
                    onPress={() => onSubmitAnswer()}
                  />
                </AlignCenter>
              }

            </AlignCenter>
          </ViewMargin>
        </ScrollView>
        <NavigationEvents onDidFocus={() => onReload()} />
        <Loader loading={loading} />
      </MainCon>
    );
  }

  updateItem = (position) => {
    let isAnswerSelected = false
    let image = null

    const question = this.state.question;
    const options = question.question_options;

    options.map((option, index) => {
      switch (index) {
        case 0:
          if (index == position) {
            option.image = A_RIGHT;
          } else {
            option.image = A_UNSELECTED;
          }
          break;

        case 1:
          if (index == position) {
            option.image = B_RIGHT;
          } else {
            option.image = B_UNSELECTED;
          }
          break;

        case 2:
          if (index == position) {
            option.image = C_RIGHT;
          } else {
            option.image = C_UNSELECTED;
          }
          break;

        case 3:
          if (index == position) {
            option.image = D_RIGHT;
          } else {
            option.image = D_UNSELECTED;
          }
          break;
      }

      options[index] = option;
    });

    options.map((item, key) => {
      if (item.is_correct) {
        isAnswerSelected = true
      }
    })

    question.question_options = options;

    this.setState({
      question,
      isAnswerSelected,
      selectedOption: position,
    })
  }

  updateItemAfterSubmission = (position) => {
    let isAnswerSelected = false
    let image = null

    const question = this.state.question;
    const options = question.question_options;

    options.map((option, index) => {
      switch (index) {
        case 0:
          if (index == position) {
            if (option.is_correct) {
              option.image = A_RIGHT;
            } else {
              option.image = A_WRONG;
            }
          } else {
            option.image = option.is_correct ? A_RIGHT : A_UNSELECTED;
          }
          break;

        case 1:
          if (index == position) {
            if (option.is_correct) {
              option.image = B_RIGHT;
            } else {
              option.image = B_WRONG;
            }
          } else {
            option.image = option.is_correct ? B_RIGHT : B_UNSELECTED;
          }
          break;

        case 2:
          if (index == position) {
            if (option.is_correct) {
              option.image = C_RIGHT;
            } else {
              option.image = C_WRONG;
            }
          } else {
            option.image = option.is_correct ? C_RIGHT : C_UNSELECTED;
          }
          break;

        case 3:
          if (index == position) {
            if (option.is_correct) {
              option.image = D_RIGHT;
            } else {
              option.image = D_WRONG;
            }
          } else {
            option.image = option.is_correct ? D_RIGHT : D_UNSELECTED;
          }
          break;
      }

      options[index] = option;
    });

    options.map((item, key) => {
      if (item.is_correct) {
        isAnswerSelected = true
      }
    })

    question.question_options = options;

    this.setState({
      question,
      isAnswerSelected
    })
  }

}

const styles = StyleSheet.create({
  imgBg: {
    position: 'absolute',
    top: 0,
    //left: 0,
    height: 220,
    width: deviceWidth,
    zIndex: 2,
    opacity: 1,
    backgroundColor: '#000000'
  },
})