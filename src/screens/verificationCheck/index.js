import React from 'react'
import { View, TextInput, Platform, Keyboard, Image, TouchableOpacity, Alert, AsyncStorage, Text } from 'react-native'
import CustomBtn from '../../components/customBtn'
import CustomTxt from '../../components/customTxt';
import commonStyle from '../../common/styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    MainCon,
    PageWidth,
    AlignCenter,
    ViewMargin,
    FlexOne,
    FlexRow,
    FlexRowAndCenter
} from '../../common/commonStyles'
import {
    deviceWidth,
    deviceHeight,
    IS_IPHONE_X,
    IS_IPHONE_5
} from '../../common/utility'
import {
    BLACK,
    BLACK_FOUR,
    DARK_BLUE,
    WHITE,
    AVENIR_HEAVY,
    AVENIR_BLACK,
} from '../../common';
import LOGO from '../../images/logo.png'
import IC_MESSAGE from '../../images/ic_message.png'
import IC_USER from '../../images/ic_user.png'
import IC_PHONE from '../../images/ic_phone.png'
import IC_LOCK from '../../images/ic_lock.png'
import IC_BACK from '../../images/ic_back.png'

import { verifyConfirmationCode } from '../../network/api';
import Loader from '../../components/loader/Loader';
import messaging from '@react-native-firebase/messaging';
import {
    CodeField,
    Cursor,
} from 'react-native-confirmation-code-field';

export default class VerificationCheck extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            user: {
                phone: props.navigation.state.params.phone,
            },
            fcmToken: '',
            code: ''
        }
    }

    componentDidMount() {
        this.getFCMToken();
    }

    getFCMToken = async () => {
        try {
            const token = await messaging().getToken();
            console.log("TOKEN::: (App)", token);
            this.setState({ fcmToken: token });
        } catch (e) {
            console.log(error);
        }
    };

    loadDefaults = () => {
        /*const user = this.state.user;
        user.first_name = 'Ahsan';
        user.last_name = 'Ch';
        user.email = 'ahsan@xyz.com';
        user.password = '12345678';
        user.password_confirmation = '12345678';
        user.phone = '03007814492';
    
        this.setState({ user });*/
    }

    verifyConfirmationCode = () => {
        const { user, code, fcmToken } = this.state;
        this.setState({ loading: true });
        if (code.length === 6) {
            verifyConfirmationCode(user, code, fcmToken).then(async response => {
                this.setState({ loading: false });
                if (response.id) {
                    await AsyncStorage.setItem('user', JSON.stringify(response));
                    await AsyncStorage.setItem('token', response.api_token);
                    this.props.navigation.navigate('AppNavigator');
                } else {
                    Alert.alert(response.error)
                }
            });
        } else {
            Alert.alert('The confirmation code should be 6 digits')
        }
    }

    render() {
        const {
            props: {
                navigation,
            },
            state: {
                code,
                loading,
            },
            loadDefaults,
        } = this;

        return (
            <FlexOne backgroundColor={WHITE}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="always"
                    enableOnAndroid={true}
                    keyboardDismissMode={(Platform.OS == 'ios') ? 'none' : 'interactive'}
                    showsVerticalScrollIndicator={false}
                    scrollToEnd={true}
                    extraHeight={deviceHeight / 2.7}>

                    <AlignCenter paddingTop={20} paddingBottom={20} backgroundColor={DARK_BLUE}>
                        <TouchableOpacity onPress={() => loadDefaults()}>
                            <Image style={{ height: 120, resizeMode: 'contain' }} source={LOGO} />
                        </TouchableOpacity>
                    </AlignCenter>

                    <TouchableOpacity
                        style={{ marginTop: 10, marginLeft: 0, position: 'absolute', padding: 20 }}
                        onPress={() => navigation.pop()}>
                        <Image style={{ height: 20, width: 20 }} source={IC_BACK} />
                    </TouchableOpacity>

                    <MainCon paddingTop={30}>
                        <PageWidth>
                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <FlexRowAndCenter marginRight={0}>
                                    <CodeField
                                        // ref={ref}
                                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                                        value={code}
                                        onChangeText={(code) => {
                                            this.setState({ code })
                                        }}
                                        cellCount={6}
                                        rootStyle={commonStyle.codeFieldRoot}
                                        keyboardType="number-pad"
                                        textContentType="oneTimeCode"
                                        renderCell={({ index, symbol, isFocused }) => (
                                            <Text
                                                key={index}
                                                style={[commonStyle.cell, isFocused && commonStyle.focusCell]}
                                            >
                                                {symbol || (isFocused ? <Cursor /> : null)}
                                            </Text>
                                        )}
                                    />
                                </FlexRowAndCenter>
                            </View>

                            <AlignCenter marginTop={15} marginBottom={15}>
                                <CustomBtn
                                    btnHeight={50}
                                    btnWidth={deviceWidth <= 320 ? 260 : 300}
                                    borderRadius={7}
                                    boxShadow={true}
                                    backgroundColor={DARK_BLUE}
                                    fontFamily={AVENIR_BLACK}
                                    btnText='Verify confirmation code'
                                    textColor={WHITE}
                                    fontSize={16}
                                    onPress={() => this.verifyConfirmationCode()}
                                />
                            </AlignCenter>
                        </PageWidth>
                    </MainCon>
                </KeyboardAwareScrollView>

                <Loader loading={loading} />
            </FlexOne>
        )
    }
}