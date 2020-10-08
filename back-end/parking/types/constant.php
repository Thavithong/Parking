<?php
    //real server
    define('DB_HOST', 'localhost');
    define('DB_ROOT', 'id12299637_root');
    define('DB_PASS', '9QMmmo@/FWs36Ak8');
    define('DB_NAME', 'id12299637_parking');

    //test server
    // define('DB_HOST', 'localhost');
    // define('DB_ROOT', 'root');
    // define('DB_PASS', '123');
    // define('DB_NAME', 'parking');

     class constant{
        //response code
        const SUCCESS = "00000";
        const FAIL = "99999";
        const NO_DATA_FOUND = "00001";
        const REGISTER_FAIL = "10010";
        const EXIST_SHOP_EMAIL = "10012";
        const SHOP_EMPTY = "10013";
        const USER_LOGIN_EMPTY = "10014";
        const ACCOUNT_NOT_REGISTER = "10116";
        const SHOP_REGISTER_COUNT ="10117";
        const EXIST_EMAIL ="10118";
        const SHOP_NOT_HAVE_PERMISSION = "10123";
        const ACCOUNT_BLOCK = "10119";
        const ACCOUNT_CANCLE = "10120";
        const ACCOUNT_LOGIN_DIFFERENT = "10121";
        const SAVE_DATA_FAIl = "10122";


        //response description
        const REGISTER_SUCCESS = "Your account register success\nThank you for user our service.";
        const REGISTER_FAIL_DES = "Transaction was not success\nPlease check your info.";
        const EXIST_SHOP_EMAIL_DES = "This {email} already exist.";
        const SHOP_EMPTY_DES = "Shop name and shop email was not allow empty.";
        const USER_LOGIN_EMPTY_DES = "Username, password and email was not allow empty.";
        const ACCOUNT_NOT_REGISTER_DES = "Account {email} is not register.";
        const SHOP_REGISTER_COUNT_DES = "Your shop was registered only {account} accounts.\nPlease contact admin.";
        const EXIST_EMAIL_DES = "This {email} already exist.\nPlease try again.";
        const SHOP_NOT_HAVE_PERMISSION_DES = "Your account not have permission.\nPlease contact admin.";
        const ACCOUNT_BLOCK_DES = "Account was blocked by system.";
        const ACCOUNT_CANCLE_DES = "Account was cancelled by customer.";
        const LOGIN_SUCCESS = "Login success.";
        const ACCOUNT_LOGIN_DIFFERENT_DES = "Your account login different device.";
        const SAVE_DATA_SUCCESS ="Save data success.";
        const SAVE_DATA_FAIl_DES = "Cann not save data.";
        const NO_DATA_FOUND_DES = "No data found.";
        const GET_DATA_SUCCESS_DES = "Found data.";
        const DETELE_DATA_COMPLETE = "Delete data complete.";
    }
?>