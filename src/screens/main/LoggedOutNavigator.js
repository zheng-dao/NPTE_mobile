import { createStackNavigator } from 'react-navigation'

import LandingNavigator from '../landing'

const LoggedoutNavigator = createStackNavigator({
    LandingNavigator: LandingNavigator,
}, {
    headerMode: 'none',
})

export default createStackNavigator({
    LandingNavigator: LoggedoutNavigator,
}, {
    mode: 'modal',
    headerMode: 'none',
})
