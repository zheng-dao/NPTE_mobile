import styled, {css} from 'styled-components/native'

export const BtnCon = styled.TouchableOpacity`
  ${props => props.btnOpacity && css`opacity: ${props.btnOpacity}`};
  ${props => props.btnShadowColor && css`shadowColor: ${props.btnShadowColor}`};
  ${props => props.btnMarginLeft && css`marginLeft: ${props.btnMarginLeft}`};
  ${props => props.btnMarginRight && css`marginRight: ${props.btnMarginRight}`};
  ${props => props.paddingLeft && css`paddingLeft: ${props.paddingLeft}`};
  ${props => props.paddingRight && css`paddingRight: ${props.paddingRight}`};
  ${props => props.paddingTop && css`paddingTop: ${props.paddingTop}`};
  ${props => props.paddingBottom && css`paddingBottom: ${props.paddingBottom}`};
  ${props => props.btnMarginBottom && css`marginBottom: ${props.btnMarginBottom}`};
  ${props => props.btnHeightStyle && css`height: ${props.btnHeightStyle}`};
  ${props => props.btnWidthStyle && css`width: ${props.btnWidthStyle}`};
  ${props => props.btnBorderWidth && css`borderWidth: ${props.btnBorderWidth}`};
  ${props => props.btnBorderColor && css`borderColor: ${props.btnBorderColor}`};
  ${props => props.btnBackgroundColor && css`backgroundColor: ${props.btnBackgroundColor}`};
  ${props => props.btnBorderRadius && css`borderRadius: ${props.btnBorderRadius}`};
  alignItems: center;
  justifyContent: center;
  flexDirection: row;
  position: relative;
  shadowOpacity: 0.2;
  shadowRadius: 15;
  shadowOffset: {width: 0, height: 10};
`

export const IconStyle = styled.Image`
  height: 24;
  width: 24;
  resizeMode: contain;
  position: absolute;
  left: 14;
`

export const ImgStyle = styled.Image`
  height: 18;
  width: 18;
  resizeMode: contain;
  marginRight: 10;
`