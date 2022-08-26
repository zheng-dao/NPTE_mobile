import styled, {css} from 'styled-components/native'

export const TextStyle = styled.Text`
  ${props => props.txtMarginLeft && css`marginLeft: ${props.txtMarginLeft}`};
  ${props => props.txtMarginRight && css`marginRight: ${props.txtMarginRight}`};
  ${props => props.txtMarginBottom && css`marginBottom: ${props.txtMarginBottom}`};
  ${props => props.txtMarginTop && css`marginTop: ${props.txtMarginTop}`};
  ${props => props.txtPaddingTop && css`paddingTop: ${props.txtPaddingTop}`};
  ${props => props.txtPaddingLeft && css`paddingLeft: ${props.txtPaddingLeft}`};
  ${props => props.txtPaddingRight && css`paddingRight: ${props.txtPaddingRight}`};
  ${props => props.txtPosition && css`position: ${props.txtPosition}`};
  ${props => props.txtBottom && css`bottom: ${props.txtBottom}`};
  ${props => props.txtTop && css`top: ${props.txtTop}`};
  ${props => props.txtLeft && css`left: ${props.txtLeft}`};
  ${props => props.txtColor && css`color: ${props.txtColor}`};
  ${props => props.txtFontSize && css`fontSize: ${props.txtFontSize}`};
  ${props => props.txtFontFamily && css`fontFamily: ${props.txtFontFamily}`};
  ${props => props.txtAllignment && css`textAlign: ${props.txtAllignment}`};
  ${props => props.txtWidth && css`width: ${props.txtWidth}`};
  ${props => props.txtHeight && css`height: ${props.txtHeight}`};
  ${props => props.txtLineHeight && css`lineHeight: ${props.txtLineHeight}`};
  ${props => props.txtFlex && css`flex: ${props.txtFlex}`};
  ${props => props.txtTextDecorationLine && css`textDecorationLine: ${props.txtTextDecorationLine}`};
  ${props => props.opacity && css`opacity: ${props.opacity}`};
  ${props => props.fontWeight && css`fontWeight: ${props.fontWeight}`};
`