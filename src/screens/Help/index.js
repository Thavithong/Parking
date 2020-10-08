/**
 * Created by januslo on 2018/12/27.
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  DeviceEventEmitter,
  NativeEventEmitter,
  Switch,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  Image
} from 'react-native';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';
import moment from "moment";
import ViewShot from "react-native-view-shot";
import RNFS from 'react-native-fs';

var { height, width } = Dimensions.get('window');
export default class Help extends Component {
  _listeners = [];
  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      pairedDs: [],
      foundDs: [],
      bleOpend: false,
      loading: true,
      boundAddress: '',
      debugMsg: '',
      img: null
    }
  }

  componentDidMount() {
    BluetoothManager.isBluetoothEnabled().then((enabled) => {
      this.setState({
        bleOpend: Boolean(enabled),
        loading: false
      })
    }, (err) => {
      err
    });

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        (rsp) => {
          this._deviceAlreadPaired(rsp)
        }));
      this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
        this._deviceFoundEvent(rsp)
      }));
      this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
        this.setState({
          name: '',
          boundAddress: ''
        });
      }));
    } else if (Platform.OS === 'android') {
      this._listeners.push(DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp) => {
          this._deviceAlreadPaired(rsp)
        }));
      this._listeners.push(DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
          this._deviceFoundEvent(rsp)
        }));
      this._listeners.push(DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST, () => {
          this.setState({
            name: '',
            boundAddress: ''
          });
        }
      ));
      this._listeners.push(DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
          ToastAndroid.show("Device Not Support Bluetooth !", ToastAndroid.LONG);
        }
      ))
    }
  }

  _deviceAlreadPaired(rsp) {
    var ds = null;
    if (typeof (rsp.devices) == 'object') {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) {
      }
    }
    if (ds && ds.length) {
      let pared = this.state.pairedDs;
      pared = pared.concat(ds || []);
      this.setState({
        pairedDs: pared
      });
    }
  }

  _deviceFoundEvent(rsp) {
    var r = null;
    try {
      if (typeof (rsp.device) == "object") {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      //ignore
    }
    if (r) {
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

  _scan() {
    this.setState({
      loading: true
    })
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
        this.setState({
          foundDs: fds,
          loading: false
        });
      }, (er) => {
        this.setState({
          loading: false
        })
        alert('error' + JSON.stringify(er));
      });
  }

  _renderRow(rows) {
    let items = [];
    for (let i in rows) {
      let row = rows[i];
      if (row.address) {
        items.push(
          <TouchableOpacity key={new Date().getTime() + i} style={styles.wtf} onPress={() => {
            this.setState({
              loading: true
            });
            BluetoothManager.connect(row.address)
              .then((s) => {
                this.setState({
                  loading: false,
                  boundAddress: row.address,
                  name: row.name || "UNKNOWN"
                })
              }, (e) => {
                this.setState({
                  loading: false
                })
                alert(e);
              })

          }}><Text style={styles.name}>{row.name || "UNKNOWN"}</Text><Text
            style={styles.address}>{row.address}</Text></TouchableOpacity>
        );
      }
    }
    return items;
  }

  onPrint = () => {
    //capture to image first
    this.refs.viewShot.capture().then(uri => {
      this.setState({ img: uri })
      //read or convert image url to be string base64
      RNFS.readFile(uri, 'base64')
        .then(res => {
          this.convertBase(res) // send to print
        });
    })

  }

  async convertBase(base64String) {
    this.setState({ myImage: base64String })
    try {
      //print to image
      await BluetoothEscposPrinter.printPic(base64String, { width: 500, left: -2 });
    } catch (e) {
      alert(e.message || "ERROR")
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{this.state.debugMsg}</Text>
        <Text style={styles.title}>Blutooth Opended:{this.state.bleOpend ? "true" : "false"}
          <Text>Open BLE Before Scanning</Text>
        </Text>

        <View>
          <Switch value={this.state.bleOpend} onValueChange={(v) => {
            this.setState({
              loading: true
            })
            if (!v) {
              //disable Bluetooth
              BluetoothManager.disableBluetooth().then(() => {
                this.setState({
                  bleOpend: false,
                  loading: false,
                  foundDs: [],
                  pairedDs: []
                });
              }, (err) => { alert(err) });
            } else {
              //enable Bluetooth
              BluetoothManager.enableBluetooth().then((r) => {
                var paired = [];
                if (r && r.length > 0) {
                  for (var i = 0; i < r.length; i++) {
                    try {
                      paired.push(JSON.parse(r[i]));
                    } catch (e) {
                      //ignore
                    }
                  }
                }
                this.setState({
                  bleOpend: true,
                  loading: false,
                  pairedDs: paired
                })
              }, (err) => {
                this.setState({
                  loading: false
                })
                alert(err)
              });
            }
          }} />
          <Button disabled={this.state.loading || !this.state.bleOpend} onPress={() => { this._scan() }} title="Scan" />
        </View>
        <Text>{''}</Text>
        <Text style={styles.title}>Connected:
          <Text style={{ color: "blue" }}>
            {!this.state.name ? 'No Devices' : this.state.name}
          </Text>
        </Text>

        <Text style={styles.title}>Found(tap to connect):</Text>
        {this.state.loading ? (<ActivityIndicator animating={true} />) : null}
        <View style={{ flex: 1, flexDirection: "column" }}>
          {
            this._renderRow(this.state.foundDs)
          }
        </View>
        <Text style={styles.title}>Paired:</Text>
        {this.state.loading ? (<ActivityIndicator animating={true} />) : null}
        <View style={{ flex: 1, flexDirection: "column" }}>
          {
            this._renderRow(this.state.pairedDs)
          }
        </View>

        <Text>{''}</Text>
        {/* Print barcode test ok can use */}
        <Button onPress={async () => {
          await BluetoothEscposPrinter.printBarCode("123456789012", BluetoothEscposPrinter.BARCODETYPE.JAN13, 3, 120, 0, 2);
          await BluetoothEscposPrinter.printText("\r\n", {});
        }} title="Print BarCode" />


        <Text>{''}</Text>
        {/* Print receive */}
        <Button disabled={this.state.loading || this.state.boundAddress.length <= 0}
          title="Print Receipt" onPress={async () => {
            try {
              await BluetoothEscposPrinter.printerInit();
              await BluetoothEscposPrinter.printerLeftSpace(0);

              await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
              await BluetoothEscposPrinter.setBlob(0);
              await BluetoothEscposPrinter.printText("Pino Shop\r\n", {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 1,
                heigthtimes: 1,
                fonttype: 1
              });
              await BluetoothEscposPrinter.setBlob(0);
              await BluetoothEscposPrinter.printText("Receive\r\n", {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 1
              });
              await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
              await BluetoothEscposPrinter.printText("User：Pino\r\n", {});
              await BluetoothEscposPrinter.printText("Brill：xsd201909210000001\r\n", {});
              await BluetoothEscposPrinter.printText("Date：" + moment(new Date()).format("YYYY-MM-DD") + "\r\n", {});
              await BluetoothEscposPrinter.printText("Phone：02099588891\r\n", {});
              await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
              let columnWidths = [12, 8, 10, 10];
              await BluetoothEscposPrinter.printColumn(columnWidths,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                ["Name", 'Qty', 'Price', 'Total'], {});
              await BluetoothEscposPrinter.printColumn(columnWidths,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                ["React-Native", '1', '32000', '32000'], {});
              await BluetoothEscposPrinter.printText("\r\n", {});
              await BluetoothEscposPrinter.printColumn(columnWidths,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                ["React-Native", '1', '32000', '32000'], {});
              await BluetoothEscposPrinter.printText("\r\n", {});
              await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
              await BluetoothEscposPrinter.printColumn([12, 8, 10],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ["Total", '2', '64000'], {});
              await BluetoothEscposPrinter.printText("\r\n", {});
              await BluetoothEscposPrinter.printText("Percent：100%\r\n", {});
              await BluetoothEscposPrinter.printText("Total：64000.00\r\n", {});
              await BluetoothEscposPrinter.printText("Sale date：" + moment(new Date()).format("YYYY-MM-DD") + "\r\n", {});
              await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
              await BluetoothEscposPrinter.printText("RD：\r\n", {});
              await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
              await BluetoothEscposPrinter.printText("Thank you\r\n\r\n\r\n", {});
              await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
            } catch (e) {
              alert(e.message || "ERROR");
            }

          }} />
        <Text>{''}</Text>
        <TouchableOpacity style={{ width: '100%', height: 45, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue' }} onPress={() => this.onPrint()}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Print</Text>
        </TouchableOpacity>

        {/* design in app and then capture to image but text have to set white background */}
        <ViewShot ref="viewShot" options={{ format: "png", quality: 0.9}}>
          <Text style={{ textAlign: 'center', fontSize: 40,  backgroundColor:'white' }}>ນັບຕັ້ງແຕ່ຄວນຈະເຮັດວຽກ</Text>
        </ViewShot>
        
        {/* test display image after capture */}
        <Image style={{ width: '100%', height: 70 }} source={{ uri: this.state.img }} resizeMode={'contain'} />
        <Image style={{ width: '100%', height: 70 }} resizeMode={'contain'} source={{ uri: "data:image/jpeg;base64," + this.state.myImage }} />


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  title: {
    width: width,
    backgroundColor: "#eee",
    color: "#232323",
    paddingLeft: 8,
    paddingVertical: 4,
    textAlign: "left"
  },
  wtf: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  name: {
    flex: 1,
    textAlign: "left"
  },
  address: {
    flex: 1,
    textAlign: "right"
  }
});