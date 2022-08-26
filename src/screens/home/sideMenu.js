import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import { TouchableOpacity, View, Image, StyleSheet, Linking, AsyncStorage, ScrollView, Alert, DeviceEventEmitter, } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion'
import _ from 'lodash'
import {
  MainCon,
  FlexRow,
  ItemImgCon,
  TouchableAlignCenter,
  FlexRowAndCenter,
  AlignCenter,
} from '../../common/commonStyles'
import {
  WHITE,
  THEME_BLUE_LIGHT,
  BLACK_FOURTEEN,
} from '../../common';
import commonStyle from '../../common/styles'
import CustomTxt from '../../components/customTxt';
import LOGO from '../../images/logo.png'

const userImageRound = require('./images/user_round_img.png')
const IC_TODAY = require('./images/ic_today.png')
const IC_ANALYZE = require('./images/ic_analyse.png')
const IC_PRIVACY = require('./images/ic_privacy.png')
const IC_LOGOUT = require('./images/ic_logout.png')
const IC_ABOUT = require('./images/ic_about.png')
const IC_ENROLL = require('./images/ic_enroll.png')
const IC_COURSE = require('./images/ic_course.png')
const IC_MONTH = require('./images/ic_month.png')
const IC_OVERALL = require('./images/ic_combine.png')//ic_overall.png
const IC_SYSTEM = require('./images/ic_system.png')


const IC_PRE_DAY = require('./images/ic_previous_day.png')
const IC_PRE_WEEK = require('./images/ic_previous_week.png')
const IC_PRE_MONTH = require('./images/ic_previous_month.png')

const IC_FB = require('./images/facebook_ic.png')
const IC_TW = require('./images/twitter_ic.png')
const IC_INSTA = require('./images/instagram_ic.png')
const IC_YT = require('./images/youtube_ic.png')
const IC_TT = require('./images/tiktok_ic.png')
const IC_PREVIOUS = require('./images/ic_previous.png')

const ENROLL = 'https://npteff.com/';
const COURSE_LOGIN = 'https://npteff.com/login/';
const QUIZLET = 'https://quizlet.com/join/sq8WRFJuz';
const POLICY = 'https://npteff.com/privacy/';
const ABOUT = 'https://npteff.com/about/';
const YT = 'https://www.youtube.com/c/nptefinalfrontier/videos';
const FB = 'https://www.facebook.com/groups/1188295237854304';
const INSTA = 'https://www.instagram.com/npteff/';
const TW = 'https://twitter.com/npteff';
const TT = 'https://www.tiktok.com/@npteff';

const SECTIONS = [
  {
    title: 'Score Report'
  },
]

const PREVIOUS = [
  {
    title: 'Previous Questions'
  },
]

import { getUser } from '../../network/api'

