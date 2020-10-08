import DeviceInfo from 'react-native-device-info';

export function getUniqueId(){
    let uniqueId = DeviceInfo.getUniqueId();
    return uniqueId;
}

export const appVersionAndroid = 'Version 1.11\nJun, 4th 2019'
export const appVersionNoNewLineAndroid = 'Version 1.11 - Jun, 4th 2019'

export const appVersioniOS = 'Version 1.11\nJun, 4th 2019'
export const appVersionNoNewLineiOS = 'Version 1.11 - Jun, 4th 2019'

export const VALIDATE_NUMERIC = 1
export const VALIDATE_MONEY = 2
export const VALIDATE_PHONE = 3
export const VALIDATE_VIETTEL = 4
export const VALIDATE_NAME = 5

export const VALIDATE_DATE = 6
export const VALIDATE_ALPHABET = 7
export const VALIDATE_NORMAL_CHAR = 8
export const VALIDATE_ONLY_PHONE = 9
export const VALIDATE_AGENT_CODE = 10
export const VALIDATE_IDENTIFICATION = 11
export const VALIDATE_ACCOUNT = 12
export const VALIDATE_NON_SPECIAL = 13

export const VALIDATE_ADSL = 14
export const VALIDATE_FTTH = 15
export const VALIDATE_LEASED_LINE = 16
export const VALIDATE_PSTN = 17
export const VALIDATE_BANK_CODE = 18
export const VALIDATE_BANK_TRANS_ID = 19
export const VALIDATE_LAOS = 20
export const VALIDATE_OTP = 21
export const VALIDATE_LAOLANGUAGE=22
export const VALIDATE_EMAIL=23

export const READ_CALENDAR = 'android.permission.READ_CALENDAR'
export const WRITE_CALENDAR = 'android.permission.WRITE_CALENDAR'
export const CAMERA = 'android.permission.CAMERA'
export const READ_CONTACTS = 'android.permission.READ_CONTACTS'
export const WRITE_CONTACTS = 'android.permission.WRITE_CONTACTS'
export const GET_ACCOUNTS = 'android.permission.GET_ACCOUNTS'
export const ACCESS_FINE_LOCATION = 'android.permission.ACCESS_FINE_LOCATION'
export const ACCESS_COARSE_LOCATION = 'android.permission.ACCESS_COARSE_LOCATION'
export const RECORD_AUDIO = 'android.permission.RECORD_AUDIO'
export const READ_PHONE_STATE = 'android.permission.READ_PHONE_STATE'
export const CALL_PHONE = 'android.permission.CALL_PHONE'
export const READ_CALL_LOG = 'android.permission.READ_CALL_LOG'
export const WRITE_CALL_LOG = 'android.permission.WRITE_CALL_LOG'
export const ADD_VOICEMAIL = 'com.android.voicemail.permission.ADD_VOICEMAIL'
export const USE_SIP = 'android.permission.USE_SIP'
export const PROCESS_OUTGOING_CALLS = 'android.permission.PROCESS_OUTGOING_CALLS'
export const BODY_SENSORS = 'android.permission.BODY_SENSORS'
export const SEND_SMS = 'android.permission.SEND_SMS'
export const RECEIVE_SMS = 'android.permission.RECEIVE_SMS'
export const READ_SMS = 'android.permission.READ_SMS'
export const RECEIVE_WAP_PUSH = 'android.permission.RECEIVE_WAP_PUSH'
export const RECEIVE_MMS = 'android.permission.RECEIVE_MMS'
export const READ_EXTERNAL_STORAGE = 'android.permission.READ_EXTERNAL_STORAGE'
export const WRITE_EXTERNAL_STORAGE = 'android.permission.WRITE_EXTERNAL_STORAGE'
export const VERSION = '1.0'
export const BUILD_DATE = '18/9/2018'
export const VERSION_BUILD_DATE = "Version: " + VERSION + " - " + "Build date: " + BUILD_DATE

export const PERMISSION_RESULTS = {
  GRANTED: 'granted',
  DENIED: 'denied',
  NEVER_ASK_AGAIN: 'never_ask_again',
  RESTRICTED: 'restricted'
}

export const NAV_INDEX = {
  TRANSFER_TO_CUSTOMER: 1,
  TRANSFER_MONEY: 2,
  CUSTOMER_CASH_OUT: 3,
  CUSTOMER_REGISTER: 4,
  TRANSFER_TO_AGENT: 5,
  AGENT_CASH_OUT: 6,
  AGENT_REQUEST_CASH: 7,
  AGENT_REQUEST_E_MONEY: 8,
  TOP_UP: 9,
  INTERNET: 10,
  PSTN: 11,
  AGENT_CHECK_BANK_AC: 12,
  CHECK_COMMISSION: 13,
  TRANSFER_FOR_AGENT_BY_SUPER_AGENT: 14,
  SOKXAY:15
}