import {
    SHOP_REGISTER,
    SHOP_REGISTER_SUCCESS,
    SHOP_REGISTER_FAILED,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    CLEAR_REGISTER,
    UPDATE_SHOP_INFO,
    VERSION_UPDATE,
    VERSION_UPDATE_SUCCESS,
    VERSION_UPDATE_FAILED,
    CHECK_SHOP_INFO,
    CHECK_SHOP_INFO_SUCCESS,
    CHECK_SHOP_INFO_FAILED
} from '../constants/type'

const initialState = {
    shopInfo: null,
    responseCode: null,
    responseDescription: null,
    error: false,
    success: false,
    actionType: null,
    isLoading: false,
    userRegister: null,
    versionUpdate: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOP_REGISTER:
            return { ...state, actionType: SHOP_REGISTER, shopInfo: null, responseCode: null, responseDescription: null, isLoading: true }
        case SHOP_REGISTER_SUCCESS:
            return { ...state, actionType: SHOP_REGISTER_SUCCESS, shopInfo: action.shopInfo, responseCode: action.responseCode, responseDescription: action.responseDescription, isLoading: false }
        case SHOP_REGISTER_FAILED:
            return { ...state, actionType: SHOP_REGISTER_FAILED, shopInfo: null, responseCode: action.responseCode, responseDescription: action.responseDescription, isLoading: false }
        case REGISTER:
            return { ...state, actionType: REGISTER, responseCode: null, responseDescription: null, isLoading: true, userRegister: null }
        case REGISTER_SUCCESS:
            return { ...state, actionType: REGISTER_SUCCESS, responseCode: action.responseCode, responseDescription: action.responseDescription, isLoading: false, userRegister: action.userRegister }
        case REGISTER_FAILED:
            return { ...state, actionType: REGISTER_FAILED, responseCode: action.responseCode, responseDescription: action.responseDescription, isLoading: false, userRegister: null }
        case CLEAR_REGISTER:
            return { ...state, actionType: CLEAR_REGISTER, userRegister: null }
        case UPDATE_SHOP_INFO:
            return { ...state, actionType: UPDATE_SHOP_INFO, shopInfo: action.data }

        case VERSION_UPDATE:
            return { ...state, actionType: VERSION_UPDATE, versionUpdate: null, responseCode: null, responseDescription: null, }
        case VERSION_UPDATE_SUCCESS:
            return { ...state, actionType: VERSION_UPDATE_SUCCESS, versionUpdate: action.data, responseCode: action.response_code, responseDescription: action.responseDescription, }
        case VERSION_UPDATE_FAILED:
            return { ...state, actionType: VERSION_UPDATE_FAILED, versionUpdate: null, responseCode: action.response_code, responseDescription: action.responseDescription, }

        case CHECK_SHOP_INFO:
            return { ...state, actionType: CHECK_SHOP_INFO, shopInfo: null, responseCode: null, responseDescription: null, isLoading: true }
        case CHECK_SHOP_INFO_SUCCESS:
            return { ...state, actionType: CHECK_SHOP_INFO_SUCCESS, shopInfo: action.shopInfo, responseCode: action.responseCode, responseDescription: action.responseDescription, isLoading: false }
        case CHECK_SHOP_INFO_FAILED:
            return { ...state, actionType: CHECK_SHOP_INFO_FAILED, shopInfo: null, responseCode: action.responseCode, responseDescription: action.responseDescription, isLoading: false }

        default:
            return state;
    }
};
