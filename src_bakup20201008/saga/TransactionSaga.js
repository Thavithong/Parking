import { takeLatest, put, delay } from "redux-saga/effects";
import * as ERROR_CODE from '../constants/errorCode'
import {
    REQUEST_TRANSACTION,
    REQUEST_TRANSACTION_SUCCESS,
    REQUEST_TRANSACTION_FAILED,
    REQUEST_REVERT,
    REQUEST_REVERT_SUCCESS, 
    REQUEST_REVERT_FAILED
} from "../constants/type";
import { insertTransaction, insertRevertMoney } from '../api/dynamicApi'

export function* wachTransaction() {
    yield takeLatest(REQUEST_TRANSACTION, callTransaction)
}

function* callTransaction(action) {
    try {
        const item = yield insertTransaction(action.data, action.ip)
        console.log('return', item)
        if (item.status === 200) {
            let response_code = item.data.response_code
            let response_description = item.data.response_description
            let status = item.data.status
            let total = item.data.total
            let totalSucess = item.data.totalSuccess
            let totalFalse = item.data.totalFalse
            if (response_code == ERROR_CODE.SUCCESS && status == true) {
                yield put({ type: REQUEST_TRANSACTION_SUCCESS, responseCode: response_code, responseDescription: response_description, total: total, totalFalse: totalFalse, totalSucess: totalSucess})
            } else {
                yield put({ type: REQUEST_TRANSACTION_FAILED, responseCode: response_code, responseDescription: response_description, total: total, totalFalse: totalFalse, totalSucess: totalSucess})
            }
        } else {
            yield put({ type: REQUEST_TRANSACTION_FAILED, responseCode: ERROR_CODE.CONECT_FAIL, responseDescription: ERROR_CODE.CONNECTION_FAIL })
        }
    } catch (error) {
        yield put({ type: REQUEST_TRANSACTION_FAILED, error })
    }
}



export function* wachRevertMoney() {
    yield takeLatest(REQUEST_REVERT, callRevertMoney)
}

function* callRevertMoney(action) {
    try {
        const item = yield insertRevertMoney(action.data, action.ip)
        console.log('return', item)
        if (item.status === 200) {
            let response_code = item.data.response_code
            let response_description = item.data.response_description
            let status = item.data.status
            let total = item.data.total
            let totalSucess = item.data.totalSuccess
            let totalFalse = item.data.totalFalse
            if (response_code == ERROR_CODE.SUCCESS && status == true) {
                yield put({ type: REQUEST_REVERT_SUCCESS, responseCode: response_code, responseDescription: response_description, total: total, totalFalse: totalFalse, totalSucess: totalSucess})
            } else {
                yield put({ type: REQUEST_REVERT_FAILED, responseCode: response_code, responseDescription: response_description, total: total, totalFalse: totalFalse, totalSucess: totalSucess})
            }
        } else {
            yield put({ type: REQUEST_REVERT_FAILED, responseCode: ERROR_CODE.CONECT_FAIL, responseDescription: ERROR_CODE.CONNECTION_FAIL })
        }
    } catch (error) {
        yield put({ type: REQUEST_REVERT_FAILED, error })
    }
}