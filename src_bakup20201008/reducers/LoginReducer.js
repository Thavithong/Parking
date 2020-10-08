import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CHANGE_LOCAL_LANGUAGE,
  SAVE_PROFILE,
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAIL,
} from '../constants/type'

const initialState = {
  dataLogin: null,
  dataUpdate: null,
  error: false,
  success: false,
  actionType: null,
  ip: null,
  isKeepLogin: null,
  email: null,
  password: null,
  isLoading: false,
  image_url: null,
  responseCode: null,
  responseDescription: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_LOGIN:
      return { ...state, actionType: CHECK_LOGIN, dataLogin: action.dataLogin, responseCode: null, responseDescription: null, }
    case CHECK_LOGIN_SUCCESS:
      return {
        ...state, dataLogin: action.dataLogin, actionType: CHECK_LOGIN_SUCCESS, success: true, isKeepLogin: action.isKeepLogin,
        responseCode: action.responseCode, responseDescription: action.responseDescription,
        email: action.isKeepLogin == true ? action.data.email : null, password: action.isKeepLogin == true ? action.data.password : null
      }
    case CHECK_LOGIN_FAIL:
      return {
        ...state, dataLogin: "error", actionType: CHECK_LOGIN_FAIL, success: false,
        responseCode: action.responseCode, responseDescription: action.responseDescription,
      }

    case LOGIN_USER:
      return { ...state, actionType: LOGIN_USER, dataLogin: action.data, }
    case LOGIN_USER_SUCCESS:
      return {
        ...state, dataLogin: action.data, actionType: LOGIN_USER_SUCCESS, success: true, isKeepLogin: action.isKeepLogin,
        email: action.isKeepLogin == true ? action.data.email : null, password: action.isKeepLogin == true ? action.data.password : null
      }
    case LOGIN_USER_FAIL:
      return { ...state, dataLogin: "error", actionType: LOGIN_USER_FAIL, success: false }

    case CHANGE_LOCAL_LANGUAGE:
      return { ...state, isLoading: false, actionType: CHANGE_LOCAL_LANGUAGE, localLanguage: action.language }

    case SAVE_PROFILE:
      return { ...state, isLoading: false, actionType: SAVE_PROFILE, image_url: action.image_url }
    default:
      return state;
  }
};
