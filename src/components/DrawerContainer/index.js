import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, ScrollView, FlatList, Image } from 'react-native';
import styles from './style'
import images from '../../themes/Image'
import { connect } from "react-redux";
import { onPressLogin, saveProfile } from '../../actions/LoginAction'
import { NavigationActions } from 'react-navigation'
import UserAvatar from 'react-native-user-avatar'
import Fontisto from 'react-native-vector-icons/Fontisto'
import colors from '../../themes/Colors';
import ImagePicker from 'react-native-image-crop-picker';
import I18n from 'react-native-i18n'
// import { Shapes } from "react-native-background-shapes";

const data = [
  { id: 1, key: "Home", name: I18n.t('home'), img: 'home' },
  { id: 2, key: "Report", name: I18n.t('report'), img: 'wallet' },
  { id: 3, key: "ReturnMoney", name: I18n.t('return_money'), img: 'money-symbol' },
  { id: 4, key: "Payment", name: I18n.t('payment'), img: 'shopping-sale' },
  { id: 5, key: "Setting", name: I18n.t('setting'), img: 'player-settings' },
  { id: 6, key: "Logout", name: I18n.t('signOut'), img: 'close' }
]

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: null,
      phone: null,
      sex: null,
      imagePath: null,
      hider: false,
      data: [
        { id: 1, key: "Home", name: I18n.t('home'), img: images.iconHome },
        { id: 2, key: "Report", name: I18n.t('report'), img: images.iconReport },
        { id: 3, key: "ReturnMoney", name: I18n.t('return_money'), img: images.iconRevertMoney },
        { id: 4, key: "Payment", name: I18n.t('payment'), img: images.iconPayment },
        { id: 6, key: "Profile", name: I18n.t('profile'), img: images.iconProfile },
        { id: 7, key: "Help", name: I18n.t('help'), img: images.iconHelp },
        { id: 5, key: "Setting", name: I18n.t('setting'), img: images.iconSetting },
        { id: 8, key: "Logout", name: I18n.t('signOut'), img: images.iconExit }
      ]
    };
  }


  UNSAFE_componentWillMount() {
    // console.log("componentWillMount Drawer Login : ", this.props.image_url)
    this.setState({
      fullname: this.props.login.user_name
    })
    if (this.props.image_url != null) {
      this.setState({ imagePath: this.props.image_url })
    }
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
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

  navigateScreen(item) {
    switch (item.id) {
      case 1:
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'drawerStack' })]
        })
        this.props.navigation.dispatch(resetAction)
        break
      case 2:
        this.props.navigation.navigate('Report', { data: '0' })
        break
      case 3:
        this.props.navigation.navigate('ReturnMoney', { data: item })
        break
      case 4:
        this.props.navigation.navigate('Payment', { data: item })
        break
      case 5:
        this.props.navigation.navigate('Setting', { data: item })
        break
      case 6:
        this.props.navigation.navigate('Shop', { data: item })
        break
      case 7:
        this.props.navigation.navigate('Help', { data: item })
        break
      default:
        const actionToDispatch = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
        })
        this.props.navigation.dispatch(actionToDispatch)
        break;
    }
  }

  _renderItem(item) {
    return (
      <TouchableOpacity style={styles.rowItem} onPress={() => this.navigateScreen(item)}>
        <Image source={item.img} style={styles.iconStyle} />
        <Text style={styles.txtItem}>{item.name}</Text>
      </TouchableOpacity>
    )
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

  renderImage(image) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={image} style={{ width: 150, height: 150, borderRadius: 150 / 2, borderColor: colors.white, borderWidth: 1 }} />
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
    return (
      <View style={styles.container}>
        <View style={{ paddingBottom: 0, }}>
          <View style={styles.headDrawer}>
            <TouchableOpacity onPress={() => null}>
              {this.state.imagePath ? this.renderImage(this.state.imagePath) : this.renderSelect()}
              <Text style={styles.txtName} numberOfLines={2}>{this.props.login.user_name.charAt(0).toUpperCase() + this.props.login.user_name.slice(1)}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View>
            <FlatList
              style={styles.flatListStyle}
              data={this.state.data}
              scrollEnabled={false}
              renderItem={({ item }) => this._renderItem(item)}
            />
          </View>
        </ScrollView>
        <View style={styles.warpViettel}>
          <View>
            <Text style={styles.txtViettel}>{I18n.t('copyRight')}</Text>
            <Text style={styles.txtVersion}>{I18n.t('versionName')}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    loginData: state.login,
    login: state.login.dataLogin,
    image_url: state.login.image_url,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPressLogin: (data) => dispatch(onPressLogin(data)),
    saveProfile: (image_url) => dispatch(saveProfile(image_url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
