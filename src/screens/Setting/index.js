import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Alert,
    Platform,
    TouchableOpacity,
    ToastAndroid,
    AsyncStorage,
    Image,
    DeviceEventEmitter,
    NativeEventEmitter,
    FlatList,
    ScrollView,
} from 'react-native';
import { Header } from 'react-native-elements'
import LeftComponent from '../../components/LeftComponent'
import colors from '../../themes/Colors'
import styles from './style'
import { connect } from "react-redux";
import ActivityIndicator from '../../components/ProgressBar/ActivityIndicator'
import { NavigationActions } from 'react-navigation'
import ToggleSwitch from 'toggle-switch-react-native'
import I18n from 'react-native-i18n'
import { setupIp, clearIp } from '../../actions/ApiAction'
import { onSetupPrinter } from '../../actions/TransactionAction'
import TouchID from 'react-native-touch-id';
import * as Constant from '../../utils/Constant'
import images from '../../themes/Image'
// import MyTextInput from '../../components/MyTextInput'
import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

class Setting extends Component {

    _listeners = [];
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isTogBiometric: false,
            isToggleOnline: false,
            isTogShop: false,
            isTogPrinter: false,
            publicIp: null,
            allowTouchId: false,
            touchPhone: null,
            isSupport: false,

            //printer
            devices: null,
            pairedDevice: [],
            foundDs: [],
            bleOpend: false,
            loading: true,
            boundAddress: '',
            debugMsg: '',
            stateConn: false
        };
    }

    componentWillMount() {
        if (this.props.api.publicIp != null) {
            this.setState({ publicIp: this.props.api.publicIp, isToggleOnline: true })
        }
        if (this.props.shopInfo) {
            this.setState({ shopId: this.props.shopInfo.shop_id, shopEmail: this.props.shopInfo.shop_email })
        }
        this.checkRememberTouch()
        // console.log('user login', this.props.login)
    }

    //init setup printer
    componentDidMount() {
        BluetoothManager.isBluetoothEnabled().then((enabled) => {
            this.setState({
                bleOpend: Boolean(enabled),
                loading: false,
            })
            if (enabled == true) {
                try {
                    // console.log('trans', this.props.trans)
                    this.setState({ isTogPrinter: true })
                    const { trans } = this.props
                    if (trans.dataPrinter != null && trans.dataPrinter != undefined) {
                        this.setState({
                            printerName: trans.dataPrinter.printerName,
                            boundAddress: trans.dataPrinter.boundAddress,
                            stateConn: true
                        })
                    }
                    BluetoothManager.scanDevices()
                        .then((s) => {
                            var ss = s;
                            var found = ss.found;
                            try {
                                found = JSON.parse(found);
                            } catch (e) {
                                //ignore
                            }
                            var fds = this.state.foundDs;
                            if (found && found.length) {
                                fds = found;
                            }
                            this.setState({ foundDs: fds, loading: false });
                        }, (er) => {
                            this.setState({ loading: false })
                            alert('error' + JSON.stringify(er));
                        });
                } catch (err) {
                    alert(err)
                }
            }
        }, (err) => { console.log(err) });

        if (Platform.OS === 'ios') {
            let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
            this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
                (rsp) => {
                    this.deviceAlreadPaired(rsp)
                }));
            this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
                this.deviceFoundEvent(rsp)
            }));
            this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
                this.setState({
                    printerName: '',
                    boundAddress: ''
                });
            }));
        } else if (Platform.OS === 'android') {
            this._listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp) => {
                    this.deviceAlreadPaired(rsp)
                }));
            this._listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
                    this.deviceFoundEvent(rsp)
                }));
            this._listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_CONNECTION_LOST, () => {
                    this.setState({
                        printerName: '',
                        boundAddress: ''
                    });
                }
            ));
            this._listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
                    ToastAndroid.show(I18n.t('deviceNotSupport'), ToastAndroid.LONG);
                }
            ))
        }
    }

    deviceAlreadPaired(rsp) {
        var ds = null;
        if (typeof (rsp.devices) == 'object') {
            ds = rsp.devices;
        } else {
            try {
                ds = JSON.parse(rsp.devices);
            } catch (e) { }
        }
        if (ds && ds.length) {
            let pared = this.state.pairedDevice;
            pared = pared.concat(ds || []);
            this.setState({
                pairedDevice: pared
            });
        }
    }

    deviceFoundEvent(rsp) {
        var r = null;
        try {
            if (typeof (rsp.device) == "object") {
                r = rsp.device;
                console.log("rsp.device", rsp.device)
            } else {
                r = JSON.parse(rsp.device);
                console.log("r", r)
            }
        } catch (e) { }
        if (r) {
            console.log("rererer", r)
            let found = this.state.foundDs || [];
            if (found.findIndex) {
                let duplicated = found.findIndex(function (x) {
                    return x.address == r.address
                });
                if (duplicated == -1) {
                    found.push(r);
                    this.setState({
                        foundDs: found
                    });
                }
            }
        }
    }

    renderDevice(rows) {
        let items = [];
        for (let i in rows) {
            let row = rows[i];
            if (row.address) {
                items.push({
                    'printerName': row.name || "UNKNOWN",
                    'boundAddress': row.address,
                })
            }
        }
        return (
            <View style={{ marginLeft: 10, marginRight: 10, marginTop: 5 }}>
                {this.state.loading ? (<ActivityIndicator animating={true} />) : null}
                <FlatList
                    data={items}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                />
            </View>
        )
    }

    renderFound(rows) {
        let items = [];
        for (let i in rows) {
            let row = rows[i];
            if (row.address) {
                items.push({
                    'printerName': row.name || "UNKNOWN " + i,
                    'boundAddress': row.address,
                })
            }
        }
        return (
            <View style={{ marginTop: 5, flex: 1, }}>
                {this.state.loading ? (<ActivityIndicator animating={true} />) : null}
                <View style={{ backgroundColor: '#eee', justifyContent: 'center', flex: 1 }}>
                    <Text style={[styles.printerText, { alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }]}>{I18n.t('foundDevice')}</Text>
                </View>
                <FlatList
                    style={{ marginLeft: 10, marginRight: 10 }}
                    data={items}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                />
            </View>
        )
    }

    renderHeader = () => {
        return (
            <View style={[styles.listStyle, { borderBottomWidth: 1, borderColor: colors.borderColor }]}>
                <Text style={{}}>{I18n.t('deviceName')}</Text>
                <Text style={{}}>{I18n.t('macAddress')}</Text>
            </View>
        );
    };

    renderItem(item, index) {
        return (
            <TouchableOpacity style={styles.listStyle} onPress={() => this.onConnectToDevice(item)}>
                <Text style={styles.name}>{item.printerName || "UNKNOWN"}</Text>
                <Text style={styles.address}>{item.boundAddress}</Text>
            </TouchableOpacity>
        )
    }

    setupPrinter = (isOn) => {
        this.setState({ isTogPrinter: isOn, loading: true })
        if (this.state.isTogPrinter == false) {
            //enable Bluetooth
            BluetoothManager.enableBluetooth().then((r) => {
                var paired = [];
                if (r && r.length > 0) {
                    for (var i = 0; i < r.length; i++) {
                        try {
                            paired.push(JSON.parse(r[i]));
                        } catch (e) { }
                    }
                }
                this.setState({ bleOpend: true, loading: false, pairedDevice: paired })
            }, (err) => {
                this.setState({ loading: false })
                alert(err)
            });
        } else {
            //disable Bluetooth
            BluetoothManager.disableBluetooth().then(() => {
                this.setState({ bleOpend: false, loading: false, foundDs: [], pairedDevice: [] });
            }, (err) => { alert(err) });
        }
    }

    onConnectToDevice = (item) => {
        this.setState({ loading: true })
        BluetoothManager.connect(item.boundAddress)
            .then((s) => {
                this.setState({
                    loading: false,
                    boundAddress: item.boundAddress,
                    printerName: item.printerName || "UNKNOWN",
                    stateConn: true
                })
            }, (err) => {
                this.setState({ loading: false, stateConn: false })
                alert(err);
            })
    }

    printTestPage = async () => {
        try {
            const { printerName, boundAddress } = this.state
            this.setState({ loading: true })
            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
            await BluetoothEscposPrinter.printText("Welcome to Parking Service\r\n", {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 1
            });
            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
            await BluetoothEscposPrinter.printText("Thank you for use our service\r\n", {});
            await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});
            this.setState({ loading: false })
            //save printer info
            if (printerName != null && boundAddress != null) {
                let data = {
                    'printerName': printerName,
                    'boundAddress': boundAddress
                }
                this.props.onSetupPrinter(data)
            }
        } catch (error) {
            this.setState({ loading: false })
            alert(error.message || "ERROR")
        }
    }

    goBackFunction = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    async checkRememberTouch() {
        let isRemember = await AsyncStorage.getItem('isRememberTouch')
        // console.log('isRemember', isRemember)
        if (isRemember == 'remember') {
            this.setState({ isTogBiometric: true })
        } else {
            this.setState({ isTogBiometric: false })
        }
    }

    setValueBiometric = async (isOn) => {
        this.setState({ isTogBiometric: isOn })
        const optionalConfigObject = {
            unifiedErrors: false,
            passcodeFallback: false
        }
        TouchID.isSupported(optionalConfigObject)
            .then(biometryType => {
                if (biometryType === 'FaceID') {
                    console.log('FaceID')
                } else {
                    this.setState({ isSupport: true })
                    this.setRemberTouch()
                }
            })
            .catch(error => {
                Alert.alert(I18n.t('notSupportTouchId'))
                this.setState({ isTogBiometric: false, isSupport: false })
                this.setRemberTouch()
            });
    }

    async setRemberTouch() {
        if (this.state.isSupport == true) {
            await AsyncStorage.setItem('isRememberTouch', 'remember')
            await AsyncStorage.setItem('shop_id', this.props.shopInfo.shop_id)
            await AsyncStorage.setItem('shop_email', this.props.shopInfo.shop_email)
            await AsyncStorage.setItem('password', this.props.login.password)
            await AsyncStorage.setItem('user_email', this.props.login.email)
            await AsyncStorage.setItem('device_uid', Constant.getUniqueId())
        } else {
            await AsyncStorage.setItem('isRememberTouch', '')
            await AsyncStorage.setItem('shop_id', null)
            await AsyncStorage.setItem('shop_email', null)
            await AsyncStorage.setItem('password', null)
            await AsyncStorage.setItem('user_email', null)
            await AsyncStorage.setItem('device_uid', null)
        }
    }

    setValueOnline = (isOn) => {
        this.setState({ isToggleOnline: isOn })
    }
    setValueShop = (isOn) => {
        this.setState({ isTogShop: isOn })
    }

    onPressToServer = () => {
        if (this.state.isToggleOnline == true) {
            this.props.setupIp(this.state.publicIp)
            ToastAndroid.show(I18n.t('setUpIpSuccess'), ToastAndroid.LONG);
        } else {
            this.props.clearIp()
            ToastAndroid.show(I18n.t('setClearIpSuccess'), ToastAndroid.LONG);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={colors.blue}
                    barStyle="light-content"
                />
                <Header
                    outerContainerStyles={styles.containHead}
                    leftComponent={<LeftComponent icons_name='ios-arrow-round-back' onPress={() => { this.goBackFunction() }} />}
                    centerComponent={{ text: I18n.t('setting'), style: styles.head_text }}
                // rightComponent={<LeftComponent iconSize={35} icons_name='md-refresh' onPress={() => { this.onReload() }} />}
                />
                {this.state.isLoading ? <ActivityIndicator /> : null}
                <View style={styles.content}>
                    <View style={styles.group}>
                        <View style={[styles.groupMainRow, { borderTopWidth: 0, paddingTop: this.state.isToggleOnline ? 0 : -20 }]}>
                            <View style={[styles.groupRow, { borderWidth: 0 }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={images.iconBio} resizeMode='contain' style={{ marginLeft: 20, width: 40, height: 40 }} />
                                    <Text style={[styles.groupText, { marginLeft: 10 }]}>{I18n.t('setupBiometric')}</Text>
                                </View>
                                <View style={{ marginRight: 10, justifyContent: 'center' }}>
                                    <ToggleSwitch
                                        isOn={this.state.isTogBiometric}
                                        onColor={colors.buttonColor}
                                        offColor={colors.toggleColor}
                                        labelStyle={{ color: "black", fontWeight: "20", }}
                                        size="medium"
                                        onToggle={isOn => this.setValueBiometric(!this.state.isTogBiometric)}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Setup Bluetooth Printer  */}
                        <View style={[styles.groupMainRow, { borderTopWidth: 0, flex: 1 }]}>
                            <View style={[styles.groupRow, { borderWidth: 0 }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={images.iconPrinter} resizeMode='contain' style={{ marginLeft: 20, width: 40, height: 40 }} />
                                    <Text style={[styles.groupText, { marginLeft: 10 }]}>{I18n.t('setupPrint')}</Text>
                                </View>
                                <View style={{ marginRight: 10, justifyContent: 'center' }}>
                                    <ToggleSwitch
                                        isOn={this.state.isTogPrinter}
                                        onColor={colors.buttonColor}
                                        offColor={colors.toggleColor}
                                        labelStyle={{ color: "black", fontWeight: "20", }}
                                        size="medium"
                                        onToggle={isOn => this.setupPrinter(!this.state.isTogPrinter)}
                                    />
                                </View>
                            </View>
                            {
                                this.state.bleOpend ?
                                    <View style={{ backgroundColor: '#eee', justifyContent: 'center', flex: 1 }}>
                                        <Text style={styles.printerText}>{I18n.t('connected')} :
                                        <Text style={{ color: "blue" }}> {!this.state.printerName ? 'No Devices' : this.state.printerName}</Text>
                                        </Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.printerText, { marginBottom: 10, fontWeight: '500' }]}>
                                                {I18n.t('paired')} :
                                     </Text>
                                            {
                                                this.state.stateConn ?
                                                    <TouchableOpacity onPress={() => this.printTestPage()}>
                                                        <Text style={[styles.printerText, { marginLeft: 0, marginRight: 0, color: "blue" }]}>{I18n.t('printTestPage')}</Text>
                                                    </TouchableOpacity>
                                                    : null
                                            }
                                        </View>
                                        <ScrollView>
                                            <View style={{ flex: 1, flexDirection: "column", backgroundColor: 'white' }}>
                                                {
                                                    this.renderFound(this.state.foundDs)
                                                }
                                                {
                                                    this.renderDevice(this.state.pairedDevice)
                                                }
                                            </View>
                                        </ScrollView>
                                    </View>
                                    : null
                            }
                        </View>

                    </View>
                </View>
            </View >
        );
    }
}

const mapStateToProps = state => {
    return {
        api: state.api,
        login: state.login,
        shopInfo: state.regInfo.shopInfo,
        trans: state.trans
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setupIp: (ip) => dispatch(setupIp(ip)),
        clearIp: () => dispatch(clearIp()),
        onSetupPrinter: (data) => dispatch(onSetupPrinter(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);