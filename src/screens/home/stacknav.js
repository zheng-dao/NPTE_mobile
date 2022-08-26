import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {
  WHITE,
  THEME_BLUE_LIGHT
} from '../../common';
import { StackNavigator } from 'react-navigation';
import HomeScreen from "./screens/home";
import MiniQuizScreen from "./screens/miniQuiz";
import MiniQuizDetailScreen from "./screens/miniQuizDetail";
import QuestionsScreen from "./screens/questions";
import StatsScreen from "./screens/stats";
import ProfileScreen from "./screens/profile";
import StatsByMonthScreen from "./screens/statsByMonth";
import StatsBySystemScreen from "./screens/statsBySystem";
import PreviousScreen from "./screens/previous";
import { deviceWidth } from '../../common/utility';

const menuIcon = require('./images/drawer.png')

const stackNav = StackNavigator({
  HOME: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Daily Question",
      headerStyle: styles.header,
      //titleStyle: styles.headerTitle,
      headerTitleStyle: styles.headerTitle,
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}>
          <Image
            source={menuIcon}
            style={styles.headerImg}
          />
        </TouchableOpacity>
      )
    })
  },
  MINI_QUIZ: {
    screen: MiniQuizScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Mini Question",
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}>
          <Image
            source={menuIcon}
            style={styles.headerImg}
          />
        </TouchableOpacity>
      )
    })
  },
  MINI_QUIZ_DETAIL: {
    screen: MiniQuizDetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Mini Quiz",
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}>
          <Image
            source={menuIcon}
            style={styles.headerImg}
          />
        </TouchableOpacity>
      )
    })
  },
  QUESTION: {
    screen: QuestionsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Questions Screen",
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}>
          <Image
            source={menuIcon}
            style={styles.headerImg}
          />
        </TouchableOpacity>
      )
    })
  },
  STATS: {
    screen: StatsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Score Report",
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}>
          <Image
            source={menuIcon}
            style={styles.headerImg}
          />
        </TouchableOpacity>
      )
    })
  },
  STATS_BY_MONTH: {
    screen: StatsByMonthScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Score Report",
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}>
          <Image
            source={menuIcon}
            style={styles.headerImg}
          />
        </TouchableOpacity>
      )
    })
  },
  STATS_BY_SYSTEM: {
    screen: StatsBySystemScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Score Report",
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}>
          <Image
            source={menuIcon}
            style={styles.headerImg}
          />
        </TouchableOpacity>
      )
    })
  },
  PROFILE: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: "My Profile",
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}>
          <Image
            source={menuIcon}
            style={styles.headerImg}
          />
        </TouchableOpacity>
      )
    })
  },
  PREVIOUS: {
    screen: PreviousScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Previous Questions",
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}>
          <Image
            source={menuIcon}
            style={styles.headerImg}
          />
        </TouchableOpacity>
      )
    })
  },



  //PreviousScreen
},
  {
    headerLayoutPreset: 'center'
  });

const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME_BLUE_LIGHT,
  },
  headerTitle: {
    color: WHITE,
    textAlign: 'center',
    width: deviceWidth,
    marginRight: 0,
    alignSelf: 'center',

    //position: 'absolute',
    //left: Dimensions.get('window').width/2,
    //top: 27
    //alignSelf: 'center',
    //justifyContent: 'center',
  },
  headerImg: {
    width: 20,
    height: 20,
    marginLeft: 15
  }
});

export default stackNav;