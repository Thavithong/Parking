import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { connect } from "react-redux";
import images from '../../themes/Image'
import styles from './style'
import colors from '../../themes/Colors'
import { Header } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import LeftComponent from '../../components/LeftComponent'
import { getTransaction, getReturnMoney } from '../../controller/TransactionController';
import ActivityIndicator from '../../components/ProgressBar/ActivityIndicator'
import UserAvatar from 'react-native-user-avatar'
import numeral from 'numeral'
import I18n from 'react-native-i18n'
import * as ERROR_CODE from '../../constants/errorCode'
import { REQUEST_TRANSACTION, REQUEST_TRANSACTION_SUCCESS, REQUEST_TRANSACTION_FAILED } from '../../constants/type'
import { transaction } from '../../actions/TransactionAction'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction_data: null,
            isLoading: true,
            totalAmount: 0,
            totalVehicle: 0,
            totalReturn: 0,
            totalNotPaid: 0,
            tvReturn: 0,
            tvNot: 0,
            tvPaid: 0,
            refresh: false,
        };
        this.initGetTransaction();
        this.sumAmount();
    }

    initGetTransaction = () => {
        getTransaction(this.props.login.shop_id, this.props.login.shop_email).then(({ result, message }) => this.setData(result));
    }

    setData(result) {
        if (result.length > 0) {
            this.setState({ transaction_data: result, refresh: false })
        } else {
            this.setState({ transaction_data: null, refresh: false })
        }
    }

    onRefresh = () => {
        this.setState({ refresh: true })
        this.initGetTransaction();
        this.sumAmount();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if (nextProps && nextProps.responseCode == ERROR_CODE.SUCCESS) {
                switch (nextProps.actionType) {
                    case REQUEST_TRANSACTION_SUCCESS:
                        this.setState({ isLoading: false })
                        Alert.alert(I18n.t('Info'), I18n.t('saveDataComplete', { success: nextProps.totalSuccess, total: nextProps.total, fail: nextProps.totalFalse }))
                        break;
                    default:
                        break;
                }
            } else {
                if (nextProps.actionType === REQUEST_TRANSACTION_FAILED) {
                    if (nextProps.responseCode === 10122) {
                        if (nextProps.total === nextProps.totalFalse) {
                            Alert.alert(I18n.t('error'), I18n.t('notSaveAll', { fail: nextProps.totalFalse }))
                        } else {
                            Alert.alert(I18n.t('error'), I18n.t('saveDataComplete', { success: nextProps.totalSuccess, total: nextProps.total, fail: nextProps.totalFalse }))
                        }
                        this.setState({ isLoading: false })
                    } else if (nextProps.responseCode === ERROR_CODE.CONECT_FAIL) {
                        Alert.alert(I18n.t('error'), I18n.t('99994'))
                        this.setState({ isLoading: false })
                    } else {
                        Alert.alert(I18n.t('error'), I18n.t('99999'))
                        this.setState({ isLoading: false })
                    }
                }
            }
        }
    }

    sumAmount = () => {
        setTimeout(() => {
            if (this.state.transaction_data != null) {
                let total = 0, totalVehicle = 0, totalReturn = 0, totalNotPaid = 0, tvReturn = 0, tvNot = 0, tvPaid = 0

                this.state.transaction_data.forEach(i => {
                    totalVehicle += 1
                    //paid
                    total += i.status == 1 ? i.amount : 0
                    tvPaid += i.status == 1 ? 1 : 0
                    //return                    
                    totalReturn += i.status == 3 ? i.amount : 0
                    tvReturn += i.status == 3 ? 1 : 0
                    //not paid
                    totalNotPaid += i.status == 2 ? i.amount : 0
                    tvNot += i.status == 2 ? 1 : 0
                });
                this.setState({
                    totalAmount: total,
                    totalVehicle: totalVehicle,
                    totalReturn: totalReturn,
                    totalNotPaid: totalNotPaid,
                    tvReturn: tvReturn,
                    tvNot: tvNot,
                    tvPaid: tvPaid,
                    isLoading: false
                })

            } else {
                this.setState({ isLoading: false })
            }
        }, 1000);
    }

    goBackFunction = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    setReturnMoney(result) {
        if (result.length > 0) {
            this.setState({ isReturn: true })
        } else {
            //transacrion
            if (this.state.transaction_data.length < 0) {
                Alert.alert(I18n.t('00001'))
                return
            }
            this.setState({ isLoading: true })
            let item = this.state.transaction_data;
            let value = []
            for (let i = 0; i < item.length; i++) {
                value.push({
                    trans_id: item[i].trans_id,
                    trans_date: item[i].trans_date,
                    amount: item[i].amount,
                    vehicle_id: item[i].vehicle_id,
                    vehicle_name: item[i].vehicle_name,
                    vehicle_number: item[i].vehicle_number,
                    user_id: item[i].user_id,
                    status: item[i].status,
                    trans_time: item[i].trans_time,
                    shop_id: item[i].shop_id,
                    shop_email: item[i].shop_email,
                    check_out_time: item[i].check_out_time,
                    trans_sate: item[i].trans_sate
                })
            }
            let data = { records: value }
            this.props.transaction(data, this.props.api.publicIp)
        }
    }

    onPressToStore = () => {
        getReturnMoney(this.props.login.shop_id, this.props.login.shop_email).then(({ result, message }) => this.setReturnMoney(result));
    }

    _renderItem(item, id) {
        return (
            <TouchableOpacity onPress={() => null} style={{ flex: 1, padding: 5, flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.borderColor }}>
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
                        <Text style={{ color: colors.blue, fontSize: 16, fontWeight: '300' }}>{I18n.t('billId')} : {item.trans_id}</Text>
                        <Text style={{ color: colors.blue, fontSize: 16, fontWeight: '300' }}> - {item.vehicle_name}</Text>
                        <Text style={{ color: colors.blue, fontSize: 16, fontWeight: '300' }}> - {item.vehicle_number}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, }}>
                        <Text style={{ fontSize: 16, flex: 1 }}>{item.trans_date} {item.trans_time}</Text>
                        <Text style={{ fontSize: 16, alignSelf: 'flex-end' }}>{item.trans_sate == 0 ? <Ionicons name={'ios-checkmark-circle-outline'} size={30} color={colors.buttonColor}/> : null}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { transaction_data } = this.state
        return (
            <View style={styles.container}>
                <Header
                    outerContainerStyles={styles.containHead}
                    leftComponent={<LeftComponent icons_name='ios-arrow-round-back' onPress={() => { this.goBackFunction() }} />}
                    centerComponent={{ text: I18n.t('report'), style: styles.head_text }}
                />
                {this.state.isLoading ? <ActivityIndicator /> : null}
                <View style={{ padding: 10, zIndex: -999 }}>
                    <View style={{ justifyContent: 'center', borderBottomWidth: 1, borderColor: colors.borderColor, padding: 5, flexDirection: 'row', paddingBottom: 8 }}>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={{ color: colors.black, fontSize: 18 }}> {I18n.t('total')} : {numeral(this.state.totalVehicle).format('0,0')}  {I18n.t('item')}</Text>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: colors.black, fontSize: 18 }}> {I18n.t('totalAmount')} :</Text>
                                <Text style={{ color: colors.green, fontSize: 18 }}> {this.state.totalAmount != null ? numeral(this.state.totalAmount).format('0,0') : numeral(this.state.totalAmount).format('0,0')}</Text>
                                <Text style={{ color: colors.green, fontSize: 18 }}> - {this.state.tvPaid} {I18n.t('item')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: colors.black, fontSize: 18 }}> {I18n.t('return_money')}  :</Text>
                                <Text style={{ color: colors.red, fontSize: 18 }}> {this.state.totalReturn != 0 || this.state.totalReturn != null ? numeral(this.state.totalReturn).format('0,0') : numeral(this.state.totalReturn).format('0,0')} </Text>
                                <Text style={{ color: colors.red, fontSize: 18 }}> - {this.state.tvReturn} {I18n.t('item')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: colors.black, fontSize: 18 }}> {I18n.t('notPaid')}  :</Text>
                                <Text style={{ color: colors.buttonColor, fontSize: 18 }}> {this.state.totalNotPaid != 0 || this.state.totalNotPaid != null ? numeral(this.state.totalNotPaid).format('0,0') : numeral(this.state.totalNotPaid).format('0,0')} </Text>
                                <Text style={{ color: colors.buttonColor, fontSize: 18 }}> - {this.state.tvNot} {I18n.t('item')}</Text>
                            </View>
                        </View>
                        <View style={{ borderRadius: 10, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.onPressToStore()}>
                                <MaterialCommunityIcons name='cloud-upload' size={70} color={colors.buttonColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        login: state.login.dataLogin,
        api: state.api,
        trans: state.trans,
        actionType: state.trans.actionType,
        responseCode: state.trans.responseCode,
        responseDescription: state.trans.responseDescription,
        total: state.trans.total,
        totalSuccess: state.trans.totalSucess,
        totalFalse: state.trans.totalFalse,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        transaction: (data, ip) => dispatch(transaction(data, ip)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Report);