import { SEND_FORGET_PASSWORD_EMAIL, UPDATE_AUTH_USER, UPDATE_LOAD_USER, CLEAR_USER, SET_AUTHENTICATED } from '../actions/types';

const INIT_USER = {
  contacts: [],
  password: null
}

const INIT_STATE = {
  isAuthUser: false,
  authUser: INIT_USER,
  loadUser: false,
  send_forget_password_email: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        authUser: {...INIT_USER, ...action.payload},
        loadUser: true,
      };
    }
    
    case SET_AUTHENTICATED: {
      return {
        ...state,
        isAuthUser: true,
        loadUser: true,
      };
    }
    
    
    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadUser: action.payload,
      };
    }
    case SEND_FORGET_PASSWORD_EMAIL: {
      return {
        ...state,
        send_forget_password_email: action.payload,
      };
    }
    case CLEAR_USER: {
      return {
        ...state,
        authUser: INIT_USER,
        loadUser: false,
        isAuthUser: false,
        isAdmin: false
      };
    }
    default:
      return state;
  }
};
