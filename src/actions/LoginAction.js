import { CHECK_LOGIN ,LOGIN_USER, CHANGE_LOCAL_LANGUAGE, SAVE_PROFILE } from '../constants/type'
import I18n from 'react-native-i18n'

export const onPressLogin = (data, isKeepLogin, ip) => {
  return {
    type: LOGIN_USER,
    data,
    isKeepLogin,
    ip
  }
}

export const checkLogin = (data, isKeepLogin, ip) => {
  return {
    type: CHECK_LOGIN,
    data,
    isKeepLogin,
    ip
  }
}

export const changeLocalLanguage = (language) => {
  I18n.defaultLocale = language
  I18n.locale = language
  return {
    type: CHANGE_LOCAL_LANGUAGE,
    language
  }
}

export const saveProfile = (image_url) => {
  return {
    type: SAVE_PROFILE,
    image_url
  }
}
