import styled, {css} from 'styled-components/native'
import { deviceWidth, IS_IPHONE_X } from './utility'
import { WHITE, BLACK, BLACK_FOURTEEN, THEME_BLUE_DARK, THEME_BLUE_LIGHT } from '.';

export const ViewPadding = styled.View`
  ${props => props.paddingTop && css`paddingTop: ${props.paddingTop}`};
  ${props => props.paddingBottom && css`paddingBottom: ${props.paddingBottom}`};
  ${props => props.paddingRight && css`paddingRight: ${props.paddingRight}`};
  ${props => props.paddingLeft && css`paddingLeft: ${props.paddingLeft}`};
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor}`};
  ${props => props.borderTopLeftRadius && css`borderTopLeftRadius: ${props.borderTopLeftRadius}`};
  ${props => props.borderBottomLeftRadius && css`borderBottomLeftRadius: ${props.borderBottomLeftRadius}`};
  ${props => props.borderRadius && css`borderRadius: ${props.borderRadius}`};
  ${props => props.borderWidth && css`borderWidth: ${props.borderWidth}`};
  ${props => props.borderColor && css`borderColor: ${props.borderColor}`};
  ${props => props.justifyContent && css`justifyContent: ${props.justifyContent}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
`

export const TouchableOpacityPadding = styled.TouchableOpacity`
  ${props => props.paddingTop && css`paddingTop: ${props.paddingTop}`};
  ${props => props.paddingBottom && css`paddingBottom: ${props.paddingBottom}`};
  ${props => props.paddingRight && css`paddingRight: ${props.paddingRight}`};
  ${props => props.paddingLeft && css`paddingLeft: ${props.paddingLeft}`};
  ${props => props.borderTopLeftRadius && css`borderTopLeftRadius: ${props.borderTopLeftRadius}`};
  ${props => props.borderBottomLeftRadius && css`borderBottomLeftRadius: ${props.borderBottomLeftRadius}`};
  ${props => props.borderRadius && css`borderRadius: ${props.borderRadius}`};
  ${props => props.borderWidth && css`borderWidth: ${props.borderWidth}`};
  ${props => props.borderColor && css`borderColor: ${props.borderColor}`};
  ${props => props.justifyContent && css`justifyContent: ${props.justifyContent}`};
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
`

export const CircledView = styled.View`
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.width && css`width: ${props.width}`};
  ${props => props.borderRadius && css`borderRadius: ${props.borderRadius}`};
  ${props => props.borderWidth && css`borderWidth: ${props.borderWidth}`};
  ${props => props.borderColor && css`borderColor: ${props.borderColor}`};
  ${props => props.overflow && css`overflow: ${props.overflow}`};
  ${props => props.marginRight && css`marginRight: ${props.marginRight}`};
  ${props => props.paddingLeft && css`paddingLeft: ${props.paddingLeft}`};
  ${props => props.paddingRight && css`paddingRight: ${props.paddingRight}`};
  ${props => props.padding && css`padding: ${props.padding}`};
  ${props => props.position && css`position: ${props.position}`};
  ${props => props.left && css`left: ${props.left}`};
  ${props => props.top && css`top: ${props.top}`};
  backgroundColor: ${props => props.backgroundColor ? props.backgroundColor : '#FFFFFF'};
  alignItems: center;
  justifyContent: center;
`

export const CircledViewShadow = styled.View`
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.width && css`width: ${props.width}`};
  ${props => props.borderRadius && css`borderRadius: ${props.borderRadius}`};
  ${props => props.borderWidth && css`borderWidth: ${props.borderWidth}`};
  ${props => props.borderColor && css`borderColor: ${props.borderColor}`};
  ${props => props.overflow && css`overflow: ${props.overflow}`};
  ${props => props.marginRight && css`marginRight: ${props.marginRight}`};
  ${props => props.paddingLeft && css`paddingLeft: ${props.paddingLeft}`};
  ${props => props.paddingRight && css`paddingRight: ${props.paddingRight}`};
  ${props => props.padding && css`padding: ${props.padding}`};
  ${props => props.position && css`position: ${props.position}`};
  ${props => props.left && css`left: ${props.left}`};
  ${props => props.top && css`top: ${props.top}`};
  backgroundColor: ${props => props.backgroundColor ? props.backgroundColor : '#FFFFFF'};
  alignItems: center;
  justifyContent: center;
  shadowColor: ${BLACK};
  shadowOpacity: 0.2;
  shadowRadius: 15;
  shadowOffset: {width: 0, height: 10};
`

export const LineView = styled.View`
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.width && css`width: ${props.width}`};
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor}`};
  ${props => props.position && css`position: ${props.position}`};
  left: ${props => props.left ? props.left : '50%'};
  top: ${props => props.top ? props.top : 0};
