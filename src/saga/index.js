
import { fork } from 'redux-saga/effects'
import { wachLogin, wachCheckLogin } from './LoginSaga'
import { wachShopRegister, wachRegister, wachVersion, wachShopInfo } from './RegisterSaga'
import { wachTransaction, wachRevertMoney } from './TransactionSaga'
export default function* rootSaga() {
    yield [
        fork(wachCheckLogin),
        fork(wachLogin),
        fork(wachShopRegister),
        fork(wachRegister),
        fork(wachVersion),
        fork(wachTransaction),
        fork(wachRevertMoney),
        fork(wachShopInfo)
    ]
}
