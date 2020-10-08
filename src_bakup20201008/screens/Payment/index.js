import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, ToastAndroid, Animated, Easing, TextInput } from 'react-native';
import { connect } from "react-redux";
import styles from './style'
import colors from '../../themes/Colors'
import { Header } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import ActivityIndicator from '../../components/ProgressBar/ActivityIndicator'
import LeftComponent from '../../components/LeftComponent'
import { getPaymentTransaction, updateTransaction, insertReturnMoney } from '../../controller/TransactionController';
import UserAvatar from 'react-native-user-avatar'
import { Root, Popup, Toast } from 'popup-ui'
import moment from "moment";
import numeral from 'numeral'
import I18n from 'react-native-i18n'
import Ionicons from 'react-native-vector-icons/Ionicons'

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction_data: null,
            tempData: null,
            isLoading: false,
            modalVisible: false,
            trans_id: '',
            vehicleName: '',
            vehicleNumber: '',
            amount: '',
            vehicleId: '',
            refresh: false,
            opacityValue: new Animated.Value(0),
            visibleSearch: false
        };
        this.initGetTransaction();
    }

    initGetTransaction = () => {
        this.setState({ isLoading: true })
        getPaymentTransaction(this.props.login.shop_id, this.props.login.shop_email).then(({ result, message }) => this.setData(result));
    }

    setData(result) {
        if (result.length > 0) {
            this.setState({ transaction_data: result, isLoading: false, refresh: false, tempData: result })
        } else {
            this.setState({ transaction_data: null, isLoading: false, refresh: false , tempData: null})
        }
    }

    onRefresh = () => {
        this.setState({ refresh: true })
        this.initGetTransaction();
    }

    goBackFunction = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    confirm = (item) => {
        if (item.status == 2) {
            this.setModalVisible(true)
            this.setState({ trans_id: item.trans_id, vehicleName: item.vehicle_name, amount: item.amount, vehicleNumber: item.vehicle_number, vehicleId: item.vehicle_id })
        }
    }

    onPressSave = () => {
        if (this.props.login.shop_email == null) {
            Toast.show({
                title: I18n.t('error'),
                text: I18n.t('invalidFormatEmail'),
                color: colors.red,
                timing: 2000,
                icon: <Image source={images.iconError} style={{ width: 40, height: 40 }} resizeMode="contain" />
            })
            return;
        }
        updateTransaction(1, this.state.trans_id, this.props.login.shop_id, this.props.login.shop_email).then(({ result, message }) => null);
        this.setModalVisible(false)
        this.initGetTransaction();
    }


    onShow = () => {
        Animated.timing(this.state.opacityValue, {
            toValue: 0.5,
            duration: 112,
            easing: Easing.linear,
        }).start(() => {
            this.setState({
                visibleSearch: true
            })
            this.refs.Search.focus();
            Animated.timing(this.state.opacityValue, {
                toValue: 1,
                duration: 112,
                easing: Easing.linear,
            }).start();
        });
    }

    onHide = () => {
        Animated.timing(this.state.opacityValue, {
            toValue: 0.5,
            duration: 112,
            easing: Easing.linear,
        }).start(() => {
            this.setState({
                visibleSearch: false,
                transaction_data: this.state.tempData
            })
            Animated.timing(this.state.opacityValue, {
                toValue: 0,
                duration: 112,
                easing: Easing.linear,
            }).start();
        });
    }

    onSearch = (text) => {
        if(this.state.transaction_data == null){
            return
        }
        const newData = this.state.transaction_data.filter(item => {
            const itemData = item.vehicle_number.toUpperCase()
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        if (text === '') {
            this.setState({ transaction_data: [...this.state.tempData] });
        } else {
            this.setState({ transaction_data: newData });
        }
    }

    _renderItem(item, id) {
        return (
            <TouchableOpacity onPress={() => this.confirm(item)} style={{ flex: 1, padding: 5, flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.borderColor, }}>
                <View style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}>
                    <UserAvatar size={60} name={item.vehicle_number.replace(" ", "")} />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ color: colors.black, fontSize: 18, fontWeight: '400' }}>{item.status == 1 ? I18n.t('paid') : item.status == 2 ? I18n.t('notPaid') : I18n.t('return_money')}</Text>
                        <Text style={{ flex: 1 }}> </Text>
                        <Text style={{ fontSize: 20, fontWeight: '400', color: item.status == 1 ? colors.green : item.status == 2 ? colors.buttonColor : colors.red }}>
                            {item.status == 1 ? "+" + numeral(item.amount).format('0,0') : item.status == 2 ? "+" + numeral(item.amount).format('0,0') : "-" + numeral(item.amount).format('0,0')}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, marginBottom: 5 }}>
                        <Text style={styles.textDetail}>{I18n.t('billId')} : {item.trans_id}</Text>
                        <Text style={styles.textDetail}>- {item.vehicle_name}</Text>
                        <Text style={styles.textDetail}> - {item.vehicle_number}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ fontSize: 16 }}>{item.trans_date} {item.trans_time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { transaction_data, visibleSearch } = this.state
        return (
            <Root>
                <View style={styles.container}>
                    {visibleSearch == false ?
                        <Header
                            outerContainerStyles={styles.containHead}
                            leftComponent={<LeftComponent icons_name='ios-arrow-round-back' onPress={() => { this.goBackFunction() }} />}
                            centerComponent={{ text: I18n.t('payment'), style: styles.head_text }}
                            rightComponent={<LeftComponent iconSize={35} icons_name='ios-search' onPress={() => { this.onShow() }} />}
                        />
                        :
                        <Animated.View style={[styles.headAnimate, { opacity: this.state.opacityValue }]}>
                            <TouchableOpacity style={{ marginLeft: 10, marginRight: 10, width: 30, alignItems: 'center' }} onPress={() => this.onHide()}>
                                <Ionicons name='ios-arrow-round-back' size={40} color='black' style={{ alignItems: 'center', }} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, }}>
                                <TextInput
                                    style={{ flex: 1, 
                                        // color: 'white', 
                                        fontSize: 16 
                                    }}
                                    placeholder={I18n.t('search')}
                                    ref='Search'
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor={'black'}
                                    onChangeText={(text) => this.onSearch(text)}
                                />
                            </View>
                        </Animated.View>
                    }
                    {this.state.isLoading ? <ActivityIndicator /> : null}
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {
                            transaction_data == null ?
                                <Text style={styles.noDataFound}>{I18n.t('noDataFound')}</Text>
                                : <FlatList style={{ flex: 1, margin: 10 }}
                                    data={transaction_data}
                                    renderItem={({ item, index }) => this._renderItem(item, index)}
                                    keyExtractor={(item, index) => item.trans_id.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    extraData={Object.assign(this.props)}
                                    refreshing={this.state.refresh}
                                    onRefresh={this.onRefresh}
                                />
                        }
                    </View>
                    <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible)
                        }}>
                        <View style={styles.modal}>
                            <View style={styles.modalContent}>
                                <View style={styles.headModal}>
                                    <Text style={styles.confirm}>
                                        {I18n.t('confirm')}
                                    </Text>
                                </View>
                                <View style={styles.content} >
                                    <Text style={[styles.textContent, { fontWeight: '500' }]}>{I18n.t('pleasePaidMoney')}</Text>
                                    <Text style={styles.textContent}>- {I18n.t('type_')} : {this.state.vehicleName}</Text>
                                    <Text style={styles.textContent}>- {I18n.t('car_sign')} : {this.state.vehicleNumber}</Text>
                                    <Text style={styles.textContent}>- {I18n.t('amount')} : {numeral(this.state.amount).format('0,0')}</Text>
                                </View>
                                <View style={styles.btnGroup} >
                                    <View style={{ flex: 1 }}></View>
                                    <TouchableOpacity style={[styles.btnButton, { backgroundColor: 'red' }]} onPress={() => { this.setModalVisible(!this.state.modalVisible) }} >
                                        <Text style={styles.btnText}>{I18n.t('close')}</Text>
                                    </TouchableOpacity>
                                    <Text>  </Text>
                                    <TouchableOpacity style={[styles.btnButton, { backgroundColor: colors.buttonColor }]} onPress={() => { this.onPressSave() }} >
                                        <Text style={styles.btnText}>{I18n.t('save')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </Root >
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login.dataLogin,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};
export default connect(mapStateToProps, null)(Payment);