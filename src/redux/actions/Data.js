// import {fetchError, fetchStart, fetchSuccess} from "../actions";

import {RESIZE, SET_ACTIVE_NODE, SET_MEMBERS, SET_MESSAGE, SET_STUDENTS, SET_USERS} from "./types";
import { BUBU_API_URL } from "../../commonData";
import axios from 'axios';


export const getAllRecords = () => async dispatch => {
  return await axios
  .get(BUBU_API_URL + "/members/getAll")
  .then((response) => {
    console.log(response)
    dispatch({type: SET_MEMBERS, payload: response.data})
    return response.data;
  });
};


export const createRecord = (data) => async dispatch => {
  return await axios
  .post(BUBU_API_URL + "/members/create", data)
  .then((response) => {
    dispatch(getAllRecords());
    return response.data;
  });
};



export const deleteRecord = (data) => async dispatch => {
  return await axios
  .delete(BUBU_API_URL + `/members/deleteById/${data}`)
  .then((response) => {
    dispatch(getAllRecords());
    return response.data;
  });
};



export const getAllUsers = () => async dispatch => {
  return await axios
  .get(BUBU_API_URL + "/users/getAll")
  .then((response) => {
    console.log(response)
    dispatch({type: SET_USERS, payload: response.data})
    return response.data;
  });
};


