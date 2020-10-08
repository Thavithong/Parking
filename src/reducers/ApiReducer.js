import {
  SETUP_API,
  CLEAR_API
} from '../constants/type'

const initialState = {
  actionType: null,
  publicIp: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SETUP_API:
      return { ...state, actionType: SETUP_API, publicIp: action.ip, }
    case CLEAR_API:
      return { ...state, actionType: CLEAR_API, publicIp: null, }
    default:
      return state;
  }
};
