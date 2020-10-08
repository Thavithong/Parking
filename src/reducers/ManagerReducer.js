import {
    DOWNLOAD_FROM_SERVER,
    DOWNLOAD_FROM_SERVER_SUCCESS,
    DOWNLOAD_FROM_SERVER_FAIL,
} from '../constants/type'

const initialState = {
    dataFromServer: null,
    responseCode: null,
    responseDescription: null,
    actionType: null,
    isLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DOWNLOAD_FROM_SERVER:
            return { ...state, actionType: DOWNLOAD_FROM_SERVER, dataFromServer: null, responseCode: null, responseDescription: null, isLoading: true }
        case DOWNLOAD_FROM_SERVER_SUCCESS:
            return { ...state, actionType: DOWNLOAD_FROM_SERVER_SUCCESS, dataFromServer: action.dataFromServer, responseCode: action.responseCode, responseDescription: action.responseDescription, isLoading: false }
        case DOWNLOAD_FROM_SERVER_FAIL:
            return { ...state, actionType: DOWNLOAD_FROM_SERVER_FAIL, dataFromServer: null, responseCode: action.responseCode, responseDescription: action.responseDescription, isLoading: false }
        
        default:
            return state;
    }
};
