import { Alert, ToastAndroid } from 'react-native';
import Transaction from '../model/Transaction'
import ReturnMoney from '../model/ReturnMoney'
import Message from '../model/Message';
import db from '../api/BaseConfig'
import I81n from 'react-native-i18n'
import moment from "moment";
// var SQLite = require('react-native-sqlite-storage')
// var db = SQLite.openDatabase({ name: 'parking.db', createFromLocation: '~parking.db' })

export const getTransaction = (shop_id, shop_email) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        msg.result = [];
        let date = moment(new Date()).format("YYYY-MM-DD")
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tb_transaction where trans_date >= ? and shop_id=? and shop_email=? order by trans_id desc', [date,shop_id, shop_email], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                    let item = results.rows.item(i);
                    console.log('item', item)
                    let transaction = new Transaction(item.trans_id, item.trans_date, item.amount, item.vehicle_id, item.vehicle_name, item.vehicle_number, item.user_id, item.status, item.trans_time, item.shop_id, item.shop_email, item.trans_sate, item.check_out_time);
                    msg.result.push(transaction);
                }
                resolve({ result: msg.result, message: msg.message });
            }, (error) => {
                msg.result = [];
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
                Alert.alert("Cannot get transaction data")
            });
        });
    });
}

export const getTransReturn = (shop_id, shop_email) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        msg.result = [];
        let date = moment(new Date()).format("YYYY-MM-DD")
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tb_transaction where trans_date >= ? and trans_time >= time("now","localtime","-10 minutes") and shop_id=? and shop_email=? Order by trans_id desc ', [date, shop_id, shop_email], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                    let item = results.rows.item(i);
                    let transaction = new Transaction(item.trans_id, item.trans_date, item.amount, item.vehicle_id, item.vehicle_name, item.vehicle_number, item.user_id, item.status, item.trans_time);
                    msg.result.push(transaction);
                }
                resolve({ result: msg.result, message: msg.message });
            }, (error) => {
                msg.result = [];
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
                Alert.alert(I18n.t('00001'))
            });
        });
    });
}

export const getPaymentTransaction = () => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        msg.result = [];
        let date = moment(new Date()).format("YYYY-MM-DD")
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tb_transaction where trans_date >= ? and status=2 Order by trans_id desc ', [date], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                    let item = results.rows.item(i);
                    let transaction = new Transaction(item.trans_id, item.trans_date, item.amount, item.vehicle_id, item.vehicle_name, item.vehicle_number, item.user_id, item.status, item.trans_time);
                    msg.result.push(transaction);
                }
                resolve({ result: msg.result, message: msg.message });
            }, (error) => {
                msg.result = [];
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
                Alert.alert(I18n.t('00001'))
            });
        });
    });
}


export const insertTransaction = (trans_id, date, vehicle_price, vehicle_id, vehicle_name, vehicle_no, user_id, status, trans_time, shop_id, shop_email) => {
    return new Promise((resolve, reject) => {
        var query = "insert into tb_transaction (trans_id,trans_date,amount,vehicle_id,vehicle_name,vehicle_number,user_id,status,trans_time, shop_id, shop_email, trans_sate) values(?,?,?,?,?,?,?,?,?,?,?,1)";
        var param = [trans_id, date, vehicle_price, vehicle_id, vehicle_name, vehicle_no, user_id, status, trans_time, shop_id, shop_email]
        db.transaction((tx) => {
            tx.executeSql(query, param, (tx, results) => {
                ToastAndroid.show(I18n.t('00000'), ToastAndroid.SHORT);
            }, function (tx, err) {
                ToastAndroid.show(I18n.t('10112'), ToastAndroid.LONG);
                return;
            });
        });
    });
}

export const updateTransaction = (status, trans_id, shop_id, shop_email) => {
    return new Promise((resolve, reject) => {
        var query = "update tb_transaction set status=? where trans_id=? and shop_id=? and shop_email=?";
        var param = [status, trans_id, shop_id, shop_email]
        db.transaction((tx) => {
            tx.executeSql(query, param, (tx, results) => {
                if (status == 3) {
                    ToastAndroid.show(I18n.t('revertSuccess'), ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show(I18n.t('paymentSuccess'), ToastAndroid.SHORT);
                }
            }, function (tx, err) {
                if (status == 3) {
                    ToastAndroid.show(I18n.t('notRevertSuccess'), ToastAndroid.LONG);
                } else {
                    ToastAndroid.show(I18n.t('notPaymentSuccess'), ToastAndroid.LONG);
                }
                return;
            });
        });
    });
}

export const insertReturnMoney = (vehicle_id, vehicle_number, user_id, amount, trans_date, shop_id, shop_email) => {
    return new Promise((resolve, reject) => {
        var query = "insert into tb_returnmoney (return_id,vehicle_id,vehicle_number,user_id,amount,trans_date, shop_id, shop_email) values(null,?,?,?,?,?,?,?)";
        var param = [vehicle_id, vehicle_number, user_id, amount, trans_date, shop_id, shop_email]
        db.transaction((tx) => {
            tx.executeSql(query, param, (tx, results) => {
                ToastAndroid.show(I81n.t('registerSuccessfully'), ToastAndroid.SHORT);
            }, function (tx, err) {
                ToastAndroid.show(I18n.t('10010'), ToastAndroid.LONG);
                return;
            });
        });
    });
}

export const getReturnMoney = (shop_id, shop_email) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        msg.result = [];
        let date = moment(new Date()).format("YYYY-MM-DD")
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tb_returnmoney where trans_date >= ? and shop_id=? and shop_email=? order by trans_id desc', [date, shop_id, shop_email], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                    let item = results.rows.item(i);
                    let transaction = new ReturnMoney(item.trans_id, item.trans_date, item.amount, item.vehicle_id, item.vehicle_name, item.vehicle_number, item.user_id, item.status, item.trans_time, item.shop_id, item.shop_email);
                    msg.result.push(transaction);
                }
                resolve({ result: msg.result, message: msg.message });
            }, (error) => {
                msg.result = [];
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
            });
        });
    });
}

export const checkOutTransaction = (check_out_time,trans_id, shop_id, shop_email) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        msg.result = [];
        var query = "update tb_transaction set trans_sate=0, check_out_time=? where trans_id=? and shop_id=? and shop_email=?";
        var param = [check_out_time,trans_id, shop_id, shop_email]
        db.transaction((tx) => {
            tx.executeSql(query, param, (tx, results) => {
                let data = {
                    status: true,
                    description: "Success"
                }
                msg.result.push(data);
                resolve({ result: msg.result, message: msg.message });
            }, function (tx, err) {
                let data = {
                    status: false,
                    description: "Unsuccess"
                }
                msg.result.push(data);
                resolve({ result: msg.result, message: msg.message });
            });
        });
    });
}


export const checkTransaction = (trans_id, shop_id, shop_email) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        msg.result = [];
        let date = moment(new Date()).format("YYYY-MM-DD")
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tb_transaction where trans_date >= ? and shop_id=? and shop_email=? and trans_id=? order by trans_id desc', [date,shop_id, shop_email, trans_id], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                    let item = results.rows.item(i);
                    console.log('item', item)
                    let transaction = new Transaction(item.trans_id, item.trans_date, item.amount, item.vehicle_id, item.vehicle_name, item.vehicle_number, item.user_id, item.status, item.trans_time, item.shop_id, item.shop_email, item.trans_sate);
                    msg.result.push(transaction);
                }
                resolve({ result: msg.result, message: msg.message });
            }, (error) => {
                msg.result = [];
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
                Alert.alert("Cannot get transaction data")
            });
        });
    });
}