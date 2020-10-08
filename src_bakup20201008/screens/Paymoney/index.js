import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, PermissionsAndroid, Image, Alert, Modal, FlatList, ToastAndroid, Vibration } from 'react-native';
import { connect } from "react-redux";
import colors from '../../themes/Colors'
import images from '../../themes/Image'
import styles from './style'
import { Header, CheckBox } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import LeftComponent from '../../components/LeftComponent'
import numeral from 'numeral'
import { insertTransaction, checkOutTransaction, checkTransaction, updateTransaction } from '../../controller/TransactionController';
import moment from "moment";
import ActivityIndicator from '../../components/ProgressBar/ActivityIndicator'
import { Root, Toast } from 'popup-ui'
import I18n from 'react-native-i18n'
import MyButton from '../../components/MyButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { isValidated } from '../../utils/Validate'
import { VALIDATE_NUMERIC } from '../../utils/Constant'

import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import ViewShot from "react-native-view-shot";
import RNFS from 'react-native-fs';
// import { QRCode } from 'react-native-custom-qr-codes';
import QRCode from 'react-native-qrcode-svg';
import { QRScannerView } from 'react-native-qrcode-scanner-view';

class Paymoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleId: null,
            vehicleName: "",
            vehiclePrice: "",
            vehicle_no: '',
            active: true,
            isLoading: false,
            paid_checked: true,
            not_paid_checked: false,
            modalVisible: false,
            provinceName: I18n.t('vientaine_capital'),
            errorVehicle: '',
            data: null,
            list: [
                { province_id: 1, province_name: 'ກຳແພງນະຄອນ' },
                { province_id: 2, province_name: 'ບໍລິຄຳໄຊ' },
                { province_id: 3, province_name: 'ຄໍາມ່ວນ' },
                { province_id: 4, province_name: 'ສະຫວັນນະເຂດ' },
                { province_id: 5, province_name: 'ແຂວງວຽງຈັນ' },
                { province_id: 6, province_name: 'ໄຊສົມບູນ' },
                { province_id: 7, province_name: 'ປາກເຊ' },
                { province_id: 8, province_name: 'ຈຳປາສັກ' },
                { province_id: 9, province_name: 'ເຊກອງ' },
                { province_id: 10, province_name: 'ອັດຕະປື' },
                { province_id: 11, province_name: 'ສາລະວັນ' },
                { province_id: 12, province_name: 'ຊຽງຂວາງ' },
                { province_id: 13, province_name: 'ຫົວພັນ' },
                { province_id: 14, province_name: 'ບໍແກ້ວ' },
                { province_id: 15, province_name: 'ໄຊຍະບູລີ' },
                { province_id: 16, province_name: 'ຫລວງນ້ໍາທາ' },
                { province_id: 17, province_name: 'ຫຼວງພະບາງ' },
                { province_id: 18, province_name: 'ອຸດົມໄຊ' },
            ],
            hideText: false,
            qrCodeInvoice: 'hello',
            invoiceTime: moment(new Date()).format("YYYY-MM-DD HH:MM:SS"),
            invoiceStatus: '',
            printState: false,
            hideBill: false,
            hideScanner: false,
            modalCheckout: false,
            vehicleNumber: null,
            amount: 0
        };
    }

    UNSAFE_componentWillMount() {
        console.log('login', this.props.login)
        console.log('shopInfo', this.props.shopInfo)
        const { params } = this.props.navigation.state
        this.setState({
            vehicleId: params.data.vehicle_id,
            vehicleName: params.data.vehicle_name,
            vehiclePrice: params.data.vehicle_price,
            data: this.state.list
        })
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


    goBackFunction = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    onTextChange(text) {
        let errorVehicle = text.length >= 4 ? null : 'must be 4 digit'
        let strText
        let status = isValidated(text, VALIDATE_NUMERIC)
        if (status == true) {
            if (text.length <= 4) {
                this.setState({ vehicle_no: text, errorVehicle })
            }
        } else {
            if (text.length == 2) {
                if (status == false) {
                    strText = text + " "
                    this.setState({ vehicle_no: strText, errorVehicle })
                }
            }
            else {
                this.setState({ vehicle_no: text, errorVehicle })
            }
        }
    }

    onPressToSave = async () => {
        this.setState({ isLoading: true })
        let status = 0;
        if (this.state.paid_checked == true && this.state.not_paid_checked == false) {
            status = 1; //ຈ່າຍແລ້ວ
        } else {
            status = 2; //ຍັງບໍ່ທັນຈ່າຍ
        }
        if (this.state.vehicle_no == null || this.state.vehicle_no == '') {
            Toast.show({
                title: I18n.t('error'),
                text: I18n.t('pleaseInputNumber'),
                color: colors.red,
                timing: 2000,
                icon: <Image source={images.iconError} style={{ width: 40, height: 40 }} resizeMode="contain" />
            })
            this.setState({ isLoading: false })
            return;
        }
        try {
            var date = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            var hours = new Date().getHours();
            var min = new Date().getMinutes();
            var sec = new Date().getSeconds();
            let invoiceNo = year + '' + month + date + '' + hours + '' + min + '' + sec
            let time = moment(new Date()).format("HH:mm:ss")
            let invoiceTime = moment(new Date()).format("YYYY-MM-DD") + " " + time
            insertTransaction(invoiceNo, moment(new Date()).format("YYYY-MM-DD"), this.state.vehiclePrice, this.state.vehicleId, this.state.vehicleName, this.state.vehicle_no, this.props.login.user_id, status, time, this.props.login.shop_id, this.props.login.shop_email).then(({ result, message }) => null);
            this.setState({ isLoading: false, qrCodeInvoice: invoiceNo, invoiceTime: invoiceTime, invoiceStatus: status == 1 ? I18n.t('paid') : I18n.t('notPaid'), printState: true })
            //print
            // this.refs.viewShot.capture().then(uri => {
            //     RNFS.readFile(uri, 'base64')
            //         .then(res => {
            //             this.printBill(res) // send to print
            //     });
            // })
        } catch (error) {
            this.setState({ isLoading: false })
            alert(error)
        }
    }

    async printBill(base64String) {
        try {
            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
            await BluetoothEscposPrinter.printPic(base64String, { width: 300, left: 40 });
            this.setState({ vehicle_no: '', printState: false })
        } catch (error) {
            alert(error)
        }
    }

    onPressPaidChecked = () => {
        this.setState({ paid_checked: true, not_paid_checked: false })
    }

    onPressNotPaidChecked = () => {
        this.setState({ not_paid_checked: true, paid_checked: false })
    }

    setModalVisible(visible) {
        if (visible) {
            this.setState({ list: this.state.data })
        }
        this.setState({ modalVisible: visible });
    }


    setModalCheckOut(visible) {
        this.setState({ modalCheckout: visible });
    }

    onSelectProvince = (item) => {
        this.setState({ modalVisible: false, provinceName: item.province_name });
    }

    _renderItem(item, id) {
        return (
            <TouchableOpacity onPress={() => this.onSelectProvince(item)} style={styles.groupRow}>
                <Text style={{ textAlign: 'center', width: 40, justifyContent: 'center' }}>{id + 1}</Text>
                <Text style={{ textAlign: 'center' }}>{item.province_name}</Text>
            </TouchableOpacity>
        )
    }

    onSearch = (e) => {
        let text = e.toLowerCase()
        let province = this.state.list
        let proName = province.filter((item) => {
            return item.province_name.toLowerCase().match(text)
        })
        if (!text || text === '') {
            this.setState({ list: this.state.data })
        } else {
            this.setState({ list: proName })
            if (proName.length == 0) {
                this.setState({ hideText: true })
            } else {
                this.setState({ hideText: false })
            }
            console.log('proName', proName.length)
        }
    }

    onClearText = () => {
        this.setState({ vehicle_no: '', printState: false, })
    }

    onPrint = () => {
        //capture to be image and than convert to base64
        this.refs.viewShot.capture().then(uri => {
            RNFS.readFile(uri, 'base64')
                .then(res => {
                    this.printBill(res) // send to print
                });
        })
    }

    renderTitleBar = () => {
        return (
            <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontSize: 16 }}>{I18n.t('headerScanner')}</Text>
        )
    }

    renderMenu = () => {
        return (
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity style={styles.btnExit} onPress={() => this.setState({ hideScanner: false })}>
                    <Ionicons name='ios-close' size={60} color={colors.red} />
                </TouchableOpacity>
            </View>
        )
    }

    //check out
    barcodeReceived = (event) => {
        if (event.data != null) {
            //1 still parking; 0 check out
            Vibration.vibrate(10 * 100)
            checkTransaction(event.data, this.props.login.shop_id, this.props.login.shop_email).then(({ result, message }) => this.checkOut(result, event.data));
        }
    };

    checkOut(result, trans_id) {
        if (result && result.length > 0) {
            let trans_state = result[0].trans_sate;
            if (trans_state == 0) {
                Alert.alert(I18n.t('Info'), I18n.t('alreadyCheckOut'))
            } else {
                //paid already can check out
                if (result[0].status == 1) {
                    checkOutTransaction(trans_id, this.props.login.shop_id, this.props.login.shop_email).then(({ result, message }) => this.resultCheckOut(result));
                } else if (result[0].status == 2) {
                    //not yet paid
                    this.setState({ modalCheckout: true, vehicleNumber: result[0].vehicle_number, amount: result[0].amount, trans_id: trans_id })
                }
            }
        } else {
            //not have in system
            Alert.alert(I18n.t('warning'), I18n.t('notHaveBill'))
        }
        this.setState({ hideScanner: false })
    }

    resultCheckOut(result) {
        console.log('my result', result)
        if (result && result.length > 0) {
            let status = result[0].status;
            if (status == true) {
                ToastAndroid.show(I18n.t('00000'), ToastAndroid.LONG);
            } else {
                ToastAndroid.show(I18n.t('10112'), ToastAndroid.LONG);
            }
        }
    }

    onPressSave = () => {
        //update status to be paid
        updateTransaction(1, this.state.trans_id, this.props.login.shop_id, this.props.login.shop_email).then(({ result, message }) => null);
        //check out
        checkOutTransaction(this.state.trans_id, this.props.login.shop_id, this.props.login.shop_email).then(({ result, message }) => this.resultCheckOut(result));
        this.setModalCheckOut(false)
    }

    onScanner = () => {
        this.setState({ hideScanner: true })
    }

    render() {
        return (
            <Root>
                <View style={styles.container}>
                    <Header
                        outerContainerStyles={styles.containHead}
                        leftComponent={<LeftComponent icons_name='ios-arrow-round-back' onPress={() => { this.goBackFunction() }} />}
                        centerComponent={{ text: I18n.t('parking_service'), style: styles.head_text }}
                        rightComponent={<LeftComponent icons_name='ios-pin' onPress={() => this.setModalVisible(true)} />}
                    />
                    {this.state.isLoading ? <ActivityIndicator /> : null}

                    {
                        this.state.hideScanner == false ?
                            <View style={styles.titleInput}>
                                <View style={styles.carNumber}>
                                    <Text style={styles.textInputStyle}>{this.state.provinceName}</Text>
                                    <Text style={styles.textInputStyle}>{this.state.vehicle_no == '' ? "ກກ xxxx" : this.state.vehicle_no}</Text>
                                </View>
                                <View style={{ paddingBottom: 10, flexDirection: 'row', margin: 5 }}>
                                    <Text style={styles.textInputStyle}>{this.state.vehicleName}</Text>
                                    <Text style={styles.textInputStyle}> - {I18n.t('price')} {numeral(this.state.vehiclePrice).format('0,0')}</Text>
                                </View>
                                <View style={[styles.inputVehicle, { flexDirection: 'row' }]}>
                                    <TextInput value={this.state.vehicle_no} placeholder={'ກກ 0000'} maxLength={7}
                                        style={{ flex: 1, textAlign: 'center', fontSize: 20, }}
                                        onChangeText={(text) => this.onTextChange(text)} />
                                    <TouchableOpacity onPress={() => this.onClearText()} style={{ marginRight: 10, justifyContent: 'center' }}>
                                        {
                                            this.state.vehicle_no.length > 0 ?
                                                <Ionicons name='ios-close' size={40} color={colors.buttonColor} style={{ alignItems: 'center' }} />
                                                : null
                                        }

                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: 'row', margin: 5 }}>
                                    <CheckBox title={I18n.t('paid')} containerStyle={styles.checkBox} onPress={() => this.onPressPaidChecked()} checked={this.state.paid_checked} />
                                    <CheckBox title={I18n.t('notPaid')} containerStyle={styles.checkBox} onPress={() => this.onPressNotPaidChecked()} checked={this.state.not_paid_checked} />
                                </View>
                                {
                                    this.state.printState ?
                                        <MyButton
                                            textButton={I18n.t('print')}
                                            isDisable={false}
                                            myBackground={colors.headerColor}
                                            onPress={() => this.onPrint()}
                                        />
                                        :
                                        <MyButton
                                            textButton={I18n.t('save')}
                                            isDisable={(!this.state.vehicle_no || this.state.errorVehicle) ? true : false}
                                            onPress={() => this.onPressToSave()}
                                        />
                                }

                                {
                                    this.state.printState ?
                                        <View style={{ opacity: 1 }}>
                                            {/* setup page of bill */}
                                            <ViewShot ref="viewShot" options={{ format: "png", quality: 0.9 }}>
                                                <Text style={{ textAlign: 'center', backgroundColor: 'white', fontSize: 20 }}>{this.props.shopInfo.shop_name}</Text>
                                                <Text style={{ textAlign: 'center', backgroundColor: 'white', fontWeight: 'bold', fontSize: 30 }}>{I18n.t('invoice')}</Text>
                                                <Text style={{ textAlign: 'center', backgroundColor: 'white', fontSize: 20 }}>{this.state.provinceName}</Text>
                                                <Text style={{ textAlign: 'center', backgroundColor: 'white', fontSize: 20 }}>{this.state.vehicle_no}</Text>
                                                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', }}>
                                                    {/* <QRCode content={this.state.qrCodeInvoice} size={150} /> */}
                                                    <QRCode value={this.state.qrCodeInvoice} />
                                                </View>
                                                <Text style={{ textAlign: 'center', backgroundColor: 'white', fontSize: 20 }}>{this.state.qrCodeInvoice}</Text>
                                                <Text style={{ textAlign: 'center', backgroundColor: 'white', fontSize: 20 }}>{this.state.invoiceStatus}</Text>
                                                <Text style={{ textAlign: 'center', backgroundColor: 'white', fontSize: 14 }}>{this.state.invoiceTime}</Text>
                                            </ViewShot>
                                        </View>
                                        : null
                                }
                            </View>
                            :
                            <View style={{ flex: 1 }}>
                                <QRScannerView
                                    onScanResult={this.barcodeReceived}
                                    renderHeaderView={this.renderTitleBar}
                                    renderFooterView={this.renderMenu}
                                    hintText={true}
                                    cornerStyle={{ borderColor: colors.buttonColor }}
                                    rectStyle={{ borderColor: colors.buttonColor }}
                                    scanBarAnimateReverse={true} />
                            </View>
                    }
                    {
                        //scanner button 
                        this.state.hideScanner == false ?
                            <TouchableOpacity style={styles.btnScanner} onPress={() => this.onScanner()} >
                                <MaterialCommunityIcons name='qrcode-scan' size={60} color={colors.buttonColor} />
                            </TouchableOpacity>
                            : null
                    }
                </View>

                {/* paid money before check-out */}
                <Modal animationType="slide" transparent={true} visible={this.state.modalCheckout}
                    onRequestClose={() => {
                        this.setModalCheckOut(!this.state.modalCheckout)
                    }}>
                    <View style={styles.modalCheckOut}>
                        <View style={styles.modalContentCheckOut}>
                            <View style={styles.headModalCheckOut}>
                                <Text style={styles.confirm}>
                                    {I18n.t('confirm')}
                                </Text>
                            </View>
                            <View style={styles.contentCheckOut} >
                                <Text style={[styles.textContentCheckOut, { fontWeight: '500' }]}>{I18n.t('pleasePaidMoney')}</Text>
                                <Text style={styles.textContentCheckOut}>- {I18n.t('type_')} : {this.state.vehicleName}</Text>
                                <Text style={styles.textContentCheckOut}>- {I18n.t('car_sign')} : {this.state.vehicleNumber}</Text>
                                <Text style={styles.textContentCheckOut}>- {I18n.t('amount')} : {numeral(this.state.amount).format('0,0')}</Text>
                            </View>
                            <View style={styles.btnGroupCheckOut} >
                                <View style={{ flex: 1 }}></View>
                                <TouchableOpacity style={[styles.btnButtonCheckOut, { backgroundColor: 'red' }]} onPress={() => { this.setModalCheckOut(!this.state.modalCheckout) }} >
                                    <Text style={styles.btnText}>{I18n.t('close')}</Text>
                                </TouchableOpacity>
                                <Text>  </Text>
                                <TouchableOpacity style={[styles.btnButtonCheckOut, { backgroundColor: colors.buttonColor }]} onPress={() => { this.onPressSave() }} >
                                    <Text style={styles.btnText}>{I18n.t('save')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* search province */}
                <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible)
                    }}>
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <View style={styles.headModal}>
                                <TouchableOpacity style={styles.close} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                    <Ionicons name='ios-close' size={45} />
                                </TouchableOpacity>
                                <Text style={styles.titleModal}>{I18n.t('province')}</Text>
                            </View>
                            <View style={{ marginLeft: 15, marginRight: 15 }}>
                                <View style={styles.search}>
                                    <TextInput autoFocus={true} placeholder='Enter text search ...' style={{ marginLeft: 10 }} onChangeText={(text) => this.onSearch(text)} />
                                </View>
                            </View>
                            <View style={styles.listStyle}>
                                {
                                    this.state.vehicle_no.hideText == true ? <Text style={styles.noDataFound}>{I18n.t('noDataFound')}</Text>
                                        :
                                        <FlatList style={{ flex: 1, marginLeft: 15, marginRight: 15, marginBottom: 15, marginTop: 5 }}
                                            data={this.state.list}
                                            renderItem={({ item, index }) => this._renderItem(item, index)}
                                            keyExtractor={(item, index) => item.province_id.toString()}
                                        />
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
            </Root>
        );
    }

}

const mapStateToProps = state => {
    return {
        login: state.login.dataLogin,
        trans: state.trans,
        shopInfo: state.regInfo.shopInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Paymoney);