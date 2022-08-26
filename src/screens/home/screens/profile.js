import React from 'react'
import { 
  View,
  Text,
  TextInput,
  Platform,
  Keyboard,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Alert,
  DeviceEventEmitter,
} from 'react-native'
import CustomBtn from '../../../components/customBtn'
import commonStyle from '../../../common/styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
	MainCon,
	PageWidth,
	AlignCenter,
  FlexOne,
  FlexRow,
  ItemImgCon,
} from '../../../common/commonStyles'
import {
  deviceWidth,
  deviceHeight,
} from '../../../common/utility'
import {
  BLACK,
  BLACK_FOUR,
  DARK_BLUE,
  WHITE,
  THEME_BLUE_LIGHT,
  RED,
} from '../../../common';
import IC_EDIT from '../images/ic_edit.png'
import IC_EDIT_FILL from '../images/ic_edit_fill.png'
const userImageRound = require('../images/user_round_img.png')


import Loader from '../../../components/loader/Loader';
import { getProfile, getUser, updateProfile, } from '../../../network/api'
import { isValid } from '../../../common/utility';

import moment from 'moment';
import ImagePicker from 'react-native-image-picker';

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      editable: false,
      loading: false,
      avatarSource: '',
      avatarBase64: '',
    }
  }

  componentDidMount(){
    getProfile().then(user => this.setState({user}))
  }

  handleTextChange = (type, text) => {
    const user = this.state.user;
    user[type] = text;
    this.setState({user});
  }

  isFormValid = () => {
    const {
      state: {
        user: {
          first_name,
          last_name,
          phone,
        }
      },
    } = this;
    return (first_name.length >= 0 && last_name.length >= 0 && phone.length >= 8);
  }

  updateUser = () => {
    this.setState({loading: true});
    let user = this.state.user;
    if(user.user_image){
      delete user.user_image;
    }
    /*if(isValid(this.state.avatarSource)){
      user = {...user, image: this.state.avatarBase64}
    }*/
    updateProfile(user, this.state.avatarBase64).then(async response => {
      console.log('updateProfile', 'HERE', response);
      if(!response.error){
        this.setState({loading: false, user: response, editable: false});
        await AsyncStorage.setItem('user', JSON.stringify(response));
        Alert.alert('Profile updated successfully.');
        DeviceEventEmitter.emit('profileUpdated', {});
      }else{
        this.setState({loading: false});
        setTimeout(() => Alert.alert(response.error), 500);
        //Alert.alert(response.error)
      }
    });
  }

  onProfileImagePress = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 700,
      maxHeight: 700,
      //quality: 1,
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        
        this.setState({
          avatarSource: source,
          avatarBase64: response.data,
        });
      }
    });
  }

  render() {
    const {
      state: {
        editable,
        user,
        loading,
        avatarSource,
        avatarBase64,
      },
      handleTextChange,
      isFormValid,
      updateUser,
      onProfileImagePress,
    } = this;

    console.log('~~~~ render ~~~~~>', user);
    
    return (
      <FlexOne backgroundColor={WHITE}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          enableOnAndroid={true}
          keyboardDismissMode={(Platform.OS == 'ios') ? 'none' : 'interactive'}
          showsVerticalScrollIndicator={false}
          scrollToEnd={true}
          extraHeight={deviceHeight / 2.7}>
        
        <AlignCenter paddingTop={30} paddingBottom={20} backgroundColor={WHITE}>
          <TouchableOpacity onPress={() => editable && onProfileImagePress()}>
            <ItemImgCon height={80} width={80} borderColor={THEME_BLUE_LIGHT}>
              {
                isValid(avatarSource)?
                <Image
                  source={{uri:`${avatarSource.uri}`}}
                  style={styles.profileImage} />
                :
                <Image
                  source={{uri:`${user.user_image}`}}
                  style={styles.profileImage} />
              }
              
            </ItemImgCon>
          </TouchableOpacity>
        </AlignCenter>

        <FlexRow position={'absolute'} width={'100%'} justifyContent={'flex-end'}>
          <TouchableOpacity 
            style={{ paddingTop:20, paddingRight:20}}
            onPress={() => this.setState({editable: !editable})}>
            <Image style={{ height:25, width:25 }}
              source={IC_EDIT}
            />
          </TouchableOpacity>
        </FlexRow>

        <MainCon paddingTop={20}>
          <PageWidth paddingLeft={15} paddingRight={15}>
            <View>
              <FlexRow marginRight={75}>
                <Text style={styles.textfieldTitle}>First Name</Text>
                  <TextInput
                    style={[ commonStyle.profileTextFieldStyle, {textAlign: 'right'}]}
                    ref="input_first_name"
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    autoCorrect={false}
                    enablesReturnKeyAutomatically
                    returnKeyType="next"
                    editable={editable}
                    value={isValid(user)? user.first_name : ''}
                    placeholder="First Name"
                    onChangeText={(value) => handleTextChange('first_name', value)}
                    placeholderTextColor={BLACK_FOUR}
                    allowFontScaling={false}
                  />
                </FlexRow>
              <FlexRow
                  height={0.5}
                  width='100%'
                  backgroundColor={BLACK}
                />
              </View>
            <View style={{ marginTop:10 }}>
              <FlexRow marginRight={75}>
                <Text style={styles.textfieldTitle}>Last Name</Text>
                  <TextInput
                    style={[ commonStyle.profileTextFieldStyle, {textAlign: 'right'}]}
                    ref="input_last_name"
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={editable}
                    value={isValid(user)? user.last_name: ''}
                    enablesReturnKeyAutomatically
                    returnKeyType="next"
                    placeholder="Last Name"
                    onChangeText={(value) => handleTextChange('last_name', value)}
                    placeholderTextColor={BLACK_FOUR}
                    allowFontScaling={false}
                  />
                </FlexRow>
              <FlexRow
                  height={0.5}
                  width='100%'
                  backgroundColor={BLACK}
                />
              </View>
            <View style={{ marginTop:10 }}>
              <FlexRow marginRight={55}>
                <Text style={styles.textfieldTitle}>Contact</Text>
                  <TextInput
                    style={[ commonStyle.profileTextFieldStyle, {textAlign: 'right'}]}
                    ref="input_contact"
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    autoCorrect={false}
                    enablesReturnKeyAutomatically
                    returnKeyType="next"
                    editable={editable}
                    value={isValid(user)? user.phone: ''}
                    placeholder="Contact"
                    onChangeText={(value) => handleTextChange('phone', value)}
                    placeholderTextColor={BLACK_FOUR}
                    allowFontScaling={false}
                  />
                </FlexRow>
              <FlexRow
                  height={0.5}
                  width='100%'
                  backgroundColor={BLACK}
                />
              </View>
            <View style={{ marginTop:10 }}>
              <FlexRow marginRight={40}>
                <Text style={styles.textfieldTitle}>Email</Text>
                  <TextInput
                    style={[ commonStyle.profileTextFieldStyle, {textAlign: 'right'}]}
                    ref="input_contact"
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    enablesReturnKeyAutomatically
                    returnKeyType="next"
                    placeholder="Email"
                    editable={false}
                    value={isValid(user)? user.email: ''}
                    placeholderTextColor={BLACK_FOUR}
                    allowFontScaling={false}
                  />
                </FlexRow>
              <FlexRow
                  height={0.5}
                  width='100%'
                  backgroundColor={BLACK}
                />
              </View>
            <View style={{ marginTop:10 }}>
              <FlexRow marginRight={100}>
                <Text style={styles.textfieldTitle}>Member Since</Text>
                  <TextInput
                    style={[ commonStyle.profileTextFieldStyle, {textAlign: 'right'}]}
                    ref="input_member"
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    autoCorrect={false}
                    enablesReturnKeyAutomatically
                    returnKeyType="go"
                    editable={false}
                    value={isValid(user)? this.loadMemberSince(user.created_at): ''}
                    placeholder="Member Since"
                    placeholderTextColor={BLACK_FOUR}
                    allowFontScaling={false}
                  />
                </FlexRow>
              <FlexRow
                  height={0.5}
                  width='100%'
                  backgroundColor={BLACK}
                />
              </View>
            {editable &&
              <AlignCenter marginTop={15}>
                <CustomBtn
                  btnHeight={45}
                  btnWidth={deviceWidth <= 320 ? 260 : 300}
                  borderRadius={7}
                  boxShadow={true}
                  backgroundColor={DARK_BLUE}
                  btnText='Save'
                  textColor={WHITE}
                  fontSize={16}
                  isButtonDisable={!isFormValid()}
                  onPress={() => isFormValid() && updateUser()}
                />
             </AlignCenter>
            }
            <AlignCenter marginTop={15}>
              <CustomBtn
                btnHeight={45}
                btnWidth={deviceWidth <= 320 ? 260 : 300}
                borderRadius={7}
                boxShadow={true}
                backgroundColor={DARK_BLUE}
                btnText='Change Password'
                textColor={WHITE}
                fontSize={16}
                isButtonDisable={false}
                onPress={() => this.props.navigation.navigate('ResetPassword')}
              />
            </AlignCenter>
            {/*<AlignCenter marginTop={15} marginBottom={20}>
              <CustomBtn
                btnHeight={45}
                btnWidth={deviceWidth <= 320 ? 260 : 300}
                borderRadius={7}
                boxShadow={true}
                backgroundColor={RED}
                btnText='Delete Account'
                textColor={WHITE}
                isButtonDisable={true}
                fontSize={16}
                onPress={() => {}}
              />
            </AlignCenter>*/}
            
            </PageWidth>
          </MainCon>
        </KeyboardAwareScrollView>

        <Loader loading={loading}  />
      </FlexOne>
    )
  }

  loadMemberSince = (dateTime) => {
    return moment(dateTime).format('MMM DD, YYYY');
  }
}

const styles = StyleSheet.create({
  navItemStyle: {
    paddingLeft: 40,
    height:50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textfieldTitle: {
    color:BLACK,
    fontSize:16,
    marginTop:10
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius:40,
  }
});