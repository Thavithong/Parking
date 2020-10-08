
import { combineReducers } from 'redux'
import login from './LoginReducer'
import api from './ApiReducer'
import regInfo from './RegisterReducer'
import trans from './TransactionReducer'
// ກຽມສົ່ງ Redux ທີ່ເຮົາສ້າງແຕ່ລະໄຟລ໌ໃຫ້ອອກເປັນ Reducer
const AppReducer = combineReducers({
    login,
    api,
    regInfo,
    trans
})

export default AppReducer