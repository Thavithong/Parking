import { REQUEST_TRANSACTION, REQUEST_REVERT, SETUP_PRINTER, SAVE_TRANSACTION, CLEAR_TRANSACTION } from '../constants/type'

export const transaction = (data, ip) => {
    console.log('data', data)
    console.log('ip', ip)
    return {
        type: REQUEST_TRANSACTION,
        data,
        ip
    }
}

export const revertMoney = (data, ip) => {
    return {
        type: REQUEST_REVERT,
        data,
        ip
    }
}

export const onSetupPrinter = (data) => {
    return {
        type: SETUP_PRINTER,
        data
    }
}

export const saveTransaction = (data) => {
    return {
        type: SAVE_TRANSACTION,
        data
    }
}

export const clearTransaction = (data) => {
    return {
        type: CLEAR_TRANSACTION,
        data
    }
}