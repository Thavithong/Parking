import { ToastAndroid } from 'react-native';
import User from '../model/User'
import Message from '../model/Message';
import db from '../api/BaseConfig'
import moment from "moment";
import I81n from 'react-native-i18n'

export const checkLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        msg.result = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tb_user where user_name=? and password=?', [username, password], (tx, results) => {
                if(results.rows.length > 0){
                    let item = results.rows.item(0);
                    let user = new User(item.user_id, item.user_name, item.password, item.position_name, item.status);
                    msg.result.push(user);
                }else{
                    let user = new User("0", "0", "0", "0", "0");
                    msg.result.push(user);
                } 
                resolve({ result: msg.result, message: msg.message });
            }, (error) => {
                msg.result = [];
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
                Alert.alert("Cannot get user data")
            });
        });
    });
}


export const registerShop = (shop_id, shop_name, shop_email, shop_phone, shop_permission, latitude, long_latitude, shop_address, total_device) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        msg.result = [];
        db.transaction((tx) => {
            tx.executeSql('insert into tb_shop (shop_id, shop_name, shop_email, shop_phone, shop_permission, latitude, long_latitude, shop_address, total_device) values(?,?,?,?,?,?,?,?,?)', [shop_id, shop_name, shop_email, shop_phone, shop_permission, latitude, long_latitude, shop_address, total_device], (tx, results) => {
                ToastAndroid.show(I81n.t('registerSuccessfully'), ToastAndroid.SHORT);
            }, (error) => {
                ToastAndroid.show(I18n.t('10010'), ToastAndroid.LONG);
                return;
            });
        });
    });
}


export const registerUser = (user_name,password,email,shop_id, shop_email, device_uid, user_state, device_token) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        msg.result = [];
        db.transaction((tx) => {
            tx.executeSql('insert into tb_user (user_id,user_name,password,email,shop_id, shop_email, device_uid, user_state, device_token) values(null,?,?,?,?,?,?,?,?)', [user_name,password,email,shop_id, shop_email, device_uid, user_state, device_token], (tx, results) => {
                ToastAndroid.show(I81n.t('registerSuccessfully'), ToastAndroid.SHORT);
            }, (error) => {
                ToastAndroid.show(I18n.t('10010'), ToastAndroid.LONG);
                return;
            });
        });
    });
}