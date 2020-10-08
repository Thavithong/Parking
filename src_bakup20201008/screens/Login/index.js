import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Animated, StatusBar, Image, Dimensions, KeyboardAvoidingView, Easing, FlatList, Alert, Platform, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { CHECK_LOGIN_SUCCESS, CHECK_LOGIN_FAIL } from '../../constants/type'
import images from '../../themes/Image'
import colors from '../../themes/Colors'
import MyTextInput from '../../components/MyTextInput'
import styles from './style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ActivityIndicator from '../../components/ProgressBar/ActivityIndicator'
import MyButton from '../../components/MyButton'
import { connect } from "react-redux";
import { onPressLogin, changeLocalLanguage } from '../../actions/LoginAction'
import { clearRegister } from '../../actions/RegisterAction'
import { register } from '../../controller/UserController'
import { CheckBox } from 'react-native-elements'
import I18n from 'react-native-i18n'
import { isValidated } from '../../utils/Validate'
import * as Constant from '../../utils/Constant'
import * as ERROR_CODE from '../../constants/errorCode'
var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({ name: 'parking.db', createFromLocation: '~parking.db' })
import TouchID from 'react-native-touch-id';
import { checkLogin } from '../../actions/LoginAction'
import { onCheckVersion } from '../../actions/RegisterAction'

class index extends Component {
  constructor(props) {
    super(props);

    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;

    this.state = {
      isLoading: false,
      email: null,
      password: null,
      data: null,
      checked: false,
      errorEmail: '',
      errorPassword: '',
      menu: [
        { id: 1, img: images.icLaos, language: 'lo' },
        { id: 2, img: images.icEnglish, language: 'en' },
      ],
      opacityFlat: new Animated.Value(0),
      selectFlag: images.icLaos,
      isOpen: 1,
      isRemember: null,
      touchShopId: null,
      touchShopEmail: null,
      touchPassword: null,
      touchEmail: null,
      touchUID: null,
    };
    this.checkRememberTouch()
  }

