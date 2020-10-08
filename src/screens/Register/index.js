import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, ScrollView, Alert, AsyncStorage } from 'react-native';
import { connect } from "react-redux";
import styles from './style'
import colors from '../../themes/Colors'
import { Header } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import ActivityIndicator from '../../components/ProgressBar/ActivityIndicator'
import LeftComponent from '../../components/LeftComponent'
import MyTextInput from '../../components/MyTextInput'
import I18n from 'react-native-i18n'
import DeviceInfo from 'react-native-device-info';
import { shopRegister, register, checkShopInfo } from '../../actions/RegisterAction'
import { isValidated } from '../../utils/Validate'
import * as Constant from '../../utils/Constant'
import * as ERROR_CODE from '../../constants/errorCode'
import { SHOP_REGISTER_SUCCESS, SHOP_REGISTER_FAILED, REGISTER_SUCCESS, REGISTER_FAILED, CHECK_SHOP_INFO, CHECK_SHOP_INFO_SUCCESS, CHECK_SHOP_INFO_FAILED } from '../../constants/type'
import { registerShop, registerUser } from '../../controller/UserController'
import MyButton from '../../components/MyButton'
import firebase from 'react-native-firebase'
import images from '../../themes/Image'

let uniqueId = DeviceInfo.getUniqueId();
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            shop_id: null,
            shop_name: null,
            shop_email: null,
            address: null,
            user_name: null,
            email: null,
            password: null,
            shop_phone: null,
            myToken: null,
            status: false
        };
    }

    componentWillMount() {
        const { params } = this.props.navigation.state
        this.setState({ status: params.status })
    }

    goBackFunction = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    async componentDidMount() {
        await firebase.messaging().hasPermission()
            .then(enable => {
                if (enable) {
                    console.log("user has permissions")
                } else {
                    this.NotiPermission();
                }
            });
        let fcmToken = await AsyncStorage.getItem('fcmToken')
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken)
                this.setState({ myToken: fcmToken })
            }
        } else {
            this.setState({ myToken: fcmToken })
        }
    }

    async NotiPermission() {
        await firebase.messaging().requestPermission()
            .then(() => {
                console.log("user has authorised")
            }).catch(error => {
                console.log("user has rejected permission")
            })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
        if (nextProps) {
            if (nextProps && nextProps.responseCode == ERROR_CODE.SUCCESS) {
                switch (nextProps.actionType) {
                    case SHOP_REGISTER_SUCCESS:
                        let data = {
                            shop_id: nextProps.shopInfo.shop_id,
                            shop_email: nextProps.shopInfo.shop_email,
                            user_name: this.state.user_name,
                            email: this.state.email,
                            password: this.state.password,
                            device_uid: uniqueId,
                            device_token: this.state.myToken,
                            lang: I18n.locale
                        }
                        this.props.register(data, this.props.api.publicIp)
                        break;
                    case REGISTER_SUCCESS:
                        registerShop(nextProps.shopInfo.shop_id, nextProps.shopInfo.shop_name,
                            nextProps.shopInfo.shop_email, nextProps.shopInfo.shop_phone, nextProps.shopInfo.shop_permission, nextProps.shopInfo.latitude,
                            nextProps.shopInfo.long_latitude, nextProps.shopInfo.shop_address,
                            nextProps.shopInfo.total_device).then(({ result, message }) => null);
                        registerUser(this.state.user_name, this.state.password, this.state.email, nextProps.shopInfo.shop_id, nextProps.shopInfo.shop_email, uniqueId, "1", this.state.myToken).then(({ result, message }) => null);
                        this.goBackFunction()
                        this.setState({ isLoading: false })
                        break

                    case CHECK_SHOP_INFO_SUCCESS:
                        registerShop(nextProps.shopInfo.shop_id, nextProps.shopInfo.shop_name,
                            nextProps.shopInfo.shop_email, nextProps.shopInfo.shop_phone, nextProps.shopInfo.shop_permission, nextProps.shopInfo.latitude,
                            nextProps.shopInfo.long_latitude, nextProps.shopInfo.shop_address,
                            nextProps.shopInfo.total_device).then(({ result, message }) => null);
                        this.goBackFunction()
                        this.setState({ isLoading: false })
                        break
                    default:
                        break;
                }
            } else {
                if (nextProps.actionType === SHOP_REGISTER_FAILED) {
                    switch (nextProps.responseCode) {
                        case ERROR_CODE.EXIST_SHOP_EMAIL:
                            Alert.alert(I18n.t('error'), I18n.t('10012', { email: this.state.shop_email }))
                            this.setState({ isLoading: false })
                            break;
                        case ERROR_CODE.REGISTER_FAIL:
                            Alert.alert(I18n.t('error'), I18n.t('10010'))
                            this.setState({ isLoading: false })
                            break
                        case ERROR_CODE.CONECT_FAIL:
                            Alert.alert(I18n.t('error'), I18n.t('99994'))
                            this.setState({ isLoading: false })
                            break
                        default:
                            Alert.alert(I18n.t('error'), I18n.t('99999'))
                            this.setState({ isLoading: false })
                            break;
                    }
                } else if (nextProps.actionType == REGISTER_FAILED) {
                    switch (nextProps.responseCode) {
                        case ERROR_CODE.EXIST_EMAIL:
                            Alert.alert(I18n.t('error'), I18n.t('10118', { email: this.state.email }))
                            this.setState({ isLoading: false })
                            break;
                        case ERROR_CODE.SHOP_REGISTER_COUNT:
                            Alert.alert(I18n.t('error'), I18n.t('10117'))
                            this.setState({ isLoading: false })
                            break
                        case ERROR_CODE.ACCOUNT_NOT_REGISTER:
                            Alert.alert(I18n.t('error'), I18n.t('10116'))
                            this.setState({ isLoading: false })
                            break
                        case ERROR_CODE.CONECT_FAIL:
                            Alert.alert(I18n.t('error'), I18n.t('99994'))
                            this.setState({ isLoading: false })
                            break
                        default:
                            Alert.alert(I18n.t('error'), I18n.t('99999'))
                            this.setState({ isLoading: false })
                            break;
                    }
                } else if (nextProps.actionType == CHECK_SHOP_INFO_FAILED) {
                    this.setState({ isLoading: false })
                }
            }
        }
    }

    onChangePhone = (text) => {
        // this.setState({ shop_phone: text })
        const errorPhoneNumber = !text || text.length < 1 ||
            !isValidated(text, Constant.VALIDATE_LAOS) ? I18n.t('incorrectPhoneNumber') : null
        this.setState({ shop_phone: text, errorPhoneNumber })
    }

    onChangeShopName = (text) => {
        var errorShopName = !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('nameIsInvalid') : ''
        if (!text) {
            errorShopName = I18n.t('nameIsNotEmpty')
        }
        this.setState({ shop_name: text, errorShopName })
    }

    onChangeShopEmail = (text) => {
        var errorShopEmail = ''
        if (text.indexOf('@gmail'.toLowerCase()) > 3 && text.indexOf('.com'.toLowerCase()) > 4) {
            errorShopEmail = ''
        } else {
            if (text.indexOf('@hotmail'.toLowerCase()) > 3 && text.indexOf('.com'.toLowerCase()) > 4) {
                errorShopEmail = ''
            } else {
                errorShopEmail = I18n.t('incorrectEmail')
            }
        }
        if (!text) {
            errorShopEmail = I18n.t('emailIsNotEmpty')
        }
        this.setState({ shop_email: text, errorShopEmail })
    }

    onChangeShopAddress = (text) => {
        var errorAddress = !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('nameIsInvalid') : ''
        if (!text) {
            errorAddress = I18n.t('nameIsNotEmpty')
        }
        this.setState({ address: text, errorAddress })
    }

    onChangeEmail = (text) => {
        var errorEmail = ''
        if (text.indexOf('@gmail'.toLowerCase()) > 3 && text.indexOf('.com'.toLowerCase()) > 4) {
            errorEmail = ''
        } else {
            if (text.indexOf('@hotmail'.toLowerCase()) > 3 && text.indexOf('.com'.toLowerCase()) > 4) {
                errorEmail = ''
            } else {
                errorEmail = I18n.t('incorrectEmail')
            }
        }
        if (!text) {
            errorEmail = I18n.t('emailIsNotEmpty')
        }
        this.setState({ email: text, errorEmail })
    }

    onChangeUserName = (text) => {
        var errorUser = !isValidated(text, Constant.VALIDATE_NON_SPECIAL) ? I18n.t('nameIsInvalid') : ''
        if (!text) {
            errorUser = I18n.t('nameIsNotEmpty')
        }
        this.setState({ user_name: text, errorUser })
    }

    onChangePassword = (text) => {
        const errorPassword = !text || text.length < 1 ||
            !isValidated(text, Constant.VALIDATE_NUMERIC) ? I18n.t('pinIsIncorrectOrMalformed') : null
        this.setState({ password: text, errorPassword })
    }

    onPressRegister = () => {
        this.setState({ isLoading: true })
        let data = {
            "shop_name": this.state.shop_name,
            "shop_email": this.state.shop_email,
            "shop_phone": this.state.shop_phone,
            "latitude": "0",
            "long_latitude": "0",
            "shop_address": this.state.address,
        }
        // registerShop(nextProps.shopInfo.shop_id, nextProps.shopInfo.shop_name,
        //     nextProps.shopInfo.shop_email, nextProps.shopInfo.shop_phone, nextProps.shopInfo.shop_permission, nextProps.shopInfo.latitude,
        //     nextProps.shopInfo.long_latitude, nextProps.shopInfo.shop_address,
        //     nextProps.shopInfo.total_device).then(({ result, message }) => null);
        // registerUser(this.state.user_name, this.state.password, this.state.email, 1 , this.state.shop_name, uniqueId, "1", this.state.myToken).then(({ result, message }) => null);
        // this.goBackFunction()

        if (this.props.api == null) {
            Alert.alert(I18n.t('warning'), "Please configure server")
            return
        }
        this.props.shopRegister(data, this.props.api.publicIp)
    }

    onPressSave = () => {
        if (this.state.shop_email != null) {
            this.setState({ isLoading: true })
            this.props.onCheckShopInfo(this.state.shop_email, this.state.myToken, this.props.api.publicIp);
        }
    }

    render() {
        const { shop_phone, shop_name, password, errorShopName, errorPhoneNumber, errorPassword,
            errorUser, errorAddress, errorShopEmail, errorEmail, shop_email, address, user_name,
            email } = this.state
        return (
            <View style={styles.container}>
                <Header
                    outerContainerStyles={styles.containHead}
                    leftComponent={<LeftComponent icons_name='ios-arrow-round-back' onPress={() => { this.goBackFunction() }} />}
                    centerComponent={{ text: this.state.status == true ? I18n.t('register') : I18n.t('help'), style: styles.head_text }}
                />
                {this.state.isLoading ? <ActivityIndicator /> : null}
                <ScrollView showsVerticalScrollIndicator={false} >
                    {/* <KeyboardAvoidingView behavior="position"> */}
                    <View style={styles.mainContent}>
                        <View style={styles.header}>
                            <Text style={styles.title}>{I18n.t('shopInfo')}</Text>
                        </View>
                        <View style={{ padding: 15 }}>
                            {
                                this.state.status == false ?
                                    <MyTextInput
                                        value={shop_email}
                                        label={I18n.t('pleaseInputShopEmail')}
                                        error={errorShopEmail}
                                        maxLength={50}
                                        textLeft={10}
                                        labelLeft={30}
                                        image_name={images.icon_email}
                                        inputTextIcon
                                        placeholderTextColor={colors.placeholderColor}
                                        onChangeText={(text) => this.onChangeShopEmail(text)}
                                    />
                                    :
                                    <View>
                                        <MyTextInput
                                            value={shop_name}
                                            label={I18n.t('pleaseInputShopName')}
                                            error={errorShopName}
                                            maxLength={50}
                                            textLeft={10}
                                            labelLeft={30}
                                            inputTextIcon
                                            image_name={images.iconShopInfo}
                                            placeholderTextColor={colors.placeholderColor}
                                            onChangeText={(text) => this.onChangeShopName(text)}
                                        />
                                        <MyTextInput
                                            value={shop_email}
                                            label={I18n.t('pleaseInputShopEmail')}
                                            error={errorShopEmail}
                                            maxLength={50}
                                            textLeft={10}
                                            labelLeft={30}
                                            image_name={images.icon_email}
                                            inputTextIcon
                                            placeholderTextColor={colors.placeholderColor}
                                            onChangeText={(text) => this.onChangeShopEmail(text)}
                                        />
                                        <MyTextInput
                                            value={shop_phone}
                                            label={I18n.t('pleaseInputPhone')}
                                            error={errorPhoneNumber}
                                            maxLength={13}
                                            textLeft={10}
                                            labelLeft={30}
                                            inputTextIcon
                                            image_name={images.iconTelephone}
                                            placeholderTextColor={colors.placeholderColor}
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.onChangePhone(text)}
                                        />
                                        <MyTextInput
                                            value={address}
                                            label={I18n.t('pleaseInputShopAddress')}
                                            error={errorAddress}
                                            maxLength={120}
                                            textLeft={10}
                                            labelLeft={30}
                                            inputTextIcon
                                            image_name={images.iconLocation}
                                            placeholderTextColor={colors.placeholderColor}
                                            onChangeText={(text) => this.onChangeShopAddress(text)}
                                        />
                                    </View>
                            }

                        </View>
                        {
                            this.state.status == false ? null
                                :
                                <View>
                                    <View style={[styles.header, { marginTop: -18 }]}>
                                        <Text style={styles.title}>{I18n.t('userInfo')}</Text>
                                    </View>
                                    <View style={{ padding: 15 }}>
                                        <MyTextInput
                                            value={user_name}
                                            label={I18n.t('pleaseInputUserName')}
                                            error={errorUser}
                                            maxLength={50}
                                            textLeft={10}
                                            labelLeft={30}
                                            inputTextIcon
                                            image_name={images.iconProfile}
                                            placeholderTextColor={colors.placeholderColor}
                                            onChangeText={(text) => this.onChangeUserName(text)}
                                        />
                                        <MyTextInput
                                            value={email}
                                            label={I18n.t('pleaseInputEmailLogin')}
                                            error={errorEmail}
                                            maxLength={50}
                                            textLeft={10}
                                            labelLeft={30}
                                            inputTextIcon
                                            image_name={images.icon_email}
                                            placeholderTextColor={colors.placeholderColor}
                                            onChangeText={(text) => this.onChangeEmail(text)}
                                        />
                                        <MyTextInput
                                            value={password}
                                            label={I18n.t('pleaseInputPassword')}
                                            error={errorPassword}
                                            maxLength={8}
                                            textLeft={10}
                                            labelLeft={30}
                                            inputTextIcon
                                            image_name={images.icon_password}
                                            keyboardType='numeric'
                                            placeholderTextColor={colors.placeholderColor}
                                            onChangeText={(text) => this.onChangePassword(text)}
                                        />
                                    </View>
                                </View>
                        }

                        <View style={{ flex: 1, alignItems: 'center' }}>
                            {
                                this.state.status ?
                                    <MyButton
                                        textButton={I18n.t('register')}
                                        isDisable={(!shop_name || errorShopName || !shop_email || errorShopEmail ||
                                            !shop_phone || errorPhoneNumber || !address || errorAddress ||
                                            !user_name || errorUser || !email || errorEmail || !password || errorPassword) ? true : false}
                                        onPress={() => this.onPressRegister()}
                                    />
                                    :
                                    <MyButton
                                        textButton={I18n.t('save')}
                                        isDisable={false}
                                        onPress={() => this.onPressSave()}
                                    />
                            }
                        </View>
                    </View>
                    {/* </KeyboardAvoidingView> */}
                </ScrollView>

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login.dataLogin,
        shopInfo: state.regInfo.shopInfo,
        actionType: state.regInfo.actionType,
        responseCode: state.regInfo.responseCode,
        responseDescription: state.regInfo.responseDescription,
        userRegister: state.regInfo.userRegister,
        api: state.api,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        shopRegister: (data, ip) => dispatch(shopRegister(data, ip)),
        register: (data, ip) => dispatch(register(data, ip)),
        onCheckShopInfo: (shop_email, token, ip) => dispatch(checkShopInfo(shop_email, token, ip)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);