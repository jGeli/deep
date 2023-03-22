import axios from 'axios';
import { SEND_FORGET_PASSWORD_EMAIL, UPDATE_AUTH_USER, UPDATE_LOAD_USER, CLEAR_USER,  SET_ERRORS, CLEAR_ERRORS, SET_AUTHENTICATED  } from './types';

import {BUBU_API_URL } from '../../commonData';
import { authHeader } from '../auth-header';


export const setAuthUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};

export const updateLoadUser = loading => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading,
    });
  };
};

export const setForgetPassMailSent = status => {
  return dispatch => {
    dispatch({
      type: SEND_FORGET_PASSWORD_EMAIL,
      payload: status,
    });
  };
};

export const registerUser = (user, rid) => dispatch => {
  dispatch({type: CLEAR_ERRORS})
  return axios
      .post(`${BUBU_API_URL}/auth/signup?rid=${rid}`, user)
      .then(({data}) => {
        // let { token } = data;
          // dispatch({type: UPDATE_AUTH_USER, payload: data })
          // localStorage.setItem('idToken', token);
          return window.location.href = '/login'
      })
      .catch(({response}) => {
        // dispatch()
        let {data } = response;
        if(data.d){
          dispatch({type: SET_ERRORS, payload: data.d})
        } else {
          dispatch({type: SET_ERRORS, payload: data})
        }
        // dispatch(fetchError(message.text));
      });
};

export const loginUser = (user, history) => dispatch => {
  dispatch({type: CLEAR_ERRORS})
  return axios
      .post(`${BUBU_API_URL}/auth/signin`, user)
      .then(({data}) => {

        let { token } = data;
          dispatch({type: UPDATE_AUTH_USER, payload: data })
          localStorage.setItem('idToken', token);
          
          dispatch(getUserData(history));
          // history.push('/')
          // window.location.href = '/home'
      })
      .catch(({response}) => {
        // dispatch()
        console.log(response)
        let data = response ? response.data : null;
        if(data && data.d){
          dispatch({type: SET_ERRORS, payload: data.d})
        } else {
          dispatch({type: SET_ERRORS, payload: data})
        }
      });
};



export const getUserData = (history) => (dispatch) => {
  return axios.get(`${BUBU_API_URL}/auth`, { headers: authHeader() }).then(
    ({data}) => {
          let {  user } = data;
        dispatch({type: UPDATE_AUTH_USER, payload: user})
        dispatch({type: SET_AUTHENTICATED})

    },
    (err) => {
     let data = err && err.response ? err.response.data : {};
      
      let { text, type } = data;
      if(text && type === 'error'){
        dispatch(logout())
      }
    }
  );
}



export const verifyOTP = (otp) => (dispatch) => {
  return axios.get(`${BUBU_API_URL}/auth/otp/${otp}`, { headers: authHeader() }).then(
    ({data}) => {
      console.log(data)
    },
    (err) => {
      console.log(err.response)
    }
  );
}


export const logout = (history) => {
  return (dispatch) => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('user');
    dispatch({
      type: CLEAR_USER
    });
  axios.get(`${BUBU_API_URL}/auth/logout`)
  .then(({data}) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  });
  }
};