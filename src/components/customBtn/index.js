import React from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'

import CustomTxt from '../customTxt'
import { BtnCon, IconStyle, ImgStyle } from './styles'

export default class CustomBtn extends React.Component {
  constructor(props) {
    super(props)
    this._spinImage = new Animated.Value(0)
  }

  runAnimation = () => {
    Animated.timing(
      this._spinImage,
    {
      toValue: 1,
      useNativeDriver: true,
      duration: 2000,
      easing: Easing.linear
    }
    ).start( () => () => this.runAnimation() )
  }

  stopAnimation = () => {
    Animated.timing(
      this._spinImage,
    {
      toValue: 0,
    }
    ).stop()
  }

  render() {
    const {
      borderColor,
      boxShadow,
      iconPath,
      borderRadius,
      fontFamily,
      imgPath,
      activeOpacity,
      backgroundColor,
      borderWidth,
      btnText,
      marginLeft,
      marginRight,
      marginBottom,
      btnHeight,
      btnWidth,
      textColor,
      fontSize,
      isButtonDisable,
      rotateIcon,
      txtmarginBottom,
      btnPaddingRight,
      btnPaddingLeft,
      paddingTop,
      paddingBottom,
      numberOfLines,
    } = this.props

    if(rotateIcon){
      this.runAnimation()
    }else{
      this.stopAnimation()
    }

    const spin = this._spinImage.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '0deg']
    })


    return (
      <BtnCon
        disabled={isButtonDisable}
        activeOpacity={activeOpacity ? activeOpacity : 0.4}
        onPress={()=>this.props.onPress()}
        btnOpacity= {isButtonDisable ? 0.4 : 1}
        btnShadowColor= {boxShadow ? '#000' : 'transparent'}
        btnMarginLeft= {marginLeft}
        btnMarginRight= {marginRight}
        btnMarginBottom= {marginBottom}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        paddingRight={btnPaddingRight ? btnPaddingRight : 5}
        paddingLeft={btnPaddingLeft ? btnPaddingLeft : 5}
        btnHeightStyle= {btnHeight}
        btnWidthStyle= {btnWidth}
        btnBorderWidth= {borderWidth}
        btnBorderColor= {borderColor ? borderColor : textColor}
        btnBackgroundColor= {backgroundColor}
        btnBorderRadius= {borderRadius ? borderRadius : 34}>
        { iconPath &&
          <IconStyle source={iconPath} />
        }

        { imgPath &&
          <Animated.Image source={imgPath} style={[styles.animatedImage, {tintColor: textColor, transform: [{rotate: spin}] }]} />
        }

        <CustomTxt
          fontSize= {fontSize}
          textColor= {textColor}
          fontFamily= {fontFamily}
          numberOfLines={numberOfLines}
          marginBottom= {txtmarginBottom ? txtmarginBottom : -2}
          text={btnText ? btnText : ''}
        />
      </BtnCon>
    )
  }
}

const styles = StyleSheet.create({
  animatedImage: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginRight: 10,
  }
})