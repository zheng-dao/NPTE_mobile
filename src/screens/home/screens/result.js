import React, { Component } from 'react';
import { Platform, ScrollView, Alert } from 'react-native'
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

import Loader from '../../../components/loader/Loader';
import { isValid } from '../../../common/utility'

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
import IC_BACK from '../../../images/ic_back.png'

export default class Home extends Component {
  constructor(props) {
		super(props)
		this.state = {
      isAnswerSelected: false,
      question: {},
      loading: false,
      user: {},
		}
  }

  componentDidMount(){
    const self = this;
    const {
      props: {
        navigation: {
          state: {
            params: {
              question,
            }
          }
        }
      }
    } = self;
    getUser().then(user => self.setState({ user: user, question: question, }));
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
      return {...option, isSelected: option.is_correct, image: this.getUnselectedImage(index)};
    })
    question.question_options = options;
    return question;
  }

  render() {
    const self = this
    const {
			state: {
        answers,
        isAnswerSelected,
        question,
        loading,
        user,
      },
      props: {
        navigation,
      },
      updateItem,
    } = self;

    console.log('~~~~~ question ~~~~>>>', question);
    return (
      <MainCon 
        backgroundColor={THEME_BLUE_DARK}
        paddingTop={0}>


        <TouchableOpacity 
          style={{ marginTop:10, marginLeft:0, position: 'absolute', padding: 20}}
          onPress={() => navigation.pop()}>
          <Image style={{ height:20, width:20}} source={IC_BACK} />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <PageWidth paddingBottom={50}>
            <AlignCenter marginTop={20} marginBottom={20} marginLeft={20} marginRight={20}>
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

                { isValid(question) && question.question_options.map((item, index) => {
                  return (
                  <AnswerItem
                    key={index}
                    itemName={item.choice}
                    feedback={item.choice}
                    showFeedback={item.isSelected? true:false}
                    feedback={question.feedback}
                    itemImg={item.image}
                    showDivider={index<3 ? true : false}
                    //onItemPress={() => { updateItem(index) }}
                    />
                    )
                }
                )}
              </CardInfoTop>

            </AlignCenter>
          </ViewMargin>
        </ScrollView>

        <Loader loading={loading}  />
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
          if(index == position){
            if(option.is_correct){
              option.image = A_RIGHT;
            }else{
              option.image = A_WRONG;
            }
          }else{
            option.image = option.is_correct ? A_RIGHT : A_UNSELECTED;
          }
        break;
        
        case 1:
          if(index == position){
            if(option.is_correct){
              option.image = B_RIGHT;
            }else{
              option.image = B_WRONG;
            }
          }else{
            option.image = option.is_correct ? B_RIGHT : B_UNSELECTED;
          }
        break;
        
        case 2:
          if(index == position){
            if(option.is_correct){
              option.image = C_RIGHT;
            }else{
              option.image = C_WRONG;
            }
          }else{
            option.image = option.is_correct ? C_RIGHT : C_UNSELECTED;
          }
        break;

        case 3:
          if(index == position){
            if(option.is_correct){
              option.image = D_RIGHT;
            }else{
              option.image = D_WRONG;
            }
          }else{
            option.image = option.is_correct ? D_RIGHT : D_UNSELECTED;
          }
        break;
      }

      options[index] = option;
    });

    options.map((item, key) => {
      if (item.is_correct){
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
