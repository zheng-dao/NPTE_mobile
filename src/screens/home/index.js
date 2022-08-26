import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import SideMenu from './sideMenu'
import StackNav from './stacknav';

const drawernav = DrawerNavigator({
  Item1: {
      screen: StackNav,
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 100,
});

export default drawernav;