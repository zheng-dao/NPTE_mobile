import { createStackNavigator } from 'react-navigation'

import Landing from './landing'
import Login from '../login/login'
import Signup from '../signup/signup'
import ForgotPassword from '../forgotPassword/forgotPassword'
import VerificationCheck from '../verificationCheck'

const LandingNavigator = createStackNavigator({
    LoginScreen: { screen: Login },
    SignupScreen: { screen: Signup },
    ForgotPasswordScreen: { screen: ForgotPassword },
    LandingScreen: { screen: Landing },
    VerificationCheckScreen: { screen: VerificationCheck}
}, {
    headerMode: 'none',
})

export default createStackNavigator({
    LandingNavigator: LandingNavigator,
}, {
    mode: 'modal',
    headerMode: 'none',
})