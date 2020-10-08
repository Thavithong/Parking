import {
    REQUEST_TRANSACTION,
    REQUEST_TRANSACTION_SUCCESS,
    REQUEST_TRANSACTION_FAILED,
    REQUEST_REVERT,
    REQUEST_REVERT_SUCCESS,
    REQUEST_REVERT_FAILED,
    SETUP_PRINTER
} from '../constants/type'

const initialState = {
    responseCode: null,
    responseDescription: null,
    success: false,
    actionType: null,
    isLoading: false,
    total: null,
    totalSucess: null,
    totalFalse: null,
    dataPrinter: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_TRANSACTION:
            return { ...state, actionType: REQUEST_TRANSACTION, responseCode: null, responseDescription: null, total: null, totalSucess: null, totalFalse: null, isLoading: true }
        case REQUEST_TRANSACTION_SUCCESS:
            return { ...state, actionType: REQUEST_TRANSACTION_SUCCESS, responseCode: action.responseCode, responseDescription: action.responseDescription, total: action.total, totalSucess: action.totalSucess, totalFalse: action.totalFalse, isLoading: false }
        case REQUEST_TRANSACTION_FAILED:
            return { ...state, actionType: REQUEST_TRANSACTION_FAILED, responseCode: action.responseCode, responseDescription: action.responseDescription, total: action.total, totalSucess: action.totalSucess, totalFalse: action.totalFalse, isLoading: false }

        case REQUEST_REVERT:
            return { ...state, actionType: REQUEST_REVERT, responseCode: null, responseDescription: null, total: null, totalSucess: null, totalFalse: null, isLoading: true }
        case REQUEST_REVERT_SUCCESS:
            return { ...state, actionType: REQUEST_REVERT_SUCCESS, responseCode: action.responseCode, responseDescription: action.responseDescription, total: action.total, totalSucess: action.totalSucess, totalFalse: action.totalFalse, isLoading: false }
        case REQUEST_REVERT_FAILED:
            return { ...state, actionType: REQUEST_REVERT_FAILED, responseCode: action.responseCode, responseDescription: action.responseDescription, total: action.total, totalSucess: action.totalSucess, totalFalse: action.totalFalse, isLoading: false }

        case SETUP_PRINTER:
            return { ...state, actionType: SETUP_PRINTER, dataPrinter: action.data, isLoading: false }
        default:
            return state;
    }
};