class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      collapsed: true,
      previousCollapsed: true
    }
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user })

    this.eventListener = DeviceEventEmitter.addListener('profileUpdated', this.profileUpdated);

  }

  profileUpdated = async (event) => {
    const user = await getUser();
    this.setState({ user })
    console.log('**** profileUpdated ****>', event, user);
  }

  componentWillUnmount() {
    this.eventListener.remove();
  }

  render() {
    console.log('~~~~ render ~~~~>', this.state.user);
    const {
      state: {
        user,
      },
      _renderAccordionHeader,
      _renderAccordionChilds,
      _renderPreviousHeader,
      _renderPreviousChilds,
    } = this;

    return (
      <MainCon backgroundColor={THEME_BLUE_LIGHT}>
        <ScrollView>
          <TouchableAlignCenter
            // onPress={this.navigateToScreen('PROFILE')}
            marginTop={40} marginBottom={30}>
            <ItemImgCon height={80} width={80} borderColor={BLACK_FOURTEEN}>
              <Image
                source={LOGO}
                style={styles.profileImage}
              />
            </ItemImgCon>
            {/* <CustomTxt
            marginTop={15}
            fontSize={18}
            textColor={WHITE}
            marginBottom={3}
            numberOfLines={3}
            text={`${user && user.first_name} ${user && user.last_name}`}
          /> */}
          </TouchableAlignCenter>

          <FlexRow
            height={0.5}
            backgroundColor={WHITE}
          />

          {this.renderDrawerItem(`Today's Question`, IC_TODAY, this.navigateToScreen('HOME'))}
          {this.renderDrawerItem(`Mini Quiz`, IC_PRE_DAY, () => this.onChildClick('MINI_QUIZ'))}

          <Accordion
            collapsed={this.state.previousCollapsed}
            underlayColor='transparent'
            sections={[PREVIOUS[0]]}
            renderHeader={_renderPreviousHeader.bind(this)}
            renderContent={_renderPreviousChilds.bind(this)}
            initiallyActiveSection={0}
          />

          <Accordion
            collapsed={this.state.collapsed}
            underlayColor='transparent'
            sections={[SECTIONS[0]]}
            renderHeader={_renderAccordionHeader.bind(this)}
            renderContent={_renderAccordionChilds.bind(this)}
            initiallyActiveSection={0}
          />
          {this.renderDrawerItem('Enroll', IC_ENROLL, () => this.openUrl(ENROLL))}
          {this.renderDrawerItem('Course Login', IC_COURSE, () => this.openUrl(COURSE_LOGIN))}
          {this.renderDrawerItem('Privacy Policy', IC_PRIVACY, () => this.openUrl(POLICY))}
          {this.renderDrawerItem('About NPTE', IC_ABOUT, () => this.openUrl(ABOUT))}
          {this.renderDrawerItem('Logout', IC_LOGOUT, () => this.onLogout())}
          {this._renderSocialLinks()}


        </ScrollView>
      </MainCon>
    );
  }

  _renderSocialLinks = () => {
    return (
      <AlignCenter marginTop={20} marginBottom={50} >
        <FlexRow>
          <FlexRowAndCenter paddingLeft={10} paddingRight={4}>
            <TouchableOpacity onPress={() => this.openUrl(YT)}>
              <Image
                source={IC_YT}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </FlexRowAndCenter>
          <FlexRowAndCenter paddingLeft={4} paddingRight={4}>
            <TouchableOpacity onPress={() => this.openUrl(FB)}>
              <Image
                source={IC_FB}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </FlexRowAndCenter>

          <FlexRowAndCenter paddingLeft={4} paddingRight={4}>
            <TouchableOpacity onPress={() => this.openUrl(TW)}>
              <Image
                source={IC_TW}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </FlexRowAndCenter>

          <FlexRowAndCenter paddingLeft={4} paddingRight={4}>
            <TouchableOpacity onPress={() => this.openUrl(INSTA)}>
              <Image
                source={IC_INSTA}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </FlexRowAndCenter>
          <FlexRowAndCenter paddingLeft={4} paddingRight={10}>
            <TouchableOpacity onPress={() => this.openUrl(TT)}>
              <Image
                source={IC_TT}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </FlexRowAndCenter>
        </FlexRow>
      </AlignCenter>
    );
  }

  _renderAccordionHeader(content) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onHeaderClick()}>
          <FlexRowAndCenter paddingLeft={20}>
            <Image
              source={IC_ANALYZE}
              style={{ width: 20, height: 20 }}
            />
            <View style={styles.navItemStyle}>
              <CustomTxt
                fontSize={14}
                textColor={WHITE}
                text={content.title}
              />
            </View>
          </FlexRowAndCenter>
        </TouchableOpacity>
        <FlexRow
          height={0.5}
          backgroundColor={WHITE}
        />

      </View>
    )
  }

  _renderAccordionChilds = (section) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.navItemStyle}
          onPress={() => this.onChildClick('STATS')}>
          <FlexRowAndCenter paddingLeft={40}>
            <Image
              source={IC_OVERALL}
              style={styles.navItemImage}
            />
            <CustomTxt
              fontSize={14}
              textColor={WHITE}
              text={"Combined"}
            />
          </FlexRowAndCenter>
        </TouchableOpacity>
        <FlexRow
          height={0.5}
          backgroundColor={WHITE}
        />

        <TouchableOpacity
          style={styles.navItemStyle}
          onPress={() => this.onChildClick('STATS_BY_SYSTEM')}>
          <FlexRowAndCenter paddingLeft={40}>
            <Image
              source={IC_SYSTEM}
              style={styles.navItemImage}
            />
            <CustomTxt
              fontSize={14}
              textColor={WHITE}
              text={"By System"}
            />
          </FlexRowAndCenter>
        </TouchableOpacity>
        <FlexRow
          height={0.5}
          backgroundColor={WHITE}
        />

        <TouchableOpacity
          style={styles.navItemStyle}
          onPress={() => this.onChildClick('STATS_BY_MONTH')}>
          <FlexRowAndCenter paddingLeft={40}>
            <Image
              source={IC_MONTH}
              style={styles.navItemImage}
            />
            <CustomTxt
              fontSize={14}
              textColor={WHITE}
              text={"Month"}
            />
          </FlexRowAndCenter>
        </TouchableOpacity>
        <FlexRow
          height={0.5}
          backgroundColor={WHITE}
        />

      </View>
    )
  }

  /********* 
  Previous 
  *********/

  _renderPreviousHeader(content) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onPreviousHeaderClick()}>
          <FlexRowAndCenter paddingLeft={20}>
            <Image
              source={IC_PREVIOUS}
              style={{ width: 20, height: 20 }}
            />
            <View style={styles.navItemStyle}>
              <CustomTxt
                fontSize={14}
                textColor={WHITE}
                text={content.title}
              />
            </View>
          </FlexRowAndCenter>
        </TouchableOpacity>
        <FlexRow
          height={0.5}
          backgroundColor={WHITE}
        />

      </View>
    )
  }

  _renderPreviousChilds = (section) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.navItemStyle}
          onPress={() => this.onPreviousChildClick('DAY')}>
          <FlexRowAndCenter paddingLeft={40}>
            <Image
              source={IC_PRE_DAY}
              style={styles.navItemImage}
            />
            <CustomTxt
              fontSize={14}
              textColor={WHITE}
              text={"Previous Day"}
            />
          </FlexRowAndCenter>
        </TouchableOpacity>
        <FlexRow
          height={0.5}
          backgroundColor={WHITE}
        />

        <TouchableOpacity
          style={styles.navItemStyle}
          onPress={() => this.onPreviousChildClick('WEEK')}>
          <FlexRowAndCenter paddingLeft={40}>
            <Image
              source={IC_PRE_WEEK}
              style={styles.navItemImage}
            />
            <CustomTxt
              fontSize={14}
              textColor={WHITE}
              text={"Previous Week"}
            />
          </FlexRowAndCenter>
        </TouchableOpacity>
        <FlexRow
          height={0.5}
          backgroundColor={WHITE}
        />

        <TouchableOpacity
          style={styles.navItemStyle}
          onPress={() => this.onPreviousChildClick('MONTH')}>
          <FlexRowAndCenter paddingLeft={40}>
            <Image
              source={IC_PRE_MONTH}
              style={styles.navItemImage}
            />
            <CustomTxt
              fontSize={14}
              textColor={WHITE}
              text={"Previous Month"}
            />
          </FlexRowAndCenter>
        </TouchableOpacity>
        <FlexRow
          height={0.5}
          backgroundColor={WHITE}
        />

      </View>
    )
  }

  onHeaderClick = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  onPreviousHeaderClick = () => {
    this.setState({ previousCollapsed: !this.state.previousCollapsed })
  }

  onChildClick = (route) => {
    this.props.navigation.navigate(route)
  }

  onPreviousChildClick = (route) => {
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate('PREVIOUS', { type: route })
  }

  onLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', onPress: () => { } },
        {
          text: 'Logout', onPress: async () => {
            await AsyncStorage.removeItem('token');
            this.props.navigation.navigate('LandingNavigator');
          }
        },
      ],
      { cancelable: false },
    )
  }

  openUrl = (url) => {
    Linking.openURL(url);
  }

  renderDrawerItem = (name, image, onPress) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.navItemStyle}
          onPress={() => onPress()}>
          <FlexRowAndCenter>
            <Image
              source={image}
              style={styles.navItemImage}
            />
            <CustomTxt
              fontSize={14}
              textColor={WHITE}
              text={name}
            />
          </FlexRowAndCenter>
        </TouchableOpacity>
        <FlexRow
          height={0.5}
          backgroundColor={WHITE}
        />
      </View>
    )
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
}

const styles = StyleSheet.create({
  navItemStyle: {
    paddingLeft: 20,
    height: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  navItemImage: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  socialIcon: {
    width: 50,
    height: 50,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  }
});

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;