`

export const ViewMargin = styled.View`
  ${props => props.marginTop && css`marginTop: ${props.marginTop}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.marginRight && css`marginRight: ${props.marginRight}`};
  ${props => props.marginLeft && css`marginLeft: ${props.marginLeft}`};
`

export const TouchableOpacityMargin = styled.TouchableOpacity`
  ${props => props.marginTop && css`marginTop: ${props.marginTop}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.marginRight && css`marginRight: ${props.marginRight}`};
  ${props => props.marginLeft && css`marginLeft: ${props.marginLeft}`};
`

export const ScrollViewMargin = styled.ScrollView`
  ${props => props.marginTop && css`marginTop: ${props.marginTop}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.marginRight && css`marginRight: ${props.marginRight}`};
  ${props => props.marginLeft && css`marginLeft: ${props.marginLeft}`};
`

export const BorderTop = styled.View`
  borderTopWidth: 1;
  ${props => props.borderColor && css`borderTopColor: ${props.borderColor}`};
`

export const FlexOne = styled.View`
  flex: 1;
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor}`};
  ${props => props.borderColor && css`borderColor: ${props.borderColor}`};
  ${props => props.borderRightWidth && css`borderRightWidth: ${props.borderRightWidth}`};
  ${props => props.overflow && css`overflow: ${props.overflow}`};
  ${props => props.marginLeft && css`marginLeft: ${props.marginLeft}`};
  ${props => props.marginRight && css`marginRight: ${props.marginRight}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.alignItems && css`alignItems: ${props.alignItems}`};
`

export const FlexOneTouchable = styled.TouchableOpacity`
  flex: 1;
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor}`};
  ${props => props.borderColor && css`borderColor: ${props.borderColor}`};
  ${props => props.borderRightWidth && css`borderRightWidth: ${props.borderRightWidth}`};
  ${props => props.overflow && css`overflow: ${props.overflow}`};
  ${props => props.marginLeft && css`marginLeft: ${props.marginLeft}`};
  ${props => props.marginRight && css`marginRight: ${props.marginRight}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.alignItems && css`alignItems: ${props.alignItems}`};
`

export const AlignCenter = styled.View`
  alignItems: center;
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.width && css`width: ${props.width}`};
  ${props => props.justifyContent && css`justifyContent: ${props.justifyContent}`};
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor}`};
  ${props => props.paddingTop && css`paddingTop: ${props.paddingTop}`};
  ${props => props.paddingBottom && css`paddingBottom: ${props.paddingBottom}`};
  ${props => props.paddingLeft && css`paddingLeft: ${props.paddingLeft}`};
  ${props => props.paddingRight && css`paddingRight: ${props.paddingRight}`};
  ${props => props.marginTop && css`marginTop: ${props.marginTop}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.marginLeft && css`marginLeft: ${props.marginLeft}`};
  ${props => props.marginRight && css`marginRight: ${props.marginRight}`};
  ${props => props.position && css`position: ${props.position}`};
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor}`};
`

export const TouchableAlignCenter = styled.TouchableOpacity`
  alignItems: center;
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.width && css`width: ${props.width}`};
  ${props => props.justifyContent && css`justifyContent: ${props.justifyContent}`};
  ${props => props.paddingTop && css`paddingTop: ${props.paddingTop}`};
  ${props => props.paddingBottom && css`paddingBottom: ${props.paddingBottom}`};
  ${props => props.marginTop && css`marginTop: ${props.marginTop}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.flex && css`flex: ${props.flex}`};
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor}`};
  ${props => props.position && css`position: ${props.position}`};
  ${props => props.borderRightWidth && css`borderRightWidth: ${props.borderRightWidth}`};
  ${props => props.borderRightColor && css`borderRightColor: ${props.borderRightColor}`};
