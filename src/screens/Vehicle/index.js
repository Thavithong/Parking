import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
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
import LeftComponent from '../../components/LeftComponent'
import { Header } from 'react-native-elements'
import * as ERROR_CODE from '../../constants/errorCode'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            vehicle_data: [],
            vehicle: new Vehicle(),
            updateType: 0,
            isVisible: false,
        };
        this.initListVehicle();
    }

    goBackFunction = () => {
        this.props.navigation.dispatch(NavigationActions.back())
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
        this.props.navigation.navigate('Paymoney', { data: item })
    }

    _renderItem(item, id) {
        return (
            <TouchableOpacity onPress={() => this.onPressNavigate(item)} style={styles.vihecleStyle}>
                <View style={{ height: 110, justifyContent: 'center', justifyContent: 'center' }}>
                    <Fontisto name={item.vehicle_id == 1 ? 'car' : 'motorcycle'} size={item.vehicle_id == 1 ? 120 : 100} color={colors.buttonColor} />
                </View>
                <Text style={styles.productNameStyle}>{item.vehicle_name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    outerContainerStyles={styles.containHead}
                    leftComponent={<LeftComponent icons_name='ios-arrow-round-back' onPress={() => { this.goBackFunction() }} />}
                    centerComponent={{ text: I18n.t('parking_service'), style: styles.head_text }}
                />
                {this.state.isLoading ? <ActivityIndicator /> : null}
                <FlatList style={{ flex: 1, marginLeft: 10, marginRight: 10 }}
                    data={this.state.vehicle_data}
                    renderItem={({ item, index }) => this._renderItem(item, index)}
                    keyExtractor={(item, index) => item.vehicle_id.toString()}
                    numColumns={2}
                />

                {/* <TouchableOpacity style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 15,
                    backgroundColor: colors.buttonColor,
                    borderRadius: 25,
                    width: 50,
                    height:50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ color: colors.white, textAlign: 'center' }}>Open</Text>
                </TouchableOpacity> */}

                

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

const myStyles = {
    container: {
        flex: 1,
        zIndex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dragHandler: {
        alignSelf: 'stretch',
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc'
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index);
