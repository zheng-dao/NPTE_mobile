import { createStackNavigator } from 'react-navigation'
import Home from '../../screens/home'
import ResetPassword from '../resetPassword'
import QuestionResult from '../home/screens/result'
import PreviousQuestion from '../home/screens/previousQuestion'


export default  createStackNavigator({
  AppNavigator: Home,
  ResetPassword: ResetPassword,
  QuestionResult: QuestionResult,
  PreviousQuestion: PreviousQuestion,
}, {
    headerMode: 'none',
})