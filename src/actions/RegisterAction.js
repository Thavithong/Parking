import { SHOP_REGISTER, REGISTER, CLEAR_REGISTER, UPDATE_SHOP_INFO, VERSION_UPDATE, CHECK_SHOP_INFO } from '../constants/type'

export const shopRegister = (data, ip) => {
  return {
    type: SHOP_REGISTER,
    data,
    ip
  }
}


export const register = (data, ip) => {
  return {
    type: REGISTER,
    data,
    ip
  }
}

export const clearRegister = () => {
  return {
    type: CLEAR_REGISTER,
  }
}

export const updateShopInfo = (data) => {
  return {
    type: UPDATE_SHOP_INFO,
    data
  }
}

export const onCheckVersion = (language, ip) => {
  return {
    type: VERSION_UPDATE,
    language,
    ip
  }
}

export const checkShopInfo = (shop_email, token, ip) => {
  return {
    type: CHECK_SHOP_INFO,
    shop_email,
    token,
    ip
  }
}