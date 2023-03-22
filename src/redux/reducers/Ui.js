import { SET_LOADING, STOP_LOADING, SET_ERRORS, CLEAR_ERRORS, SET_FILTER, RESIZE, SET_MESSAGE, CLEAR_MESSAGE, SET_ACTIVE_NODE, OPEN_MEMBERFORM, CLOSE_MEMBERFORM} from "../actions/types";

const INIT_STATE = {
    loading: false,
    errors: {},
    height: window.innerHeight - 42,
    filter: "",
    width: window.innerWidth - 16,
    activeNode: null,
    snackbar: {
      message: "",
      open: false,
      type: ''
    },
    memberForm: false
};

export default (state = INIT_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_ERRORS: {
      let message = null;
      Object.values(payload).forEach(a => {
          message = a
       })
    
      return {
        ...state,
        errors: payload,
        snackbar: { open: true, message, type: 'error' }
      };
    }
    
    case SET_MESSAGE: {
      return {
        ...state, 
        snackbar: { open: true, ...payload }
      }
    }
    
    case CLEAR_MESSAGE: {
      return {
        ...state, 
        snackbar: { open: false, message: "", type: ""}
      }
    }
    
    case SET_FILTER: {
      return {
        ...state,
        filter: payload
      };
    }
    
    case RESIZE: {
      return {
        ...state,
        height:  window.innerHeight - document.getElementById('header') ? document.getElementById('header').offsetHeight : 0 - 16,
        width: window.innerWidth - 16
      };
    }
    
    case SET_ACTIVE_NODE: {
      return {
        ...state,
          activeNode: payload
      };
    }
    
    case OPEN_MEMBERFORM: {
    
      return {
        ...state,
        memberForm: true
      };
    }
    case CLOSE_MEMBERFORM: {
    
      return {
        ...state,
        memberForm: false
      };
    }
    
   
    case CLEAR_ERRORS: {
      return {
        ...state,
        errors: {}
      };
    }
    
    

    case SET_LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    
    case STOP_LOADING: {
      return {
        ...state,
        loading: false
      };
    }

    default:
      return state;
  }
};
