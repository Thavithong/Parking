import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, Modal, Platform, Linking, PermissionsAndroid, Image, StyleSheet } from 'react-native';
import { CustomNavbar } from '../../components/'
import colors from '../../themes/Colors'
import images from '../../themes/Image'
import styles from './style'
import { connect } from "react-redux";
import ActivityIndicator from '../../components/ProgressBar/ActivityIndicator'
import { NavigationActions } from 'react-navigation'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { getAllVehicle } from '../../controller/VehicleController';
import Vehicle from '../../model/Vehicle'
import I18n from 'react-native-i18n'
import * as ERROR_CODE from '../../constants/errorCode'
import Swiper from 'react-native-swiper'
class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: false,
      header: <CustomNavbar txtTitle={I18n.t('home')} rightTitle={"logout"} isHome={true} onPressLogout={() =>
        navigation.dispatch(NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
        }))}
        onPressLeft={() => navigation.navigate('DrawerOpen')}
      />
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      vehicle_data: [],
      vehicle: new Vehicle(),
      updateType: 0,
      isVisible: false,
      data: [
        { id: 1, key: "Report", name: I18n.t('report'), img: images.iconChart },
        { id: 2, key: "ReturnMoney", name: I18n.t('return_money'), img: images.iconRevertMoney },
        { id: 3, key: "Payment", name: I18n.t('payment'), img: images.iconPayment },
        { id: 4, key: "Profile", name: I18n.t('profile'), img: images.iconProfile },
        { id: 5, key: "Share", name: I18n.t('share'), img: images.iconShare },
        { id: 6, key: "Paymoney", name: I18n.t('parking_service'), img: images.iconLocation },
      ],
    };
    // this.initListVehicle();
  }

  componentWillMount() {
    console.log('this.props.versionUpdate', this.props.versionUpdate)
    if (this.props.versionUpdate != null) {
      if (Platform.OS == 'android') {
        if (ERROR_CODE.VERSION_ANDROID < this.props.versionUpdate[0].version_android) {
          this.setState({ isVisible: true, title: this.props.versionUpdate[0].version_title, content: this.props.versionUpdate[0].version_description })
        }
      }
    }
  }



  componentDidMount() {
    this.checkPermission()
  }

  checkPermission() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
      ).then((result) => {
        if (result['android.permission.CAMERA']
          && result['android.permission.READ_EXTERNAL_STORAGE']
          && result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
        }
      });
    }
  }


  initListVehicle = () => {
    getAllVehicle().then(({ result, message }) => this.setState({ vehicle_data: result }));
    setTimeout(() => {
      if (this.state.vehicle_data != null) {
        this.setState({ isLoading: false })
      } else {
        this.setState({ isLoading: false })
      }
    }, 1000);
  }

  onPressNavigate(item) {
    // this.props.navigation.navigate('Paymoney', { data: item })
    switch (item.id) {
      case 1:
        this.props.navigation.navigate('Report', { data: null })
        break
      case 2:
        this.props.navigation.navigate('ReturnMoney', { data: item })
        break
      case 3:
        this.props.navigation.navigate('Payment', { data: item })
        break
      case 4:
        this.props.navigation.navigate('Shop', { data: item })
        break
      case 5:
        this.props.navigation.navigate('Share', { data: item })
        break
      case 6:
        this.props.navigation.navigate('Vehicle', { data: item })
        break
      default:
        break;
    }
  }

  _renderItem(item, id) {
    return (
      <TouchableOpacity onPress={() => this.onPressNavigate(item)} style={styles.vihecleStyle}>
        <View style={{ justifyContent: 'center', justifyContent: 'center', marginTop: 10 }}>
          <Image source={item.img} style={{ width: 80, height: 80 }} />
        </View>
        <Text style={styles.productNameStyle}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  onPressUpdate = () => {
    this.setState({ isVisible: false })
    // let url = null
    // if (Platform.OS === 'android') {
    //   url = "https://play.google.com/store/apps/details?id=com.umoney.eu&hl=en"
    // }
    // Linking.canOpenURL(url).then(supported => {
    //   if (supported) {
    //     Linking.openURL(url);
    //   } else {
    //     console.log('Don\'t know how to open URI');
    //   }
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.blue}
          barStyle="light-content"
        />
        {this.state.isLoading ? <ActivityIndicator /> : null}
        <FlatList style={{ flex: 1, marginLeft: 10, marginRight: 10, marginTop: 10 }}
          data={this.state.data}
          renderItem={({ item, index }) => this._renderItem(item, index)}
          numColumns={3}
        />

        {/* slide show */}
        <View style={{ height: 200, width: '100%', padding: 10, borderRadius: 10 }}>
          <Swiper style={myStyle.wrapper} autoplay={true}>
            <View style={myStyle.slide1}>
              <Text style={myStyle.text}>{I18n.t('slogan')}</Text>
            </View>
            <View style={myStyle.slide2}>
              <Text style={myStyle.text}>{I18n.t('fast_salongan')}</Text>
            </View>
            <View style={myStyle.slide3}>
              <Text style={myStyle.text}>{I18n.t('pay_easily')}</Text>
            </View>
          </Swiper>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isVisible}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
          onRequestClose={() => {

          }}>
          <View style={styles.updateModal}>
            <View style={styles.updateContent}>
              <View style={styles.updateDetail}>
                <Text style={styles.updateTitle} numberOfLines={2}>
                  {this.state.title}
                </Text>
                <Text numberOfLines={5} numberOfLines={5} style={{ textAlign: 'center', padding: 10 }}>
                  {this.state.content}
                </Text>
              </View>
              <View style={styles.updateBtnGroup}>
                <TouchableOpacity style={styles.btnUpdateStyle} onPress={() => this.setState({ isVisible: false })}>
                  <Text style={styles.btnTextUpdate}>{I18n.t('later')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnUpdateStyle, { borderLeftWidth: this.state.updateType == 0 ? Platform.OS == 'android' ? 1 : 2 : 0, borderColor: colors.borderColor, width: this.state.updateType == 0 ? '50%' : '100%' }]}
                  onPress={() => this.onPressUpdate()}>
                  <Text style={styles.btnTextUpdate}>{I18n.t('update')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}


const myStyle = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    borderRadius: 10
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
    borderRadius: 10
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
    borderRadius: 10
  },
  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  }
})

const mapStateToProps = state => {
  return {
    login: state.login.dataLogin,
    api: state.api,
    versionUpdate: state.regInfo.versionUpdate,
    responseCode: state.regInfo.responseCode,
    responseDescription: state.regInfo.responseDescription,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // checkVersion: (lang, ip) => dispatch(checkVersion(lang, ip)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);