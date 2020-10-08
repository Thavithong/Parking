import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import colors from '../../themes/Colors'
import images from '../../themes/Image'
import styles from './style'
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import I18n from 'react-native-i18n'
import Share from 'react-native-share'

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url_share: 'https://play.google.com/store/apps/details?id=com.th.indee.parking'
    };
  }

  goBackFunction = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  onShare = () => {
    try {
      const optionShare = {
        title: "Share your link",
        url: `${this.state.url_share}`
      };
      Share.open(optionShare);
    } catch (error) {
      console.log(error);
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          {/* <Image source={images.iconShop} resizeMode='contain' style={{ width: 150, height: 150, }} /> */}
          <ImageBackground source={images.iconShareIcon} style={styles.image} resizeMode={'cover'}>
            <TouchableOpacity style={{ position: 'absolute', left: 20, top: 10 }} onPress={() => this.goBackFunction()}>
              <Ionicons name={'ios-close'} size={50} color={colors.red} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.textInHeader}>{I18n.t('shareParking')}</Text>
        </View>
        <View style={styles.content}>
          <Text style={{ padding: 20, textAlign: 'center', fontSize: 14 }} numberOfLines={3}>{I18n.t('introLogin2')}</Text>
          <Text style={{ textAlign: 'center', paddingLeft: 10, paddingRight: 10, paddingBottom: 15, color: colors.buttonColor, fontSize: 14 }}>{I18n.t('shareYourLink')}</Text>
          <View style={styles.shareGroup}>
            <TextInput value={'https://parkingservice.app.link/cvm768gh'} style={styles.textInput} editable={false} />
            <TouchableOpacity style={styles.btnShare} onPress={() => this.onShare()}>
              <Ionicons name={'md-share'} size={30} color={colors.buttonColor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(index);
