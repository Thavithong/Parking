import { takeLatest, put, delay } from "redux-saga/effects";
import * as ERROR_CODE from '../constants/errorCode'
import {
    CHECK_LOGIN, CHECK_LOGIN_SUCCESS, CHECK_LOGIN_FAIL,
    LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
} from "../constants/type";

// import { checkLogin } from '../api/api'
import { checkLogin } from '../api/dynamicApi'
export function* wachLogin() {
    yield takeLatest(LOGIN_USER, callLogin)
}

function* callLogin(action) {
    try {
        const jsonData = JSON.stringify(action.data);
        const playLoad = JSON.parse(jsonData)
        yield put({ type: LOGIN_USER_SUCCESS, data: playLoad, isKeepLogin: action.isKeepLogin })
    } catch (error) {
        yield put({ type: LOGIN_USER_FAIL, error })
    }
}

export function* wachCheckLogin() {
    yield takeLatest(CHECK_LOGIN, callCheckLogin)
}

function* callCheckLogin(action) {
    try {
        console.log('action.data', action.data)
        const item = yield checkLogin(action.data, action.ip)
        if (item.status === 200) {
            let response_code = item.data.response_code
            let response_description = item.data.response_description
            let status = item.data.status
            if (response_code == ERROR_CODE.SUCCESS && status == true) {
                yield put({ type: CHECK_LOGIN_SUCCESS, dataLogin: item.data.fields, responseCode: response_code, responseDescription: response_description, isKeepLogin: action.isKeepLogin })
            } else {
                yield put({ type: CHECK_LOGIN_FAIL, responseCode: response_code, responseDescription: response_description, })
            }
        } else {
            yield put({ type: CHECK_LOGIN_FAIL, responseCode: ERROR_CODE.CONECT_FAIL, responseDescription: ERROR_CODE.CONNECTION_FAIL })
        }
    } catch (error) {
        yield put({ type: CHECK_LOGIN_FAIL, error })
    }
}
