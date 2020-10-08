import React, { Component } from 'react';
import { View, Text, StatusBar, Image, PermissionsAndroid, Platform, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { Header } from 'react-native-elements'
import LeftComponent from '../../components/LeftComponent'
import colors from '../../themes/Colors'
import styles from './style'
import { connect } from "react-redux";
import ActivityIndicator from '../../components/ProgressBar/ActivityIndicator'
import { NavigationActions } from 'react-navigation'
import I18n from 'react-native-i18n'
import { setupIp, clearIp } from '../../actions/ApiAction'
import MyButton from '../../components/MyButton'
import MyTextInput from '../../components/MyTextInput'
import images from '../../themes/Image'
import { isValidated } from '../../utils/Validate'
import * as Constant from '../../utils/Constant'
import ImagePicker from 'react-native-image-crop-picker';
import { updateShopInfo } from '../../actions/RegisterAction'
import { saveProfile } from '../../actions/LoginAction'

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shop_id: null,
            shop_name: null,
            shop_email: null,
            address: null,
            user_name: null,
            email: null,
            password: null,
            shop_phone: null,
            imagePath: null,
        };
    }

    goBackFunction = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    componentWillMount() {
        if (this.props.shopInfo) {
            this.setState({
                shop_id: this.props.shopInfo.shop_id,
                shop_name: this.props.shopInfo.shop_name,
                shop_email: this.props.shopInfo.shop_email,
                shop_phone: this.props.shopInfo.shop_phone,
            })
        }
        if (this.props.image_url != null) {
            this.setState({ imagePath: this.props.image_url })
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('nextProps', nextProps)
        if (nextProps && nextProps.loginData) {
            switch (nextProps.loginData.actionType) {
                case "SAVE_PROFILE":
                    this.setState({ imagePath: nextProps.loginData.image_url })
                    break;
                default:
                    break;
            }
        }
    }

    onSaveShop = () => {
        let data = {
            "shop_id": this.state.shop_id,
            "shop_name": this.state.shop_name,
            "shop_email": this.state.shop_email,
            "shop_phone": this.state.shop_phone,
            "shop_permission": this.props.shopInfo.shop_permission,
            "latitude": this.props.shopInfo.latitude,
            "long_latitude": this.props.shopInfo.long_latitude,
            "shop_address": this.props.shopInfo.shop_address,
            "total_device": this.props.shopInfo.total_device
        }
        this.props.updateShopInfo(data)
        ToastAndroid.show(I18n.t('00000'), ToastAndroid.LONG);
    }

    onChangeShopId = (text) => {
        const errorShopId = !text || text.length < 1 ||
            !isValidated(text, Constant.VALIDATE_NUMERIC) ? I18n.t('pinIsIncorrectOrMalformed') : null
        this.setState({ password: text, errorShopId })
    }

    onChangePhone = (text) => {
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

    onSelectImage = () => {
        let imageUrl = null
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            imageUrl = { uri: image.path, width: image.width, height: image.height }
            this.props.saveProfile(imageUrl)
            this.setState({
                imagePath: { uri: image.path, width: image.width, height: image.height }
            })
        });
    }

    renderImage = (image) => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={image} style={{ width: 150, height: 150, borderRadius: 150 / 2, borderWidth: 1, borderColor: colors.buttonColor }} />
            </View>
        )
    }

    renderSelect = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={images.iconSelectImage} style={{ width: 150, height: 150, borderRadius: 150 / 2, borderWidth: 1, borderColor: colors.buttonColor }} />
            </View>
        )
    }


    render() {
        const { shop_phone, shop_name, shop_id, errorShopName, errorPhoneNumber, errorShopId, errorShopEmail, shop_email } = this.state
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={colors.blue}
                    barStyle="light-content"
                />
                <Header
                    outerContainerStyles={styles.containHead}
                    leftComponent={<LeftComponent icons_name='ios-close' onPress={() => { this.goBackFunction() }} />}
                    centerComponent={{ text: I18n.t('shopInfo'), style: styles.head_text }}
                />
                {this.state.isLoading ? <ActivityIndicator /> : null}
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.content}>
                        <View style={styles.groupItem}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                                <TouchableOpacity onPress={() => this.onSelectImage()}
                                    style={{ justifyContent: 'center', alignItems: 'center' }} >
                                    {this.state.imagePath ? this.renderImage(this.state.imagePath) : this.renderSelect()}
                                </TouchableOpacity>
                                <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 18, fontWeight: '500' }}>{I18n.t('profile')}</Text>
                            </View>
                            <MyTextInput
                                value={shop_id}
                                label={I18n.t('pleaseInputShopId')}
                                error={errorShopId}
                                maxLength={50}
                                textLeft={10}
                                labelLeft={30}
                                inputTextIcon
                                image_name={images.iconId}
                                placeholderTextColor={colors.placeholderColor}
                                onChangeText={(text) => this.onChangeShopId(text)}
                            />
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
                                inputTextIcon
                                image_name={images.icon_email}
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
                            <View style={{ alignItems: 'center', zIndex: -999, marginTop: 15 }}>
                                <MyButton
                                    textButton={I18n.t('save')}
                                    isDisable={false}
                                    onPress={() => this.onSaveShop()}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        api: state.api,
        login: state.login,
        shopInfo: state.regInfo.shopInfo,
        image_url: state.login.image_url,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setupIp: (ip) => dispatch(setupIp(ip)),
        clearIp: () => dispatch(clearIp()),
        updateShopInfo: (data) => dispatch(updateShopInfo(data)),
        saveProfile: (image_url) => dispatch(saveProfile(image_url))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Shop);
