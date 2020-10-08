import { takeLatest, put, delay } from "redux-saga/effects";
import * as ERROR_CODE from '../constants/errorCode'
import {
    SHOP_REGISTER, SHOP_REGISTER_SUCCESS, SHOP_REGISTER_FAILED,
    REGISTER, REGISTER_SUCCESS, REGISTER_FAILED,
    VERSION_UPDATE, VERSION_UPDATE_SUCCESS, VERSION_UPDATE_FAILED,
    CHECK_SHOP_INFO, CHECK_SHOP_INFO_SUCCESS, CHECK_SHOP_INFO_FAILED
} from "../constants/type";
// import { shopRegister, register } from '../api/api'
import { shopRegister, register, checkVersion, checkShopInfo } from '../api/dynamicApi'


export function* wachShopRegister() {
    yield takeLatest(SHOP_REGISTER, callShopRegister)
}

function* callShopRegister(action) {
    try {
        const item = yield shopRegister(action.data, action.ip)
        if (item.status === 200) {
            let response_code = item.data.response_code
            let response_description = item.data.response_description
            let status = item.data.status
            if (response_code == ERROR_CODE.SUCCESS && status == true) {
                yield put({ type: SHOP_REGISTER_SUCCESS, shopInfo: item.data.fields, responseCode: response_code, responseDescription: response_description })
            } else {
                yield put({ type: SHOP_REGISTER_FAILED, responseCode: response_code, responseDescription: response_description, })
            }
        } else {
            yield put({ type: SHOP_REGISTER_FAILED, responseCode: ERROR_CODE.CONECT_FAIL, responseDescription: ERROR_CODE.CONNECTION_FAIL })
        }
    } catch (error) {
        yield put({ type: SHOP_REGISTER_FAILED, error })
    }
}


export function* wachRegister() {
    yield takeLatest(REGISTER, callRegister)
}

function* callRegister(action) {
    try {
        const item = yield register(action.data, action.ip)
        if (item.status === 200) {
            let response_code = item.data.response_code
            let response_description = item.data.response_description
            let status = item.data.status
            if (response_code == ERROR_CODE.SUCCESS && status == true) {
                yield put({ type: REGISTER_SUCCESS, responseCode: response_code, responseDescription: response_description, userRegister: action.data })
            } else {
                yield put({ type: REGISTER_FAILED, responseCode: response_code, responseDescription: response_description, })
            }
        } else {
            yield put({ type: REGISTER_FAILED, responseCode: ERROR_CODE.CONECT_FAIL, responseDescription: ERROR_CODE.CONNECTION_FAIL })
        }
    } catch (error) {
        yield put({ type: REGISTER_FAILED, error })
    }
}

export function* wachVersion() {
    yield takeLatest(VERSION_UPDATE, callVersion)
}

function* callVersion(action) {
    try {
        const item = yield checkVersion(action.language, action.ip)
        if (item.status === 200) {
            let response_code = item.data.response_code
            let response_description = item.data.response_description
            let status = item.data.status
            let filed = item.data.fields
            if (response_code == ERROR_CODE.SUCCESS && status == true) {
                yield put({ type: VERSION_UPDATE_SUCCESS, data: item.data.fields, response_code: response_code, response_description: response_description })
            } else {
                yield put({ type: VERSION_UPDATE_FAILED, data: null, response_code: response_code, response_description: response_description })
            }
        } else {
            yield put({ type: VERSION_UPDATE_FAILED, responseCode: ERROR_CODE.CONECT_FAIL, responseDescription: ERROR_CODE.CONNECTION_FAIL })
        }
    } catch (error) {
        yield put({ type: VERSION_UPDATE_FAILED, error })
    }
}



export function* wachShopInfo() {
    yield takeLatest(CHECK_SHOP_INFO, callShopInfo)
}

function* callShopInfo(action) {
    try {
        const item = yield checkShopInfo(action.shop_email, action.token, action.ip)
        if (item.status === 200) {
            let response_code = item.data.response_code
            let response_description = item.data.response_description
            let status = item.data.status
            let filed = item.data.fields
            if (response_code == ERROR_CODE.SUCCESS && status == true) {
                yield put({ type: CHECK_SHOP_INFO_SUCCESS, shopInfo: item.data.fields, response_code: response_code, response_description: response_description })
            } else {
                yield put({ type: CHECK_SHOP_INFO_FAILED, shopInfo: null, response_code: response_code, response_description: response_description })
            }
        } else {
            yield put({ type: CHECK_SHOP_INFO_FAILED, responseCode: ERROR_CODE.CONECT_FAIL, responseDescription: ERROR_CODE.CONNECTION_FAIL })
        }
    } catch (error) {
        yield put({ type: CHECK_SHOP_INFO_FAILED, error })
    }
}