import { SETUP_API, CLEAR_API} from '../constants/type'

export const setupIp = (ip) => {
  return {
    type: SETUP_API,
    ip
  }
}

export const clearIp = () => {
  return {
    type: CLEAR_API,
  }
}