  componentWillMount() {
    if (this.props.login.isKeepLogin) {
      this.setState({ email: this.props.login.email, password: this.props.login.password, checked: true })
    } else {
      this.setState({ email: null, password: null, checked: false })
    }
    if (I18n.locale == 'lo') {
      this.setState({ selectFlag: images.icLaos })
    } else {
      this.setState({ selectFlag: images.icEnglish })
    }

    const lang = I18n.locale
    this.props.onCheckVersion(lang, this.props.api.publicIp)
  }


  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      if (this.props.userRegister != null) {
        this.setState({
          email: this.props.userRegister.email,
          password: this.props.userRegister.password,
          errorEmail: '',
          errorPassword: ''
        })
      }
    })
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  async checkRememberTouch() {
    let status = await AsyncStorage.getItem('isRememberTouch')
    if (status == 'remember') {
      let shop_id = await AsyncStorage.getItem('shop_id')
      let shop_email = await AsyncStorage.getItem('shop_email')
      let password = await AsyncStorage.getItem('password')
      let user_email = await AsyncStorage.getItem('user_email')
      let device_uid = await AsyncStorage.getItem('device_uid')
      console.log('user_email', user_email)
      this.setState({ isRemember: status, touchShopId: shop_id, touchShopEmail: shop_email, touchPassword: password, touchEmail: user_email, touchUID: device_uid })
      this.onTouchID(false)
    }
  }
  onTouchID(status) {
    try {
      const optionalConfigObject = {
        unifiedErrors: false,
        passcodeFallback: false
      }
      TouchID.isSupported(optionalConfigObject)
        .catch(error => {
          Alert.alert(I18n.t('error'), I18n.t('notSupportTouchId'))
        });
      if (this.state.isRemember == "remember") {
        const optionalConfigObject = {
          title: I18n.t('titleTouch'),
          imageColor: colors.buttonColor,
          imageErrorColor: colors.red,
          sensorDescription: I18n.t('sensorDescription'),
          sensorErrorDescription: I18n.t('sensorErrorDescription'),
          cancelText: 'Cancel',
          fallbackLabel: 'Show Passcode',
          unifiedErrors: false,
          passcodeFallback: false,
        }
        TouchID.isSupported(optionalConfigObject)
          .then(biometryType => {
            if (biometryType === 'FaceID') {
              console.log("Face ID")
            } else {
              TouchID.authenticate(I18n.t('contentTouchRequest'), optionalConfigObject)
                .then(success => {
                  this.setState({ isLoading: true })
                  this.loginByTouch()
                })
                .catch(error => {
                  // Alert.alert(I18n.t('notAllowTouchId'));
                });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        if (status == true) {
          Alert.alert(I18n.t('error'), I18n.t('notAllowTouchId'));
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  loginByTouch() {
    if (this.state.checked == true) {
      this.loginLocal()
    } else {
      const data = {
        shop_id: this.state.touchShopId,
        shop_email: this.state.touchShopEmail,
        password: this.state.touchPassword,
        email: this.state.touchEmail,
        device_uid: this.state.touchUID,
      }
      this.props.checkLogin(data, this.state.checked, this.props.api.publicIp)
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    if (nextProps) {
      if (nextProps && nextProps.responseCode == ERROR_CODE.SUCCESS) {
        switch (nextProps.actionType) {
          case CHECK_LOGIN_SUCCESS:
            this.loginLocal()
            break;
          default:
            break;
        }
      } else {
        if (nextProps.actionType === CHECK_LOGIN_FAIL) {
          switch (nextProps.responseCode) {
            case ERROR_CODE.SHOP_NOT_HAVE_PERMISSION:
              Alert.alert(I18n.t('error'),I18n.t('10123'))
              this.setState({ isLoading: false })
              break;
            case ERROR_CODE.ACCOUNT_LOGIN_DIFFERENT:
              Alert.alert(I18n.t('error'),I18n.t('10121'))
              this.setState({ isLoading: false })
              break
            case ERROR_CODE.ACCOUNT_BLOCK:
              Alert.alert(I18n.t('error'),I18n.t('10119'))
              this.setState({ isLoading: false })
              break
            case ERROR_CODE.ACCOUNT_CANCLE:
              Alert.alert(I18n.t('error'),I18n.t('10120'))
              this.setState({ isLoading: false })
              break
            case ERROR_CODE.ACCOUNT_NOT_REGISTER:
              Alert.alert(I18n.t('error'), I18n.t('10116', { email: this.state.email }))
              this.setState({ isLoading: false })
              break
            case ERROR_CODE.CONECT_FAIL:
              Alert.alert(I18n.t('error'),I18n.t('99994'))
              this.setState({ isLoading: false })
              break
            default:
              Alert.alert(I18n.t('error'),I18n.t('99999'))
              this.setState({ isLoading: false })
              break;
          }
        }
      }
    } else {
      this.setState({ isLoading: false })
    }
  }


  loginLocal() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tb_user WHERE email=?', [this.state.email], (tx, results) => {
        if (results.rows.length > 0) {
          db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tb_user WHERE email=? AND password=?', [this.state.email, this.state.password], (tx, rs) => {
              if (rs.rows.length > 0) {
                let item = results.rows.item(0);
                this.props.onPressLogin(item, this.state.checked)
                this.setState({ isLoading: false })
                const resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'App' })]
                })
                this.props.clearRegister()
                this.props.navigation.dispatch(resetAction)
              } else {
                Alert.alert(I18n.t('error'), I18n.t('incorrect_Password'))
                this.setState({ isLoading: false })
              }
            });
          });
        } else {
          Alert.alert(I18n.t('error'), I18n.t('incorrect_Email'))
          this.setState({ isLoading: false })
        }
      }, (error) => {
        console.log('error', error)
      });
    });
  }

  onPressToHome = () => {
    this.setState({ isLoading: true })
    if (this.state.checked == true) {
      this.loginLocal()
    } else {
      if (this.props.shopInfo != null) {
        let item = this.props.shopInfo
        const data = {
          shop_id: item.shop_id,
          shop_email: item.shop_email,
          password: this.state.password,
          email: this.state.email,
          device_uid: Constant.getUniqueId(),
        }
        this.props.checkLogin(data, this.state.checked)
      }
    }
  }

  onPressRegister = () => {
    this.props.navigation.navigate('Register', { status: true })
  }

  onHelp = () => {
    this.props.navigation.navigate('Register', { status: false })
  }

  onChangeEmail(text) {
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

  onChangePass(text) {
    const errorPassword = !text || text.length < 1 ||
      !isValidated(text, Constant.VALIDATE_NUMERIC) ? I18n.t('pinIsIncorrectOrMalformed') : null
    this.setState({ password: text, errorPassword })
  }

  onPressChecked = () => {
    this.setState({ checked: !this.state.checked })
  }

  onSelectFlag = (item, index) => {
    this.setState({ selectFlag: item.img, })
    Animated.timing(this.state.opacityFlat, {
      toValue: 0,
      duration: 122,
      easing: Easing.linear,
    }).start(() => {
      this.props.changeLocalLanguage(item.language)
      this.setState({ isOpen: 1 })
      Animated.timing(this.state.opacityFlat, {
        toValue: 0,
        duration: 122,
        easing: Easing.linear,
      }).start();
    })
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.onSelectFlag(item)}>
        {
          item.img == this.state.selectFlag ? null :
            <Image source={item.img} style={{ marginHorizontal: 10, width: 30, height: 30 }} />
        }
      </TouchableOpacity>
    )
  }


  onPressOpenFlat = () => {
    // console.log('this.state.opacityFlat', this.state.opacityFlat)
    if (this.state.isOpen == 1) {
      Animated.timing(this.state.opacityFlat, {
        toValue: 0.5,
        duration: 122,
        easing: Easing.linear,
      }).start(() => {
        Animated.timing(this.state.opacityFlat, {
          toValue: 1,
          duration: 122,
          easing: Easing.linear,
        }).start();
      })
      this.setState({ isOpen: 0 })
    } else {
      Animated.timing(this.state.opacityFlat, {
        toValue: 0,
        duration: 122,
        easing: Easing.linear,
      }).start(() => {
        Animated.timing(this.state.opacityFlat, {
          toValue: 0,
          duration: 122,
          easing: Easing.linear,
        }).start();
      })
      this.setState({ isOpen: 1 })
    }

  }

  render() {
    const { errorPassword, errorEmail, email, password } = this.state
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <StatusBar
            backgroundColor={colors.blue}
            barStyle="light-content"
          />
          {this.state.isLoading ? <ActivityIndicator /> : null}
          <View style={{ right: 10, marginTop: Platform.OS == 'android' ? 10 : 30, position: 'absolute', zIndex: 1 }}>
            <View style={{ flexDirection: 'row', height: 25 }}>
              <TouchableOpacity onPress={() => this.onPressOpenFlat()}>
                <Image source={this.state.selectFlag} style={{ marginHorizontal: 10, width: 30, height: 30, }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressOpenFlat()}>
                <Ionicons name='md-arrow-dropdown' size={25} />
              </TouchableOpacity>
            </View>
            <Animated.View style={[styles.menuStyle], { opacity: this.state.opacityFlat }}>
              <FlatList
                data={this.state.menu}
                renderItem={(item, index) => this._renderItem(item, index)}
              />
            </Animated.View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} >
            <KeyboardAvoidingView behavior="position">
              <View style={styles.contentLogin}>
                <View style={styles.header}>
                  <Image source={images.iconShop} resizeMode='contain' style={{ width: 150, height: 150, }} />
                  <Text style={styles.appName}>{I18n.t('appName')}</Text>
                </View>
                <View style={{ width: '80%', marginBottom: 5 }}>
                  <MyTextInput
                    label={I18n.t('pleaseInputEmailToLogin')}
                    error={this.state.errorEmail}
                    value={this.state.email}
                    inputTextIcon
                    image_name={images.icon_email}
                    maxLength={50}
                    textLeft={10}
                    labelLeft={30}
                    placeholderTextColor={colors.placeholderColor}
                    onChangeText={(text) => this.onChangeEmail(text)}
                  />
                </View>
                <View style={{ width: '80%' }}>
                  <MyTextInput
                    value={this.state.password}
                    label={I18n.t('pleaseInputPasswordToLogin')}
                    error={this.state.errorPassword}
                    inputTextIcon
                    image_name={images.icon_password}
                    maxLength={8}
                    textLeft={10}
                    labelLeft={30}
                    keyboardType='numeric'
                    secureTextEntry={true}
                    placeholderTextColor={colors.placeholderColor}
                    onChangeText={(text) => this.onChangePass(text)}
                  />
                </View>
                <CheckBox title={I18n.t('saveInfo')} containerStyle={styles.checkInfo}
                  onPress={() => this.onPressChecked()} checked={this.state.checked} />
                <MyButton
                  textButton={I18n.t('signIn')}
                  isDisable={(!email || errorEmail || !password || errorPassword) ? true : false}
                  onPress={() => this.onPressToHome()}
                />

                <TouchableOpacity onPress={() => this.onTouchID(true)} style={{ marginTop: 10 }}>
                  <Ionicons name={'md-finger-print'} color={colors.green} size={60} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => this.onPressRegister()} style={{ marginTop: 10, marginRight: 10 }}>
                    <Text>{I18n.t('register')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginTop: 10 }}>
                    <Text>/</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.onHelp()} style={{ marginTop: 10, marginLeft: 10 }}>
                    <Text>{I18n.t('help')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    userRegister: state.regInfo.userRegister,
    shopInfo: state.regInfo.shopInfo,
    actionType: state.login.actionType,
    responseCode: state.login.responseCode,
    responseDescription: state.login.responseDescription,
    api: state.api,
    versionUpdate: state.regInfo.versionUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkLogin: (data, isKeepLogin, ip) => dispatch(checkLogin(data, isKeepLogin, ip)),
    onPressLogin: (data, isKeepLogin, ip) => dispatch(onPressLogin(data, isKeepLogin, ip)),
    onCheckVersion: (lang, ip) => dispatch(onCheckVersion(lang, ip)),
    changeLocalLanguage: (lang) => dispatch(changeLocalLanguage(lang)),
    clearRegister: () => dispatch(clearRegister()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);