`

export const FlexRow = styled.View`
  flexDirection: row;
  ${props => props.width && css`width: ${props.width}`};
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.alignItems && css`alignItems: ${props.alignItems}`};
  ${props => props.justifyContent && css`justifyContent: ${props.justifyContent}`};
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor}`};
  ${props => props.borderRadius && css`borderRadius: ${props.borderRadius}`};
  ${props => props.paddingRight && css`paddingRight: ${props.paddingRight}`};
  ${props => props.paddingLeft && css`paddingLeft: ${props.paddingLeft}`};
  ${props => props.paddingVertical && css`paddingVertical: ${props.paddingVertical}`};
  ${props => props.paddingHorizontal && css`paddingHorizontal: ${props.paddingHorizontal}`};
  ${props => props.marginTop && css`marginTop: ${props.marginTop}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.marginLeft && css`marginLeft: ${props.marginLeft}`};
  ${props => props.marginRight && css`marginRight: ${props.marginRight}`};
  ${props => props.flexWrap && css`flexWrap: ${props.flexWrap}`};
  ${props => props.position && css`position: ${props.position}`};
`

export const FlexRowTouchable = styled.TouchableOpacity`
  flexDirection: row;
  ${props => props.alignItems && css`alignItems: ${props.alignItems}`};
  ${props => props.marginTop && css`marginTop: ${props.marginTop}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.marginLeft && css`marginLeft: ${props.marginLeft}`};
`

export const FlexRowAndCenter = styled.View`
  flexDirection: row;
  alignItems: center;
  ${props => props.justifyContent && css`justifyContent: ${props.justifyContent}`};
  ${props => props.marginTop && css`marginTop: ${props.marginTop}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.marginLeft && css`marginLeft: ${props.marginLeft}`};
  ${props => props.marginRight && css`marginRight: ${props.marginRight}`};
  ${props => props.paddingBottom && css`paddingBottom: ${props.paddingBottom}`};
  ${props => props.paddingRight && css`paddingRight: ${props.paddingRight}`};
  ${props => props.position && css`position: ${props.position}`};
  ${props => props.zIndex && css`zIndex: ${props.zIndex}`};
  ${props => props.flex && css`flex: ${props.flex}`};
  ${props => props.width && css`width: ${props.width}`};
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor}`};
  ${props => props.borderRadius && css`borderRadius: ${props.borderRadius}`};
  ${props => props.paddingVertical && css`paddingVertical: ${props.paddingVertical}`};
  ${props => props.paddingHorizontal && css`paddingHorizontal: ${props.paddingHorizontal}`};
`

export const TouchableFlexRowAndCenter = styled.TouchableOpacity`
  flexDirection: row;
  alignItems: center;
  ${props => props.borderBottomWidth && css`borderBottomWidth: ${props.borderBottomWidth}`};
  ${props => props.borderColor && css`borderColor: ${props.borderColor}`};
  ${props => props.justifyContent && css`justifyContent: ${props.justifyContent}`};
  ${props => props.marginTop && css`marginTop: ${props.marginTop}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.paddingBottom && css`paddingBottom: ${props.paddingBottom}`};
  ${props => props.position && css`position: ${props.position}`};
  ${props => props.zIndex && css`zIndex: ${props.zIndex}`};
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor}`};
  ${props => props.borderRadius && css`borderRadius: ${props.borderRadius}`};
  ${props => props.paddingVertical && css`paddingVertical: ${props.paddingVertical}`};
  ${props => props.paddingHorizontal && css`paddingHorizontal: ${props.paddingHorizontal}`};
`

export const MarginLeftAuto = styled.View`
	marginLeft: auto;
`

export const MainHeaderStyle = styled.View`
  paddingLeft: 24;
  paddingRight: 24;
  paddingTop: ${IS_IPHONE_X ? 47 : 27};
  backgroundColor: transparent;
  position: absolute;
  width: ${deviceWidth};
  zIndex: 3;
  top: 0;
`

export const MainCon = styled.View`
	flex: 1;
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor}`};
  ${props => props.opacity && css`opacity: ${props.opacity}`};
  ${props => props.position && css`position: ${props.position}`};
  ${props => props.zIndex && css`zIndex: ${props.zIndex}`};
  ${props => props.paddingTop && css`paddingTop: ${props.paddingTop}`};
