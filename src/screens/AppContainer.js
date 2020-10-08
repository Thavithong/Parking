import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux' // ຕ້ອງມີການເຊື່ອມຕໍ່
import PrimaryNav from '../routers/PrimaryNav'
import LoginStack from '../routers/LoginStack'
import I18n from '../i81n/I18n'
import { onPressLogin } from '../actions/LoginAction'


class AppContainer extends Component {
  constructor(props) {
    super(props)
    let language = 'lo'
    if (props.localLanguage) {
      language = props.localLanguage;
    }
    I18n.defaultLocale = language || 'lo'
    I18n.locale = language || 'lo'
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LoginStack />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login.dataLogin,
    localLanguage: state.login.localLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPressLogin: (data) => dispatch(onPressLogin(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)