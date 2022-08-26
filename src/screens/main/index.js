import { createSwitchNavigator } from 'react-navigation'
import LoggedOutNavigator from './LoggedOutNavigator'
import AppNavigator from './AppNavigator'
import CheckAuthScreen from './checkAuth'

//CheckAuthScreen
export default createSwitchNavigator({
    CheckAuthScreen: CheckAuthScreen,
    LoggedOutNavigator: LoggedOutNavigator,
    AppNavigator: AppNavigator
  }, {
    initialRouteName: 'CheckAuthScreen',
})