`

export const MainImgBg = styled.Image`
  ${props => props.tintColor && css`tintColor: ${props.tintColor}`};
  ${props => props.zIndex && css`zIndex: ${props.zIndex}`};
	position: absolute;
	top: 0;
	width: ${deviceWidth};
`

export const PageWidth = styled.View`
  ${props => props.paddingTop && css`paddingTop: ${props.paddingTop}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.paddingBottom && css`paddingBottom: ${props.paddingBottom}`};
	paddingLeft: ${props => props.paddingLeft ? props.paddingLeft : 24};
	paddingRight: ${props => props.paddingRight ? props.paddingRight : 24};
`

export const CardInfoTop = styled.View`
  ${props => props.cardHeight && css`height: ${props.cardHeight}`};
  ${props => props.cardBackgroundColor && css`backgroundColor: ${props.cardBackgroundColor}`};
  ${props => props.paddingTop && css`paddingTop: ${props.paddingTop}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.paddingLeft && css`paddingLeft: ${props.paddingLeft}`};
  ${props => props.paddingRight && css`paddingRight: ${props.paddingRight}`};
  top:-50;
  width:100%;
  shadowColor: ${props => props.shadowColor ? props.shadowColor : '#000'};
  borderColor: ${THEME_BLUE_DARK};
  borderWidth: 0.3;
  shadowOpacity: 0.1;
  shadowRadius: 15;
  zIndex: 3;
  borderRadius: 9;
`

export const CardMainView = styled.TouchableOpacity`
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.width && css`width: ${props.width}`};
  borderRadius: 9;
  marginRight: 10;
  marginLeft: 10;
  backgroundColor: ${BLACK};
  marginTop: 10;
  marginBottom: 20;
  position: relative;
  paddingTop: 10;
  shadowColor: ${props => props.shadowColor ? props.shadowColor : '#000'};
  shadowOpacity: 0.1;
  shadowRadius: 15;
`

export const CustomImageCon = styled.View`
  ${props => props.justifyContent && css`justifyContent: ${props.justifyContent}`};
  ${props => props.alignItems && css`alignItems: ${props.alignItems}`};
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.width && css`width: ${props.width}`};
  ${props => props.borderRadius && css`borderRadius: ${props.borderRadius}`};
  ${props => props.marginRight && css`marginRight: ${props.marginRight}`};
  overflow: hidden;
`

export const CustomImage = styled.Image`
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.width && css`width: ${props.width}`};
  ${props => props.opacity && css`opacity: ${props.opacity}`};
  ${props => props.borderRadius && css`borderRadius: ${props.borderRadius}`};
  ${props => props.marginTop && css`marginTop: ${props.marginTop}`};
  ${props => props.top && css`top: ${props.top}`};
  ${props => props.marginBottom && css`marginBottom: ${props.marginBottom}`};
  ${props => props.marginRight && css`marginRight: ${props.marginRight}`};
  ${props => props.position && css`position: ${props.position}`};
  ${props => props.tintColor && css`tintColor: ${props.tintColor}`};
  resizeMode: ${props => props.resizeMode ? props.resizeMode : 'contain'};
  zIndex: 2;
`

export const AnswerItemCon = styled.View`
  flexDirection: row;
  alignItems: center;
  backgroundColor: ${WHITE};
  height: 100;
  paddingVertical: 16;
  paddingHorizontal: 19;
  borderRadius: 12;
  shadowColor: #000000;
  shadowOpacity: 0.5;
  shadowRadius: 15;
  shadowOffset: {width: 0; height: 0};
  marginBottom: 30;
`

export const ItemImgCon = styled.View`
  ${props => props.height && css`height: ${props.height}`};
  ${props => props.width && css`width: ${props.width}`};
  ${props => props.borderColor && css`borderColor: ${props.borderColor}`};
  borderWidth: 0.7;
  borderRadius: 40;
  display: flex;
  justifyContent: center;
  alignItems: center;
  shadowColor: #000000;
  shadowOpacity: 0.2;
  shadowRadius: 5;
  shadowOffset: {width: 0; height: 0};
`