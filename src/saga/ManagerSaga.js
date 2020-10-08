import { takeLatest, put, delay } from "redux-saga/effects";
import * as ERROR_CODE from '../constants/errorCode'
import {
    DOWNLOAD_FROM_SERVER, DOWNLOAD_FROM_SERVER_SUCCESS, DOWNLOAD_FROM_SERVER_FAIL,
} from "../constants/type";
// import { shopRegister, register } from '../api/api'
import { donwload } from '../api/dynamicApi'


export function* wachDownload() {
    yield takeLatest(DOWNLOAD_FROM_SERVER, callDownload)
}

function* callDownload(action) {
    try {
        const item = yield donwload(action.data, action.ip)
        if (item.status === 200) {
            let response_code = item.data.response_code
            let response_description = item.data.response_description
            let status = item.data.status
            if (response_code == ERROR_CODE.SUCCESS && status == true) {
                yield put({ type: DOWNLOAD_FROM_SERVER_SUCCESS, dataFromServer: item.data.fields, responseCode: response_code, responseDescription: response_description })
            } else {
                yield put({ type: DOWNLOAD_FROM_SERVER_FAIL, responseCode: response_code, responseDescription: response_description, })
            }
        } else {
            yield put({ type: DOWNLOAD_FROM_SERVER_FAIL, responseCode: ERROR_CODE.CONECT_FAIL, responseDescription: ERROR_CODE.CONNECTION_FAIL })
        }
    } catch (error) {
        yield put({ type: DOWNLOAD_FROM_SERVER_FAIL, error })
    }
}