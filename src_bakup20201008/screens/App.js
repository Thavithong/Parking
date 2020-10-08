import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux' // ຕ້ອງມີການເຊື່ອມຕໍ່
import PrimaryNav from '../routers/PrimaryNav'
import { onPressLogin } from '../actions/LoginAction'
// import PushNotification from 'react-native-push-notification'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // async componentDidMount() {
    //     PushNotification.configure({
    //       onNotification: function (notification) {
    //         console.log('NOTIFICATION:', notification);
    //       },
    //     });
    //   }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <PrimaryNav initialRouteName='Drawer' />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login.dataLogin,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPressLogin: (data) => dispatch(onPressLogin(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App)