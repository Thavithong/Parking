import { REQUEST_TRANSACTION, REQUEST_REVERT, SETUP_PRINTER } from '../constants/type'

export const transaction = (data, ip) => {
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