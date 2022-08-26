import React from 'react'
import {
  TextStyle,
} from './styles'

class CustomTxt extends React.Component {
  render() {
    const {
      text,
      marginLeft,
      marginRight,
      marginBottom,
      marginTop,
      paddingTop,
      paddingRight,
      paddingLeft,
      textColor,
      fontSize,
      fontFamily,
      textAlign,
      textWidth,
      textHeight,
      lineHeight,
      textDecorationLine,
      flex,
      numberOfLines,
      position,
      opacity,
      bottom,
      top,
      left,
      fontWeight,
    } = this.props

    return (
      <TextStyle
        txtWidth={textWidth}
        txtHeight={textHeight}
        txtMarginLeft={marginLeft}
        txtMarginRight={marginRight}
        txtMarginBottom={marginBottom}
        txtMarginTop={marginTop}
        txtPaddingTop={paddingTop}
        txtPaddingRight={paddingRight}
        txtPaddingLeft={paddingLeft}
        txtColor={textColor}
        txtFontSize={fontSize}
        txtAllignment={textAlign}
        txtTextDecorationLine={textDecorationLine}
        txtLineHeight={lineHeight}
        txtFlex={flex}
        opacity={opacity}
        txtFontFamily={fontFamily}
        txtPosition={position}
        txtBottom={bottom}
        txtTop={top}
        txtLeft={left}
        allowFontScaling={false}
        fontWeight={fontWeight? fontWeight: 'normal'}
        numberOfLines={numberOfLines ? numberOfLines : 50}>
        {text ? text : ''}
      </TextStyle>
    )
  }
}

export default CustomTxt