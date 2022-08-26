import { Dimensions, Platform } from 'react-native'

export const HIGH_LIGHT_COLOR = '#296E69'

export const deviceWidth = Dimensions.get('window').width
export const deviceHeight = Dimensions.get('window').height
export const IS_IPHONE_X = deviceHeight == 812 || deviceHeight == 896
export const IS_BIG_SCREEN = (deviceWidth >= 414)
export const IS_IPHONE_5 = (deviceWidth <= 320)
export const IS_ANDROID = (Platform.OS === 'android')

export const isValid = (object) => Object.keys(object).length > 0;