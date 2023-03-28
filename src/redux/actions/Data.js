// import {fetchError, fetchStart, fetchSuccess} from "../actions";

import {RESIZE, SET_ACTIVE_NODE, SET_MEMBERS, SET_MESSAGE, SET_STUDENTS, SET_USERS} from "./types";
import { API_URL } from "../../commonData";
import axios from 'axios';
import { authHeader } from '../auth-header';


export const getAllRecords = () => async dispatch => {
  return await axios
  .get(API_URL + "/members/getAll", { headers: authHeader() })
  .then((response) => {
    dispatch({type: SET_MEMBERS, payload: response.data})
    return response.data;
  });
};


export const createRecord = (data) => async dispatch => {
  return await axios
  .post(API_URL + "/members/create", data)
  .then((response) => {
    dispatch(getAllRecords());
    return response.data;
  });
};


export const updateRecord = (data) => async dispatch => {
  return await axios
  .put(API_URL + `/members/updateById/${data._id}`, data)
  .then((response) => {
    dispatch(getAllRecords());
    return response.data;
  });
};




export const deleteRecord = (data) => async dispatch => {
  return await axios
  .delete(API_URL + `/members/deleteById/${data}`)
  .then((response) => {
    dispatch(getAllRecords());
    return response.data;
  });
};



export const getAllUsers = () => async dispatch => {
  return await axios
  .get(API_URL + "/users/getAll")
  .then((response) => {
    dispatch({type: SET_USERS, payload: response.data})
    return response.data;
  });
};


