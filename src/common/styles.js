import {
  StyleSheet,
} from 'react-native'

import {
  BLACK,
  THEME_BLUE_DARK,
  WHITE
} from '.';

module.exports = StyleSheet.create({
  textFieldStyle: {
    backgroundColor: 'transparent',
    // borderStyle: 'solid',
    // borderBottomWidth: 1,
    borderColor: BLACK,
    color: BLACK,
    fontSize: 16,
    marginTop: 0,
    // marginBottom: 15,
    marginLeft: 5,
    height: 40,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
  },
  profileTextFieldStyle: {
    backgroundColor: 'transparent',
    color: THEME_BLUE_DARK,
    fontSize: 16,
    marginTop: 0,
    height: 40,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
  },
  textFieldIconStyle: {
    height: 20,
    width: 20,
    marginLeft: 25,
    resizeMode: 'contain',
    // marginBottom:10
  },
  phoneInputContainerStyle: {
    borderColor: BLACK,
    fontSize: 16,
    alignItems: 'baseline'
  },

  phoneTextContainerStyle: {
    backgroundColor: 'transparent',
    color: BLACK,
  },

  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    marginHorizontal: 4
  },
  focusCell: {
    borderColor: '#000',
  },
})